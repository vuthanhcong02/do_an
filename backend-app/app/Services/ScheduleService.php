<?php

namespace App\Services;

use Illuminate\Http\Request;
use App\Models\Schedule;

class ScheduleService extends BaseService
{
    public function __construct(Schedule $schedule)
    {
        parent::__construct($schedule);
    }

    public function getAllSchedules()
    {
        return $this->model->with('class', 'classroom', 'teacher', 'course')->orderBy('id', 'desc')->paginate(10);
    }

    public function getScheduleById($id)
    {
        return $this->model->with('class', 'classroom', 'teacher', 'course')->find($id);
    }

    public function getScheduleByCourseId($courseId)
    {
        return $this->model->with('class', 'classroom', 'teacher', 'course')->where('course_id', $courseId)->get();
    }
}
