<?php

namespace App\Http\Controllers;

use App\Services\ExamRegisterService;
use Illuminate\Http\Request;

class ExamRegisterController extends Controller
{
    //

    protected $examRegisterService;

    public function __construct(ExamRegisterService $examRegisterService)
    {
        $this->examRegisterService = $examRegisterService;
    }

    public function createExamRegister(Request $request)
    {
        $data = $request->all();
        $examRegister = $this->examRegisterService->createExamRegister($data);
        if (!$examRegister) {
            return $this->customResponse(400, false, null, 'Exam register not created', null);
        }

        return $this->customResponse(200, true, $examRegister, 'Exam register created', null);
    }

    public function getAllRegistrations()
    {
        $registrations = $this->examRegisterService->getAllRegistrations();
        if (!$registrations) {
            return $this->customResponse(404, false, null, 'Registration not found', null);
        }
        return $this->customResponse(200, true, $registrations, null, null);
    }

    public function getRegistrationByUserId()
    {
        $registration = $this->examRegisterService->getRegistrationByUserId();
        if (!$registration) {
            return $this->customResponse(404, false, null, 'Registration not found', null);
        }
        return $this->customResponse(200, true, $registration, null, null);
    }

    public function updateRegistration($id, Request $request)
    {
        $data = $request->all();
        $registration = $this->examRegisterService->find($id);
        if (!$registration) {
            return $this->customResponse(404, false, null, 'Registration not found', null);
        }
        $registration = $this->examRegisterService->update($registration->id, $data);
        if (!$registration) {
            return $this->customResponse(400, false, null, 'Registration not updated', null);
        }

        return $this->customResponse(200, true, $registration, 'Registration updated', null);
    }

    public function destroy($id)
    {
        $registration = $this->examRegisterService->find($id);
        if (!$registration) {
            return $this->customResponse(404, false, null, 'Registration not found', null);
        }
        $this->examRegisterService->delete($registration->id);
        return $this->customResponse(200, true, null, null, null);
    }
}