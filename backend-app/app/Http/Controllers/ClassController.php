<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ClassController extends Controller
{
    //

    public function index()
    {
        return view('Dashboard.class.index');
    }

    public function create()
    {
        return view('Dashboard.class.create');
    }

    public function edit()

    {
        return view('Dashboard.class.edit');
    }
}