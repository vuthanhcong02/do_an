<?php

namespace App\Repositories;

use App\Models\Teacher;
use App\Repositories\BaseRepository;
use Illuminate\Http\Request;

class TeacherRepository extends BaseRepository
{
    public function getModel()
    {
        return Teacher::class;
    }

    public function updateTeacher(Request $request, $id)
    {
        $teacher = $this->model->find($id);
        if (!$teacher) {
            return false;
        }
        $teacher->update($request->all());
        return $teacher;
    }
}
