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
        $category = $this->categoryService->createCategory($request);
        if (!$category) {
            return $this->customResponse(false, 'Category not created', 404);
        }
        return $this->customResponse(true, $category, 201);
    }

    public function show($id)
    {
        $category = $this->categoryService->getCategory($id);
        if (!$category) {
            return $this->customResponse(false, 'Category not found', 404);
        }
        return $this->customResponse(true, $category, 200);
    }

    public function update(Request $request, $id)
    {
        $category = $this->categoryService->updateCategory($request, $id);
        if (!$category) {
            return $this->customResponse(false, 'Category not updated', 404);
        }
        return $this->customResponse(true, $category, 200);
    }

    public function destroy($id)
    {
        $category = $this->categoryService->deleteCategory($id);
        if (!$category) {
            return $this->customResponse(false, 'Category not deleted', 404);
        }
        return $this->customResponse(true, $category, 200);
    }
}
