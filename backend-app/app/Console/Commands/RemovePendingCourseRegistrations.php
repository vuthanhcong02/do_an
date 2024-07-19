<?php

namespace App\Console\Commands;

use App\Models\Registration;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log as FacadesLog;

class RemovePendingCourseRegistrations extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:remove-pending-course-registrations';
    protected $description = 'Remove pending registrations that have exceeded the deadline date';

    public function __construct()
    {
        parent::__construct();
    }
    /**
     * The console command description.
     *
     * @var string
     */

    /**
     * Execute the console command.
     */
    public function handle()
    {
        //
        $today = now()->toDateString();

        // $registrationsToDelete = DB::table('registrations')
        //     ->join('schedules', 'registrations.schedule_id', '=', 'schedules.id')
        //     ->join('courses', 'schedules.course_id', '=', 'courses.id')
        //     ->where('registrations.status', 'pending')
        //     ->where('courses.deadline_date', '<', $today)
        //     ->select('registrations.id')
        //     ->get();
        // Registration::whereIn('id', $registrationsToDelete->pluck('id'))->delete();
        $registrations = Registration::where('status', 'pending')->get();
        foreach ($registrations as $registration) {
            if ($registration->schedule->course->deadline_date < $today) {
                $registration->delete();
            }
        }
        FacadesLog::info('Removed ' . count($registrations) . ' pending registrations that have exceeded the deadline date');
        // FacadesLog::info('Removed ' . count($registrationsToDelete) . ' pending registrations that have exceeded the deadline date');
    }
}