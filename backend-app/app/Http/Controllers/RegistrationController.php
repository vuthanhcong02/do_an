<?php

namespace App\Http\Controllers;

use App\Models\ExamRegister;
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
        $vnp_OrderInfo = $request->get('vnp_OrderInfo');
        // Kiểm tra data xem kết quả giao dịch có hợp lệ không
        if ($vnp_ReponseCode != null) {
            if ($vnp_ReponseCode == 00) {
                list($orderType, $registrationId) = explode('_', $vnp_TxnRef);
                if ($orderType == "course") {
                    //Cập nhật trạng thái đơn hàng
                    $registration = Registration::find($registrationId);
                    if ($registration) {
                        $registration->update(['status' => "success"]);
                    }
                    $url = "http://localhost:3000/user/my-courses";
                    return redirect($url);
                } else if ($orderType == "exam") {
                    $registration = ExamRegister::find($registrationId);
                    if ($registration) {
                        $registration->update(['status' => "success"]);
                    }
                    $url = "http://localhost:3000/user/my-exams";
                    return redirect($url);
                }
            } else {
                $url = "http://localhost:3000/";
                return redirect($url);
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