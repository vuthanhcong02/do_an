<?php

namespace App\Services;

use Illuminate\Http\Request;
use App\Models\Registration;
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

    public function createRegistration($data)
    {
        $user = User::where('email', $data['email'])->first();

        if ($user) {
            $existingRegistration = $this->model->where('user_id', $user->id)
                ->where('schedule_id', $data['schedule_id'])
                ->first();

            if ($existingRegistration) {
                return;
            }
        } else {
            $user = User::create([
                'full_name' => $data['full_name'],
                'email' => $data['email'],
                'gender' => $data['gender'],
                'phone' => $data['phone'],
                'address' => $data['address'],
                'object_type' => $data['object_type'],
                'date_of_birthday' => $data['date_of_birthday'],
            ]);

            $registration = $this->model->create([
                'user_id' => $user->id,
                'schedule_id' => $data['schedule_id'],
                'payment_type' => $data['payment_type'],
                'total_price' => $data['total_price'],
            ]);

            if ($data['payment_type'] == 'payment_vnpay') {
                // return $this->redirectToVnpay($registration, $user);
                $data_url = VNPay::vnpay_create_payment([
                    'vnp_TxnRef' => $registration->id,
                    'vnp_OrderInfo' => "*Thanh toán khóa học*",
                    'vnp_Amount' => $data['total_price'],

                ]);
                // $this->vnPayCheck($data_url);pa
                // if ($vnPayCheck) {
                //     return $vnPayCheck;
                // }
                return $data_url;
            }
            return $registration;
        }
    }

    public function vnPayCheck($data)
    {
        //Lấy data từ url (VN Pay gửi cho qua $vnp_Returnurl)
        $vnp_ReponseCode = $data->get('vnp_ResponseCode'); //Mã tham chiếu của giao dịch 00==>thanh cong
        $vnp_TxnRef = $data->get('vnp_TxnRef'); //Mã đơn hàng
        $vnp_Amount = $data->get('vnp_Amount'); //Số tiền thanh toán
        // Kiểm tra data xem kết quả giao dịch có hợp lệ không
        if ($vnp_ReponseCode != null) {
            if ($vnp_ReponseCode == 00) {
                //Cập nhật trạng thái đơn hàng
                $registration = Registration::where('id', $vnp_TxnRef)->first();
                $registration->status = 'success';
                $registration->save();
                return $registration;
            } else {
                //Xóa đơn hàng trong database
                Registration::where('id', $vnp_TxnRef)->delete();
                return false;
            }
        }
    }
}