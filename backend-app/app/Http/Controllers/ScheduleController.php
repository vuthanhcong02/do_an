<?php

namespace App\Http\Controllers;

use App\Services\ScheduleService;
use Illuminate\Http\Request;

class ScheduleController extends Controller
{
    //

    protected $scheduleService;

    public function __construct(ScheduleService $scheduleService)
    {
        $this->scheduleService = $scheduleService;
    }

    public function getAll()
    {
        $schedule = $this->scheduleService->getAllSchedules();
        if (!$schedule) {
            return $this->customResponse(404, false, null, 'Schedule not found', null);
        }

        return $this->customResponse(200, true, $schedule, null, null);
    }

    public function getScheduleById($id)
    {
        $schedule = $this->scheduleService->getScheduleById($id);
        if (!$schedule) {
            return $this->customResponse(404, false, null, 'Schedule not found', null);
        }
        return $this->customResponse(200, true, $schedule, null, null);
    }

    public function makeSchedule(Request $request)
    {
        $data = $request->all();
        $schedule = $this->scheduleService->create($data);

        if (!$schedule) {
            return $this->customResponse(400, false, null, 'Schedule not created', null);
        }

        return $this->customResponse(200, true, $schedule, null, null);
    }

    public function updateSchedule(Request $request, $id)
    {
        $data = $request->all();
        $schedule = $this->scheduleService->update($id, $data);

        if (!$schedule) {
            return $this->customResponse(400, false, null, 'Schedule not updated', null);
        }

        return $this->customResponse(200, true, $schedule, null, null);
    }

    public function deleteSchedule($id)
    {
        $schedule = $this->scheduleService->delete($id);

        if (!$schedule) {
            return $this->customResponse(400, false, null, 'Schedule not deleted', null);
        }

        return $this->customResponse(200, true, $schedule, null, null);
    }

    public function getScheduleByCourseId($id)
    {
        $schedule = $this->scheduleService->getScheduleByCourseId($id);
        if (!$schedule) {
            return $this->customResponse(404, false, null, 'Schedule not found', null);
        }
        return $this->customResponse(200, true, $schedule, null, null);
    }
}
