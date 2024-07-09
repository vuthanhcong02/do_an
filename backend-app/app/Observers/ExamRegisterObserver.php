<?php

namespace App\Observers;

use App\Jobs\SendEmailExamRegister;
use App\Models\ExamRegister;

class ExamRegisterObserver
{
    /**
     * Handle the ExamRegister "created" event.
     */
    public function created(ExamRegister $examRegister): void
    {
        //
    }

    /**
     * Handle the ExamRegister "updated" event.
     */
    public function updated(ExamRegister $examRegister): void
    {
        //
        if ($examRegister->status == "success") {
            $data = [
                'email' => $examRegister->user->email,
                'full_name' => $examRegister->user->full_name,
                'registration_number' => $examRegister->registration_number,
                'date' => $examRegister->exam->date,
                'exam_name' => $examRegister->exam->name,
                'start_at' => $examRegister->exam->start_at,
                'end_at' => $examRegister->exam->end_at,
                'price' => $examRegister->total_fee,
                'room' => $examRegister->exam->classroom->name,
                'status' => $examRegister->status,
            ];
            SendEmailExamRegister::dispatch($data, $examRegister->user->toArray());
        }
    }

    /**
     * Handle the ExamRegister "deleted" event.
     */
    public function deleted(ExamRegister $examRegister): void
    {
        //
    }

    /**
     * Handle the ExamRegister "restored" event.
     */
    public function restored(ExamRegister $examRegister): void
    {
        //
    }

    /**
     * Handle the ExamRegister "force deleted" event.
     */
    public function forceDeleted(ExamRegister $examRegister): void
    {
        //
    }
}