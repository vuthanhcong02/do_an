<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RegisterCourseController extends Controller
{
    //

    public function index()
    {
        return view('Dashboard.register-course.index');
    }

    public function create()
    {
        return view('Dashboard.register-course.create');
    }

    public function show()
    {
        return view('Dashboard.register-course.show');
    }

    public function edit()
    {
        return view('Dashboard.register-course.edit');
    }
}