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
        $data = $request->all();
        $teacher = $this->teacherService->create($data);
        if (!$teacher) {
            return $this->customResponse(400, false, null, 'Teacher not created', null);
        }

        return $this->customResponse(200, true, $teacher, null, null);
    }

    public function showTeacher($id)
    {
        $teacher = $this->teacherService->find($id);
        if (!$teacher) {
            return $this->customResponse(404, false, null, 'Teacher not found', null);
        }

        return $this->customResponse(200, true, $teacher, null, null);
    }
    public function updateTeacher(Request $request, $id)
    {
        $data = $request->all();
        $teacher = $this->teacherService->update($data, $id);
        if (!$teacher) {
            return $this->customResponse(400, false, null, 'Teacher not updated', null);
        }

        return $this->customResponse(200, true, $teacher, null, null);
    }

    public function deleteTeacher($id)
    {
        $teacher = $this->teacherService->delete($id);
        if (!$teacher) {
            return $this->customResponse(400, false, null, 'Teacher not deleted', null);
        }

        return $this->customResponse(200, true, $teacher, null, null);
    }
}
