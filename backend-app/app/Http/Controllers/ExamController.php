<?php

namespace App\Http\Controllers;

use App\Services\ExamService;
use Illuminate\Http\Request;

class ExamController extends Controller
{
    //
    protected $examService;

    public function __construct(ExamService $examService)
    {
        $this->examService = $examService;
    }

    public function getAll()
    {

        $exams = $this->examService->getAllExams();
        if (!$exams) {
            return $this->customResponse(404, false, null, 'Exams not found', null);
        }

        return $this->customResponse(200, true, $exams, null, null);
    }

    public function show(string $id)
    {
        $exam = $this->examService->find($id);
        if (!$exam) {
            return $this->customResponse(404, false, null, 'Exam not found', null);
        }
        return $this->customResponse(200, true, $exam, null, null);
    }

    public function store(Request $request)
    {
        $exam = $this->examService->create($request->all());
        if (!$exam) {
            return $this->customResponse(500, false, null, 'Something went wrong', null);
        }
        return $this->customResponse(201, true, $exam, null, null);
    }

    public function update(Request $request, string $id)
    {
        $data = $request->all();
        $exam = $this->examService->find($id);
        if (!$exam) {
            return $this->customResponse(404, false, null, 'Exam not found', null);
        }
        $this->examService->update($exam->id, $data);
        return $this->customResponse(200, true, $exam, null, null);
    }

    public function destroy(string $id)
    {
        $exam = $this->examService->find($id);
        if (!$exam) {
            return $this->customResponse(404, false, null, 'Exam not found', null);
        }
        $this->examService->delete($exam->id);
        return $this->customResponse(200, true, null, null, null);
    }

    public function getExamActive()
    {
        $exams = $this->examService->getAllExamActive();
        if (!$exams) {
            return $this->customResponse(404, false, null, 'Exams not found', null);
        }
        return $this->customResponse(200, true, $exams, null, null);
    }
}