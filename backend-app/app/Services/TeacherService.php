<?php

namespace App\Services;

use App\Repositories\TeacherRepository;
use Illuminate\Http\Request;

class TeacherService
{
    protected $teacherRepository;

    public function __construct(TeacherRepository $teacherRepository)
    {
        $this->teacherRepository = $teacherRepository;
    }

    public function getAll()
    {
        return $this->teacherRepository->getAll();
    }


    public function createTeacher(Request $request)
    {
        $data = $request->all();
        $teacher = $this->teacherRepository->create($data);
        if (!$teacher) {
            return false;
        }
        return $teacher;
    }

    public function getTeacher($id)
    {
        $teacher = $this->teacherRepository->find($id);
        if (!$teacher) {
            return false;
        }
        return $teacher;
    }

    public function updateTeacher(Request $request, $id)
    {
        $teacher = $this->teacherRepository->updateTeacher($request, $id);
        if (!$teacher) {
            return false;
        }
        return $teacher;
    }

    public function deleteTeacher($id)
    {
        return $this->teacherRepository->delete($id);
    }
}
