<?php

namespace App\Http\Controllers;

use App\Models\Registration;
use App\Services\RegistrationService;
use Illuminate\Http\Request;

class RegistrationController extends Controller
{
    //

    protected $registrationService;

    public function __construct(RegistrationService $registrationService)
    {
        $this->registrationService = $registrationService;
    }

    public function getAll()
    {
        $registrations = $this->registrationService->getAllRegistrations();
        if (!$registrations) {
            return $this->customResponse(404, false, null, 'Registration not found', null);
        }
        return $this->customResponse(200, true, $registrations, null, null);
    }

    public function createRegistration(Request $request)
    {
        $registration = $this->registrationService->createRegistration($request->all());
        if (!$registration) {
            return $this->customResponse(404, false, null, 'Registration not found', null);
        }
        return $this->customResponse(200, true, $registration, null, null);
    }

    // public function vnPayCheck(Request $request)
    // {
    //     $registration = $this->registrationService->vnPayCheck($request->all());
    //     if (!$registration) {
    //         return $this->customResponse(404, false, null, 'Registration not found', null);
    //     }
    //     return $this->customResponse(200, true, $registration, null, null);
    // }

    public function getRegistrationByUser()
    {
        $registrations = $this->registrationService->getRegistrationByUser();
        if (!$registrations) {
            return $this->customResponse(404, false, null, 'Registration not found', null);
        }
        return $this->customResponse(200, true, $registrations, null, null);
    }

    public function handleVNPayReturn(Request $request)
    {
        // dd($request->all());


        $vnp_ReponseCode = $request->get('vnp_ResponseCode'); //Mã tham chiếu của giao dịch 00==>thanh cong
        $vnp_TxnRef = $request->get('vnp_TxnRef'); //Mã đơn hàng
        $vnp_Amount = $request->get('vnp_Amount'); //Số tiền thanh toán
        // Kiểm tra data xem kết quả giao dịch có hợp lệ không
        if ($vnp_ReponseCode != null) {
            if ($vnp_ReponseCode == 00) {
                //Cập nhật trạng thái đơn hàng
                $registrationId = $vnp_TxnRef;
                $registration = Registration::find($registrationId);
                if ($registration) {
                    $registration->update(['status' => "success"]);
                }
                $url = "http://ngoaingutinhoc.tlu.edu.com/registrations/vnpay/success";
                return $this->customResponse(200, true, $url, null, null);
            } else {
                return redirect('/payment-fail');
            }
        }
    }

    public function getRegistrationById($id)
    {
        $registration = $this->registrationService->find($id);
        if (!$registration) {
            return $this->customResponse(404, false, null, 'Registration not found', null);
        }
        return $this->customResponse(200, true, $registration, null, null);
    }

    public function updateRegistration(Request $request, $id)
    {
        $data = $request->all();
        $registration = $this->registrationService->find($id);
        if (!$registration) {
            return $this->customResponse(404, false, null, 'Registration not found', null);
        }

        $data['status'] = $request->get('status');
        $registration = $this->registrationService->update($registration->id, $data);
        if (!$registration) {
            return $this->customResponse(404, false, null, 'Registration not found', null);
        }
        return $this->customResponse(200, true, $registration, null, null);
    }

    public function deleteRegistration($id)
    {
        $registration = $this->registrationService->find($id);
        if (!$registration) {
            return $this->customResponse(404, false, null, 'Registration not found', null);
        }
        $registration->delete();
        return $this->customResponse(200, true, $registration, null, null);
    }
}