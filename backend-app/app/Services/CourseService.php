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

    public function getCourseByFeatured()
    {
        $courses = $this->model->where('featured', 1)->limit(6)->orderBy('id', 'desc')->get();
        if (!$courses) {
            return false;
        }
        return $courses;
    }

    public function getCoursesByEnglishCategory()
    {
        return  $this->model->where('category_id', 2)->orderBy('id', 'desc')->paginate(10);
    }

    public function getCoursesByInformationCategory()
    {
        return  $this->model->where('category_id', 1)->orderBy('id', 'desc')->paginate(10);
    }
}