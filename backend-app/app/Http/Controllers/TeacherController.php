<?php

namespace App\Http\Controllers;

use App\Services\ImageUploadService;
use App\Services\TeacherService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;


class TeacherController extends Controller
{
    //

    protected $teacherService, $imageUploadService;
    public function __construct(TeacherService $teacherService, ImageUploadService $imageUploadService)
    {
        $this->teacherService = $teacherService;
        $this->imageUploadService = $imageUploadService;
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

        if ($request->hasFile('image')) {
            $avatar = $request->file('image');

            $path = $this->imageUploadService->uploadImage($avatar, 'avatars');

            $data['image'] = $path;
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

        $teacher = $this->teacherService->find($id);
        if (!$teacher) {
            return $this->customResponse(404, false, null, 'Teacher not found', null);
        }
        if ($request->hasFile('image')) {
            $avatar = $request->file('image');

            $path = $this->imageUploadService->uploadImage($avatar, 'avatars');

            if ($teacher->image) {
                $this->imageUploadService->deleteImage($teacher->image);
            }

            $data['image'] = $path;
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

        if ($teacher->image) {
            $this->imageUploadService->deleteImage($teacher->image);
        }

        return $this->customResponse(200, true, $teacher, null, null);
    }
}