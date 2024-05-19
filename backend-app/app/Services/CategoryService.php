<?php

namespace App\Services;

use App\Repositories\CategoryRepository;
use Illuminate\Http\Request;

class CategoryService
{
    protected $categoryRepository;

    public function __construct(CategoryRepository $categoryRepository)
    {
        $this->categoryRepository = $categoryRepository;
    }

    public function getAll()
    {
        return $this->categoryRepository->getAll();
    }


    public function createCategory(Request $request)
    {
        $data = $request->all();
        $teacher = $this->categoryRepository->create($data);
        if (!$teacher) {
            return false;
        }
        return $teacher;
    }

    public function getCategory($id)
    {
        $teacher = $this->categoryRepository->find($id);
        if (!$teacher) {
            return false;
        }
        return $teacher;
    }

    public function updateCategory(Request $request, $id)
    {
        $teacher = $this->categoryRepository->updateCategory($request, $id);
        if (!$teacher) {
            return false;
        }
        return $teacher;
    }

    public function deleteCategory($id)
    {
        return $this->categoryRepository->delete($id);
    }
}
