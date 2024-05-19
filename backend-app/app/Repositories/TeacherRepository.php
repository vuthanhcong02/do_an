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
        $banner = $this->model->find($id);
        if (!$banner) {
            return false;
        }
        $banner->update($request->all());
        return $banner;
    }
}
