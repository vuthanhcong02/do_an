<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    //

    public function index()
    {
        return view('Dashboard.user.index');
    }

    public function create()
    {
        return view('Dashboard.user.create');
    }

    public function show()
    {
        return view('Dashboard.user.show');
    }

    public function edit()
    {
        return view('Dashboard.user.edit');
    }
}