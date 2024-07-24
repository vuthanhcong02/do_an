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

    // public function createRegistration($data)
    // {
    //     $user = User::where('email', $data['email'])->first();
    //     if ($user) {
    //         $existingRegistration = $this->model->where('user_id', auth()->user()->id)
    //             ->where('schedule_id', $data['schedule_id'])
    //             ->first();
    //         if ($existingRegistration) {
    //             return;
    //         }
    //         if($existingRegistration->course->id == $data['schedule_id']){

    //         }
    //         $countRegister = $this->model->where('schedule_id', $data['schedule_id'])->count();

    //         $schedule = Schedule::find($data['schedule_id']);
    //         $course = $schedule->course;
    //         if ($countRegister >= $course->max_student) {
    //             return;
    //         }

    //         $registration = $this->model->create([
    //             'user_id' => $user->id,
    //             'schedule_id' => $data['schedule_id'],
    //             'payment_type' => $data['payment_type'],
    //             'total_price' => $data['total_price'],
    //         ]);
    //         if ($data['payment_type'] == 'payment_vnpay') {

    //             $data_url = VNPay::vnpay_create_payment([
    //                 'vnp_TxnRef' => $registration->id,
    //                 'vnp_OrderInfo' => "*Thanh toán khóa học*|course",
    //                 'vnp_Amount' => $data['total_price'],

    //             ]);

    //             return $data_url;
    //         }
    //         return $registration;
    //     }
    // }
    public function createRegistration($data)
    {
        $user = User::where('email', $data['email'])->first();
        if ($user) {
            $schedule = Schedule::find($data['schedule_id']);
            if (!$schedule) {
                return;
            }

            $courseId = $schedule->course_id;

            $existingRegistration = $this->model->where('user_id', $user->id)
                ->whereHas('schedule', function ($query) use ($courseId) {
                    $query->where('course_id', $courseId);
                })
                ->first();

            if ($existingRegistration) {
                return;
            }

            $countRegister = $this->model->where('schedule_id', $data['schedule_id'])->count();

            $course = $schedule->course;
            if ($countRegister >= $course->max_student) {
                return;
            }

            $registration = $this->model->create([
                'user_id' => $user->id,
                'schedule_id' => $data['schedule_id'],
                'payment_type' => $data['payment_type'],
                'total_price' => $data['total_price'],
            ]);

            if ($data['payment_type'] == 'payment_vnpay') {
                $txnRef = "course_" . $registration->id;
                $data_url = VNPay::vnpay_create_payment([
                    'vnp_TxnRef' => $txnRef,
                    'vnp_OrderInfo' => "*Thanh toán khóa học*|course",
                    'vnp_Amount' => $data['total_price'],
                ]);

                return $data_url;
            }
            return $registration;
        }
    }



    public function updateRegistration($data)
    {
        $registration = Registration::find($data['id']);

        if ($registration) {
            $registration->update($data);
            return $registration;
        }

        return false;
    }

    public function getCountRegistrationsWithStatusSuccess()
    {
        return $this->model->where('status', 'success')->count();
    }

    public function getCountRegistrationsWithStatusPending()
    {
        return $this->model->where('status', 'pending')->count();
    }

    public function getTotalRegistrationsWithStatusSuccess()
    {
        return $this->model->where('status', 'success')->sum('total_price');
    }
}
