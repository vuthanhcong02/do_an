<?php

namespace App\Repositories;

use App\Repositories\BaseRepository;
use Illuminate\Http\Request;
use App\Models\Course;

class CourseRepository extends BaseRepository
{
    public function getModel()
    {
        return Course::class;
    }

    public function updateCourse(Request $request, $id)
    {
        $course = $this->model->find($id);
        if (!$course) {
            return false;
        }
        $course->update($request->all());
        return $course;
    }

    public function getCourseOrderById()
    {
        $courses = $this->model->orderBy('id', 'desc')->limit(6)->get();
        if (!$courses) {
            return false;
        }
        return $courses;
    }
}
