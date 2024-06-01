<?php

namespace App\Http\Controllers;

use App\Services\TeacherService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;


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
        $teachers = $this->teacherService->getAllTeachers();
        if (!$teachers) {
            return $this->customResponse(404, false, null, 'Banner not found', null);
        }

        return $this->customResponse(200, true, $teachers, null, null);
    }

    public function createTeacher(Request $request)
    {
        $data = $request->all();
        if ($request->hasFile('image') && $request->file('image')->isValid()) {
            $file = $request->file('image');
            $fileName = Str::random(32) . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('uploads/teachers/avatar'), $fileName);
            $data['image'] = 'uploads/teachers/avatar/' . $fileName;
        } else {
            $data['image'] = null;
        }
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
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $fileName = Str::random(32) . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('uploads/teachers/avatar'), $fileName);
            $data['image'] = 'uploads/teachers/avatar/' . $fileName;
        } else {
        }

        $teacher = $this->teacherService->update($id, $data);
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