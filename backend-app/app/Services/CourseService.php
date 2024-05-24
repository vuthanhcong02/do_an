<?php

namespace App\Services;

use App\Models\Course;
use App\Repositories\TeacherRepository;
use Illuminate\Http\Request;

class CourseService extends BaseService
{
    public function __construct(Course $course)
    {
        parent::__construct($course);
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
