<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ExamScheduleController extends Controller
{
    //

    public function index()
    {
        return view('Dashboard.exam-schedule.index');
    }

    public function create()
    {
        return view('Dashboard.exam-schedule.create');
    }

    public function edit()
    {
        return view('Dashboard.exam-schedule.edit');
    }
}