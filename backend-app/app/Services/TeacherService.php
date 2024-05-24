<?php

namespace App\Services;

use Illuminate\Http\Request;
use App\Models\Teacher;

class TeacherService extends BaseService
{
    public function __construct(Teacher $teacher)
    {
        parent::__construct($teacher);
    }
}
