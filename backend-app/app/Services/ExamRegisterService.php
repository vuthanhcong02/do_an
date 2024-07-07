<?php

namespace App\Services;

use Illuminate\Http\Request;
use App\Models\ExamRegister;
use App\Utilities\VNPay;

class ExamRegisterService extends BaseService
{
    public function __construct(ExamRegister $examRegister)
    {
        parent::__construct($examRegister);
    }

    public function createExamRegister($data)
    {
        $existingRegistration = ExamRegister::where('user_id', $data['user_id'])
            ->where('exam_id', $data['exam_id'])
            ->first();

        if ($existingRegistration) {
            return;
        }

        $registrationNumber = $registrationNumber = ExamRegister::createRegistrationNumber($data['exam_id']);
        $registration = $this->model::create([
            'exam_id' => $data['exam_id'],
            'user_id' => $data['user_id'],
            'payment_type' => $data['payment_type'],
            'registration_number' => $registrationNumber,
            'total_fee' => $data['total_fee'],
        ]);


        if ($data['payment_type'] == 'payment_vnpay') {
            $txnRef = "exam_" . $registration->id;
            $data_url = VNPay::vnpay_create_payment([
                'vnp_TxnRef' => $txnRef,
                'vnp_OrderInfo' => "*Thanh toán lệ phí thi*|exam",
                'vnp_Amount' => $data['total_fee'],

            ]);

            return $data_url;
        }
        return $registration;
    }


    public function getAllRegistrations()
    {
        return $this->model::with('user', 'exam')->orderBy('id', 'desc')->paginate(10);
    }

    public function getRegistrationByUserId()
    {
        $user = auth()->user();
        // dd($user);
        return $this->model::with('user', 'exam', 'exam.classroom')->where('user_id', auth()->user()->id)->orderBy('id', 'desc')->paginate(5);
    }

    public function updateExamRegister($data)
    {
        $registration = ExamRegister::find($data['id']);

        if ($registration) {
            $registration->update($data);
            return $registration;
        }

        return false;
    }
}