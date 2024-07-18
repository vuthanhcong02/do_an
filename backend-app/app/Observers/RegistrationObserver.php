<?php

namespace App\Observers;

use App\Jobs\SendEmailRegisterCourse;
use App\Models\Registration;

class RegistrationObserver
{
    /**
     * Handle the Registration "created" event.
     */
    public function created(Registration $registration): void
    {
        //

    }

    /**
     * Handle the Registration "updated" event.
     */
    public function updated(Registration $registration): void
    {
        //
        if ($registration->status == "success") { {
                $data = [
                    'email' => $registration->user->email ?? null,
                    'course_id' => $registration->schedule->course_id ?? null,
                    'full_name' => $registration->user->full_name ?? null,
                    'course_name' => $registration->schedule->course->name ?? null,
                    'day_of_week' => $registration->schedule->day_of_week ?? null,
                    'start_end_time' =>  $registration->schedule->start_end_time ?? null,
                    'price' => $registration->schedule->course->price ?? null,
                    'class' => $registration->schedule->classroom->name ?? null,
                    'room' => $registration->schedule->classroom->name ?? null,
                    'status' => $registration->status ?? null,
                ];
                SendEmailRegisterCourse::dispatch($data, $registration->user->toArray());
            }
        }
    }

    /**
     * Handle the Registration "deleted" event.
     */
    public function deleted(Registration $registration): void
    {
        //
    }

    /**
     * Handle the Registration "restored" event.
     */
    public function restored(Registration $registration): void
    {
        //
    }

    /**
     * Handle the Registration "force deleted" event.
     */
    public function forceDeleted(Registration $registration): void
    {
        //
    }
}
