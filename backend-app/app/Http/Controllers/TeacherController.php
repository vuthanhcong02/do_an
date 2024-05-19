<?php

namespace App\Http\Controllers;

use App\Services\TeacherService;
use Illuminate\Http\Request;

class TeacherController extends Controller
{
    //

    protected $teacherService;
    public function __construct(TeacherService $teacherService)
    {
        $this->teacherService = $teacherService;
    }


    public function getAll()
    {
        $teachers = $this->teacherService->getAll();
        if (!$teachers) {
            return $this->customResponse(404, false, null, 'Banner not found', null);
        }

        return $this->customResponse(200, true, $teachers, null, null);
    }

    public function createTeacher(Request $request)
    {
        $teacher = $this->teacherService->createTeacher($request);
        if (!$teacher) {
            return $this->customResponse(400, false, null, 'Teacher not created', null);
        }

        return $this->customResponse(200, true, $teacher, null, null);
    }

    public function showTeacher($id)
    {
        $teacher = $this->teacherService->getTeacher($id);
        if (!$teacher) {
            return $this->customResponse(404, false, null, 'Teacher not found', null);
        }

        return $this->customResponse(200, true, $teacher, null, null);
    }
    public function updateTeacher(Request $request, $id)
    {
        $teacher = $this->teacherService->updateTeacher($request, $id);
        if (!$teacher) {
            return $this->customResponse(400, false, null, 'Teacher not updated', null);
        }

        return $this->customResponse(200, true, $teacher, null, null);
    }

    public function deleteTeacher($id)
    {
        $teacher = $this->teacherService->deleteTeacher($id);
        if (!$teacher) {
            return $this->customResponse(400, false, null, 'Teacher not deleted', null);
        }

        return $this->customResponse(200, true, $teacher, null, null);
    }
}
