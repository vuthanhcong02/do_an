<?php

namespace App\Http\Controllers;

use App\Services\RegistrationService;
use Illuminate\Http\Request;

class RegistrationController extends Controller
{
    //

    protected $registrationService;

    public function __construct(RegistrationService $registrationService)
    {
        $this->registrationService = $registrationService;
    }

    public function getAll()
    {
        $registrations = $this->registrationService->getAllRegistrations();
        if (!$registrations) {
            return $this->customResponse(404, false, null, 'Registration not found', null);
        }
        return $this->customResponse(200, true, $registrations, null, null);
    }

    public function createRegistration(Request $request)
    {
        $registration = $this->registrationService->createRegistration($request->all());
        if (!$registration) {
            return $this->customResponse(404, false, null, 'Registration not found', null);
        }
        return $this->customResponse(200, true, $registration, null, null);
    }

    public function vnPayCheck(Request $request)
    {
        $registration = $this->registrationService->vnPayCheck($request->all());
        if (!$registration) {
            return $this->customResponse(404, false, null, 'Registration not found', null);
        }
        return $this->customResponse(200, true, $registration, null, null);
    }
}