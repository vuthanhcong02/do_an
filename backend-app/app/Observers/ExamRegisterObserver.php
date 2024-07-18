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
                'email' => $examRegister->user->email ?? null,
                'full_name' => $examRegister->user->full_name ?? null,
                'candidate_number' => $examRegister->candidate_number ?? null,
                'date' => $examRegister->exam->date ?? null,
                'exam_name' => $examRegister->exam->name ?? null,
                'start_at' => $examRegister->exam->start_at ?? null,
                'end_at' => $examRegister->exam->end_at ?? null,
                'price' => $examRegister->total_fee ?? null,
                'room' => $examRegister->exam->classroom->name ?? null,
                'status' => $examRegister->status ?? null,
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
