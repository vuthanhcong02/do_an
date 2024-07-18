<?php

namespace App\Http\Controllers;

use App\Services\ExamScheduleService;
use Illuminate\Http\Request;

class ExamScheduleController extends Controller
{
    //

    protected $examScheduleService;

    public function __construct(ExamScheduleService $examScheduleService)
    {
        $this->examScheduleService = $examScheduleService;
    }

    public function getAllExamSchedules()
    {
        $examSchedules = $this->examScheduleService->getAllExamSchedules();
        if (!$examSchedules) {
            return $this->customResponse(400, false, null, 'Exam schedule not found', null);
        }

        return $this->customResponse(200, true, $examSchedules, null, null);
    }

    public function store(Request $request)
    {
        $data = $request->all();
        $examSchedule = $this->examScheduleService->create($data);
        if (!$examSchedule) {
            return $this->customResponse(400, false, null, 'Exam schedule not created', null);
        }

        return $this->customResponse(200, true, $examSchedule, null, null);
    }

    public function show($id)
    {
        $examSchedule = $this->examScheduleService->find($id);
        if (!$examSchedule) {
            return $this->customResponse(400, false, null, 'Exam schedule not found', null);
        }

        return $this->customResponse(200, true, $examSchedule, null, null);
    }

    public function update(Request $request, $id)
    {
        $data = $request->all();
        $examSchedule = $this->examScheduleService->update($id, $data);
        if (!$examSchedule) {
            return $this->customResponse(400, false, null, 'Exam schedule not updated', null);
        }

        return $this->customResponse(200, true, $examSchedule, null, null);
    }

    public function destroy($id)
    {
        $examSchedule = $this->examScheduleService->delete($id);
        if (!$examSchedule) {
            return $this->customResponse(400, false, null, 'Exam schedule not deleted', null);
        }

        return $this->customResponse(200, true, $examSchedule, null, null);
    }
}
