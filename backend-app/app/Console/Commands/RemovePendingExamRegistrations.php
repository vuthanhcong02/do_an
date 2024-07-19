<?php

namespace App\Console\Commands;

use App\Models\ExamRegister;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class RemovePendingExamRegistrations extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:remove-pending-exam-registrations';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        //
        $today = now()->toDateString();

        $registrations = ExamRegister::where('status', 'pending')->get();
        foreach ($registrations as $registration) {
            if ($registration->exam->deadline_date < $today) {
                $registration->delete();
            }
        }
        Log::info('Removed ' . count($registrations) . ' pending exam registrations that have exceeded the deadline date');
    }
}