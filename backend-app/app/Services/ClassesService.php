<?php

namespace App\Services;

use Illuminate\Http\Request;
use App\Models\Classes;

class ClassesService extends BaseService
{
    public function __construct(Classes $classes)
    {
        parent::__construct($classes);
    }

    public function getAllClasses()
    {
        return $this->model->with('course', 'teacher')->orderBy('id', 'desc')->paginate(10);
    }
}