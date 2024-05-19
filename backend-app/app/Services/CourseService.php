<?php

namespace App\Services;

use App\Repositories\CourseRepository;
use App\Repositories\TeacherRepository;
use Illuminate\Http\Request;

class CourseService
{
    protected $courseRepository;

    public function __construct(CourseRepository $courseRepository)
    {
        $this->courseRepository = $courseRepository;
    }

    public function getAll()
    {
        return $this->courseRepository->getAll();
    }


    public function createCourse(Request $request)
    {
        $data = $request->all();
        $teacher = $this->courseRepository->create($data);
        if (!$teacher) {
            return false;
        }
        return $teacher;
    }

    public function getCourse($id)
    {
        $teacher = $this->courseRepository->find($id);
        if (!$teacher) {
            return false;
        }
        return $teacher;
    }

    public function updateCourse(Request $request, $id)
    {
        $teacher = $this->courseRepository->updateCourse($request, $id);
        if (!$teacher) {
            return false;
        }
        return $teacher;
    }

    public function deleteCourse($id)
    {
        return $this->courseRepository->delete($id);
    }

    public function getCourseOrderById()
    {
        $courses = $this->courseRepository->getCourseOrderById();
        if (!$courses) {
            return false;
        }
        return $courses;
    }
}
