<?php

namespace App\Http\Controllers;

use App\Services\ClassesService;
use Illuminate\Http\Request;

class ClassesController extends Controller
{
    //
    protected $classesService;

    public function __construct(ClassesService $classesService)
    {
        $this->classesService = $classesService;
    }


    public function getAll()
    {
        $classes = $this->classesService->getAllClasses();
        if (!$classes) {
            return $this->customResponse(404, false, null, 'Classes not found', null);
        }

        return $this->customResponse(200, true, $classes, null, null);
    }

    public function createClass(Request $request)
    {
        $data = $request->all();
        $class = $this->classesService->create($data);
        if (!$class) {
            return $this->customResponse(400, false, null, 'Class not created', null);
        }

        return $this->customResponse(200, true, $class, null, null);
    }

    public function showClass($id)
    {
        $class = $this->classesService->find($id);
        if (!$class) {
            return $this->customResponse(404, false, null, 'Class not found', null);
        }

        return $this->customResponse(200, true, $class, null, null);
    }

    public function updateClass(Request $request, $id)
    {
        $data = $request->all();
        $class = $this->classesService->update($id, $data);
        if (!$class) {
            return $this->customResponse(400, false, null, 'Class not updated', null);
        }

        return $this->customResponse(200, true, $class, null, null);
    }

    public function destroyClass($id)
    {
        $class = $this->classesService->delete($id);
        if (!$class) {
            return $this->customResponse(400, false, null, 'Class not deleted', null);
        }

        return $this->customResponse(200, true, $class, null, null);
    }

    public function getClassesByCourse($courseId)
    {
        $classes = $this->classesService->getClassesByCourse($courseId);
        if (!$classes) {
            return $this->customResponse(404, false, null, 'Classes not found', null);
        }

        return $this->customResponse(200, true, $classes, null, null);
    }
}