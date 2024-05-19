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
        $category = $this->model->find($id);
        if (!$category) {
            return false;
        }
        $category->update($request->all());
        return $category;
    }
}
