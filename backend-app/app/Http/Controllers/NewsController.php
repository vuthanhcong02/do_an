<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class NewsController extends Controller
{
    //
    public function index()
    {
        return view('Dashboard.news.index');
    }

    public function create()
    {
        return view('Dashboard.news.create');
    }

    public function edit()
    {
        return view('Dashboard.news.edit');
    }
}