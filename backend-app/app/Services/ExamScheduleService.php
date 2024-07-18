<?php

namespace App\Services;

use Illuminate\Http\Request;
use App\Models\ExamSchedule;

class ExamScheduleService extends BaseService
{
    public function __construct(ExamSchedule $examSchedule)
    {
        parent::__construct($examSchedule);
    }

    public function getAllExamSchedules()
    {
        return $this->model->with('exam', 'classroom')->orderBy('id', 'desc')->paginate(10);
    }
}
