<?php

namespace App\Http\Controllers;

use App\Services\ContactService;
use App\Services\CourseService;
use App\Services\EventService;
use App\Services\ExamRegisterService;
use App\Services\ExamService;
use App\Services\NewsService;
use App\Services\RegistrationService;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    //
    protected $courseService, $newsService, $eventService, $registrationService, $examRegisterService, $contactService, $examService;

    public function __construct(CourseService $courseService, NewsService $newsService, EventService $eventService, RegistrationService $registrationService, ExamRegisterService $examRegisterService, ContactService $contactService, ExamService $examService)
    {
        $this->courseService = $courseService;
        $this->newsService = $newsService;
        $this->eventService = $eventService;
        $this->registrationService = $registrationService;
        $this->examRegisterService = $examRegisterService;
        $this->contactService = $contactService;
        $this->examService = $examService;
    }

    public function getCountCourses()
    {
        $count = $this->courseService->countCourse();
        if (!$count) {
            return $this->customResponse(401, false, null, 'Count not found', null);
        }
        return $this->customResponse(200, true, $count, null, null);
    }

    public function getCountNews()
    {
        $count = $this->newsService->countNews();
        if (!$count) {
            return $this->customResponse(401, false, null, 'Count not found', null);
        }
        return $this->customResponse(200, true, $count, null, null);
    }

    public function getCountEvents()
    {
        $count = $this->eventService->countEvents();
        if (!$count) {
            return $this->customResponse(401, false, null, 'Count not found', null);
        }
        return $this->customResponse(200, true, $count, null, null);
    }

    public function getCountContacts()
    {
        $count = $this->contactService->countContact();
        if (!$count) {
            return $this->customResponse(401, false, null, 'Count not found', null);
        }
        return $this->customResponse(200, true, $count, null, null);
    }

    public function getCountExams()
    {
        $count = $this->examService->countExams();
        if (!$count) {
            return $this->customResponse(401, false, null, 'Count not found', null);
        }
        return $this->customResponse(200, true, $count, null, null);
    }

    public function getCountRegistrationsWithStatusSuccess()
    {
        $count = $this->registrationService->getCountRegistrationsWithStatusSuccess();
        if (!$count) {
            return $this->customResponse(401, false, null, 'Count not found', null);
        }
        return $this->customResponse(200, true, $count, null, null);
    }

    public function getCountRegistrationsWithStatusPending()
    {
        $count = $this->registrationService->getCountRegistrationsWithStatusPending();
        if (!$count) {
            return $this->customResponse(401, false, null, 'Count not found', null);
        }
        return $this->customResponse(200, true, $count, null, null);
    }

    public function getTotalRegistrationsWithStatusSuccess()
    {
        $total = $this->registrationService->getTotalRegistrationsWithStatusSuccess();
        if (!$total) {
            return $this->customResponse(401, false, null, 'Total not found', null);
        }
        return $this->customResponse(200, true, $total, null, null);
    }

    public function getCountExamRegistrationsWithStatusSuccess()
    {
        $count = $this->examRegisterService->getCountExamRegistrationsWithStatusSuccess();
        if (!$count) {
            return $this->customResponse(401, false, null, 'Count not found', null);
        }
        return $this->customResponse(200, true, $count, null, null);
    }

    public function getCountExamRegistrationsWithStatusPending()
    {
        $count = $this->examRegisterService->getCountExamRegistrationsWithStatusPending();
        if (!$count) {
            return $this->customResponse(401, false, null, 'Count not found', null);
        }
        return $this->customResponse(200, true, $count, null, null);
    }

    public function getTotalExamRegistrationsWithStatusSuccess()
    {
        $total = $this->examRegisterService->getTotalFeeExamRegistrationsWithStatusSuccess();
        if (!$total) {
            return $this->customResponse(401, false, null, 'Total not found', null);
        }
        return $this->customResponse(200, true, $total, null, null);
    }
}