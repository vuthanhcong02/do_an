<?php

namespace App\Services;

use Illuminate\Http\Request;
use App\Models\Exam;

class ExamService extends BaseService
{
    public function __construct(Exam $exam)
    {
        parent::__construct($exam);
    }

    public function getAllExams()
    {
        return $this->model->orderBy('id', 'DESC')->paginate(10);
    }

    public function getAllExamActive()
    {
        return $this->model::with('classroom')->where('status', true)->orderBy('id', 'DESC')->paginate(10);
    }

    public function countExams()
    {
        return $this->model->count();
    }
}