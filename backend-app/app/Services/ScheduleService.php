<?php

namespace App\Services;

use Illuminate\Http\Request;
use App\Models\Schedule;
use Illuminate\Support\Facades\DB;

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

    public function getAllStudentsByScheduleId($scheduleId)
    {
        return DB::table('registrations as r')
            ->select(
                'r.id AS registration_id',
                'u.id AS user_id',
                'u.full_name AS user_name',
                'u.phone AS user_phone',
                'u.gender AS user_gender',
                'u.id_card AS user_id_card',
                'u.address AS user_address',
                'u.date_of_birthday AS user_date_of_birthday',
                'u.email AS user_email',
                'r.payment_type',
                'r.status AS registration_status',
                'r.created_at AS date_of_registration',
                'r.total_price',
                's.class_id',
                's.day_of_week',
                's.start_end_time',
                'c.name AS class_name',
                'cr.name AS classroom_name'
            )
            ->join('schedules as s', 'r.schedule_id', '=', 's.id')
            ->join('classes as c', 's.class_id', '=', 'c.id')
            ->join('class_rooms as cr', 's.classroom_id', '=', 'cr.id')
            ->join('users as u', 'r.user_id', '=', 'u.id')
            ->where('s.id', $scheduleId)
            ->whereNull('r.deleted_at')
            ->orderBy('u.full_name', 'asc')->get();
    }
}