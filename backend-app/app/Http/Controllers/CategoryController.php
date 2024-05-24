<?php

namespace App\Http\Controllers;

use App\Services\CategoryService;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    //

    protected $categoryService;

    public function __construct(CategoryService $categoryService)
    {
        $this->categoryService = $categoryService;
    }

    public function index()
    {
        $categories = $this->categoryService->getAll();
        if (!$categories) {
            return $this->customResponse(false, 'Categories not found', 404);
        }

        return $this->customResponse(true, $categories, 200);
    }

    public function store(Request $request)
    {
        $data = $request->all();
        $category = $this->categoryService->create($data);
        if (!$category) {
            return $this->customResponse(false, 'Category not created', 404);
        }
        return $this->customResponse(true, $category, 201);
    }

    public function show($id)
    {
        $category = $this->categoryService->find($id);
        if (!$category) {
            return $this->customResponse(false, 'Category not found', 404);
        }
        return $this->customResponse(true, $category, 200);
    }

    public function update(Request $request, $id)
    {
        $data = $request->all();
        $category = $this->categoryService->update($data, $id);
        if (!$category) {
            return $this->customResponse(false, 'Category not updated', 404);
        }
        return $this->customResponse(true, $category, 200);
    }

    public function destroy($id)
    {
        $category = $this->categoryService->delete($id);
        if (!$category) {
            return $this->customResponse(false, 'Category not deleted', 404);
        }
        return $this->customResponse(true, $category, 200);
    }
}
