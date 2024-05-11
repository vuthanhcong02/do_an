<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CourseController extends Controller
{
    //
    public function index()
    {
        return view('Dashboard.course.index');
    }

    public function create()

    {

        return view('Dashboard.course.create');
    }

    public function show()
    {
        return view('Dashboard.course.show');
    }

    public function edit()
    {
        return view('Dashboard.course.edit');
    }
}