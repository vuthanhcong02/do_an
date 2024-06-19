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
            return $this->customResponse(404, false, null, 'Category not found', null);
        }

        return $this->customResponse(200, true, $categories, null, null);
    }

    public function store(Request $request)
    {
        $data = $request->all();
        $category = $this->categoryService->create($data);
        if (!$category) {
            return $this->customResponse(404, false, null, 'Category not found', null);
        }

        return $this->customResponse(200, true, $category, null, null);
    }

    public function show($id)
    {
        $category = $this->categoryService->find($id);
        if (!$category) {
            return $this->customResponse(404, false, null, 'Category not found', null);
        }
        return $this->customResponse(200, true, $category, null, null);
    }

    public function updateCategory(Request $request, $id)
    {
        $data = $request->all();
        // dd($data);
        $category = $this->categoryService->update($id, $data);
        if (!$category) {
            return $this->customResponse(400, false, null, 'Category not updated', null);
        }
        return $this->customResponse(200, true, $category, null, null);
    }

    public function destroy($id)
    {
        $category = $this->categoryService->delete($id);
        if (!$category) {
            return $this->customResponse(400, false, null, 'Category not deleted', null);
        }
        return $this->customResponse(200, true, $category, null, null);
    }
}
