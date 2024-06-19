<?php

namespace App\Services;

use Illuminate\Http\Request;
use App\Models\Registration;
use App\Models\Schedule;
use App\Models\User;
use App\Utilities\VNPay;

class RegistrationService extends BaseService
{
    public function __construct(Registration $registration)
    {
        parent::__construct($registration);
    }

    public function getAllRegistrations()
    {
        return $this->model->with('schedule.course', 'schedule.class', 'user')->orderBy('id', 'desc')->paginate(10);
    }

    public function getRegistrationByUser()
    {
        return $this->model->with('schedule.course', 'schedule.class', 'user', 'schedule.classroom')->where('user_id', auth()->user()->id)->orderBy('id', 'desc')->paginate(5);
    }

    public function createRegistration($data)
    {
        $user = User::where('email', $data['email'])->first();
        if ($user) {
            $existingRegistration = $this->model->where('user_id', auth()->user()->id)
                ->where('schedule_id', $data['schedule_id'])
                ->first();
            if ($existingRegistration) {
                return;
            }
            $registration = $this->model->create([
                'user_id' => $user->id,
                'schedule_id' => $data['schedule_id'],
                'payment_type' => $data['payment_type'],
                'total_price' => $data['total_price'],
            ]);
            if ($data['payment_type'] == 'payment_vnpay') {

                $data_url = VNPay::vnpay_create_payment([
                    'vnp_TxnRef' => $registration->id,
                    'vnp_OrderInfo' => "*Thanh toán khóa học*",
                    'vnp_Amount' => $data['total_price'],

                ]);

                return $data_url;
            }
            return $registration;
        }
    }

    private function calculateTotal($scheduleId, $discountCode = null)
    {
        $schedule = Schedule::find($scheduleId);
        $coursePrice = $schedule->course->price;

        $additionalFees = 0;
        $discount = $this->calculateDiscount($discountCode, $coursePrice);

        $total = $coursePrice + $additionalFees - $discount;

        return $total;
    }

    private function calculateDiscount($discountCode, $coursePrice)
    {
        if ($discountCode) {
            $discount = 10;
            return ($coursePrice * $discount) / 100;
        }

        return 0;
    }

    private function generateVNPayUrl($registration)
    {
        // Tạo URL thanh toán VNPay dựa trên thông tin đăng ký
        $vnp_TmnCode = "HOU2CSK8";
        $vnp_HashSecret = "AYZLBMZFZEGRHXIMMOYDBSICEFSCUZOM";
        $vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
        $vnp_Returnurl = route('vnpay.return');  // Đường dẫn sau khi thanh toán xong

        $vnp_TxnRef = $registration->id; // Mã đơn hàng
        $vnp_OrderInfo = "Thanh toan don hang " . $registration->id;
        $vnp_OrderType = "billpayment";
        $vnp_Amount = $registration->total_price * 100; // Số tiền thanh toán
        $vnp_Locale = "vn";
        $vnp_BankCode = "NCB";

        $vnp_IpAddr = request()->ip();

        $inputData = array(
            "vnp_Version" => "2.1.0",
            "vnp_TmnCode" => $vnp_TmnCode,
            "vnp_Amount" => $vnp_Amount,
            "vnp_Command" => "pay",
            "vnp_CreateDate" => date('YmdHis'),
            "vnp_CurrCode" => "VND",
            "vnp_IpAddr" => $vnp_IpAddr,
            "vnp_Locale" => $vnp_Locale,
            "vnp_OrderInfo" => $vnp_OrderInfo,
            "vnp_OrderType" => $vnp_OrderType,
            "vnp_ReturnUrl" => $vnp_Returnurl,
            "vnp_TxnRef" => $vnp_TxnRef,
            "vnp_BankCode" => $vnp_BankCode
        );

        ksort($inputData);
        $query = "";
        $i = 0;
        $hashdata = "";
        foreach ($inputData as $key => $value) {
            if ($i == 1) {
                $hashdata .= '&' . $key . "=" . $value;
            } else {
                $hashdata .= $key . "=" . $value;
                $i = 1;
            }
            $query .= urlencode($key) . "=" . urlencode($value) . '&';
        }

        $vnp_Url = $vnp_Url . "?" . $query;
        if (isset($vnp_HashSecret)) {
            $vnpSecureHash = hash_hmac('sha512', $hashdata, $vnp_HashSecret);
            $vnp_Url .= 'vnp_SecureHashType=SHA256&vnp_SecureHash=' . $vnpSecureHash;
        }

        return $vnp_Url;
    }
}