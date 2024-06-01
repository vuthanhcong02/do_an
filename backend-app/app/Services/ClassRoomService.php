<?php

namespace App\Services;

use Illuminate\Http\Request;
use App\Models\ClassRoom;

class ClassRoomService extends BaseService
{
    public function __construct(ClassRoom $classRoom)
    {
        parent::__construct($classRoom);
    }
}