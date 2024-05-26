<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;

use App\Services\CourseService;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    protected $courseService;

    public function __construct(CourseService $courseService)
    {
        $this->courseService = $courseService;
    }


    //
    public function index()
    {

        $courses = $this->courseService->getAll();
        if (!$courses) {
            return $this->customResponse(404, false, null, 'Course not found', null);
        }

        return $this->customResponse(200, true, $courses);
    }



    public function createCourse(Request $request)
    {
        $data = $request->all();
        if ($request->hasFile('image') && $request->file('image')->isValid()) {
            $file = $request->file('image');
            $fileName = Str::random(32) . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('uploads/courses'), $fileName);
            $data['image'] = 'uploads/courses/' . $fileName;
        } else {
            $data['image'] = null;
        }
        // dd($data);
        $course = $this->courseService->create($data);
        if (!$course) {
            return $this->customResponse(404, false, null, 'Course not created', null);
        }

        return $this->customResponse(201, true, $course);
    }

    public function show($id)
    {
        $course = $this->courseService->find($id);
        if (!$course) {
            return $this->customResponse(404, false, null, 'Course not found', null);
        }
        return $this->customResponse(200, true, $course);
    }

    public function update(Request $request, $id)
    {
        $data = $request->all();
        if ($request->hasFile('image') && $request->file('image')->isValid()) {
            $file = $request->file('image');
            $fileName = Str::random(32) . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('uploads/courses'), $fileName);
            $data['image'] = 'uploads/courses/' . $fileName;
        }
        $course = $this->courseService->update($id, $data);
        if (!$course) {
            return $this->customResponse(false, 'Course not updated', 404);
        }
        return $this->customResponse(true, $course, 200);
    }


    public function destroy($id)
    {
        $course = $this->courseService->delete($id);
        if (!$course) {
            return $this->customResponse(404, false, null, 'Course not deleted', null);
        }
        return $this->customResponse(200, true, $course);
    }

    public function getCourseOrderById()
    {
        $courses = $this->courseService->getCourseOrderById();
        if (!$courses) {
            return $this->customResponse(404, false, null, 'Course not found', null);
        }
        return $this->customResponse(200,  true, $courses);
    }

    public function getCourseByFeatured()
    {
        $courses = $this->courseService->getCourseByFeatured();
        if (!$courses) {
            return $this->customResponse(404, false, null, 'Course not found', null);
        }
        return $this->customResponse(200,  true, $courses);
    }

    public function getCourseByEnglishCategory()
    {
        $courses = $this->courseService->getCoursesByEnglishCategory();
        if (!$courses) {
            return $this->customResponse(404, false, null, 'Course not found', null);
        }
        return $this->customResponse(200,  true, $courses);
    }

    public function getCourseByInformationCategory()
    {
        $courses = $this->courseService->getCoursesByInformationCategory();
        if (!$courses) {
            return $this->customResponse(404, false, null, 'Course not found', null);
        }
        return $this->customResponse(200,  true, $courses);
    }
}