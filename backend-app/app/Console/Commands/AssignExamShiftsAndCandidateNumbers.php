<?php

namespace App\Console\Commands;

use App\Models\Exam;
use App\Models\ExamRegister;
use App\Models\ExamSchedule;
use AWS\CRT\Log;
use Illuminate\Console\Command;
use Illuminate\Log\Logger;
use Illuminate\Support\Facades\Log as FacadesLog;
use PHPUnit\TextUI\XmlConfiguration\Logging\Logging;

class AssignExamShiftsAndCandidateNumbers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'assign:exam-shifts';


    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Assign exam shifts and candidate numbers for all exams';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        //
        $this->assignExamShiftsAndCandidateNumbers();
    }


    public function assignExamShiftsAndCandidateNumbers()
    {
        $exams = Exam::all();

        foreach ($exams as $exam) {
            $exam_id = $exam->id;
            FacadesLog::info("Processing exam_id: $exam_id");

            ExamRegister::where('exam_id', $exam_id)->update(['candidate_number' => null, 'exam_schedule_id' => null]);

            $examSchedules = ExamSchedule::where('exam_id', $exam_id)->get();
            if ($examSchedules->isEmpty()) {
                continue;
            }

            $registrations = ExamRegister::where('exam_id', $exam_id)
                ->where('status', 'success')
                ->join('users', 'exam_registrations.user_id', '=', 'users.id')
                ->orderBy('users.full_name')
                ->select('exam_registrations.*')
                ->get();

            FacadesLog::info("Registrations found: " . $registrations->count());
            if ($registrations->isEmpty()) {
                continue;
            }

            $candidateNumber = 1;
            $currentScheduleIndex = 0;
            $studentsInCurrentShift = 0;

            foreach ($registrations as $index => $registration) {
                $examSchedule = $examSchedules[$currentScheduleIndex];
                $maxStudentsPerShift = $examSchedule->max_student_per_shift;

                if ($studentsInCurrentShift >= $maxStudentsPerShift) {
                    $currentScheduleIndex++;
                    if ($currentScheduleIndex >= $examSchedules->count()) {
                        break;
                    }

                    $examSchedule = $examSchedules[$currentScheduleIndex];
                    $studentsInCurrentShift = 0;
                    $candidateNumber = 1;
                }

                $registration->exam_schedule_id = $examSchedule->id;
                $registration->candidate_number = $candidateNumber;
                $registration->save();

                FacadesLog::info("Updated registration: {$registration->id} with schedule_id: {$examSchedule->id} and candidate_number: $candidateNumber");

                $candidateNumber++;
                $studentsInCurrentShift++;
            }
        }
    }
}
