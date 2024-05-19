<?php

namespace App\Repositories;

use App\Models\Category;
use App\Repositories\BaseRepository;
use Illuminate\Http\Request;

class CategoryRepository extends BaseRepository
{
    public function getModel()
    {
        return Category::class;
    }

    public function updateCategory(Request $request, $id)
    {
        $banner = $this->model->find($id);
        if (!$banner) {
            return false;
        }
        $banner->update($request->all());
        return $banner;
    }
}
