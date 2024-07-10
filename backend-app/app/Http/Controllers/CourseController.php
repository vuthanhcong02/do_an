<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;

use App\Services\CourseService;
use App\Services\ImageUploadService;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    protected $courseService, $imageUploadService;

    public function __construct(CourseService $courseService, ImageUploadService $imageUploadService)
    {
        $this->courseService = $courseService;
        $this->imageUploadService = $imageUploadService;
    }


    //
    public function index()
    {

        $courses = $this->courseService->getAllCourse();
        if (!$courses) {
            return $this->customResponse(404, false, null, 'Course not found', null);
        }

        return $this->customResponse(200, true, $courses);
    }



    public function createCourse(Request $request)
    {
        $data = $request->all();


        if ($request->hasFile('image')) {
            $image = $request->file('image');

            $path = $this->imageUploadService->uploadImage($image, 'courses');

            $data['image'] = $path;
        }

        // dd($data);
        $course = $this->courseService->create($data);
        if (!$course) {
            return $this->customResponse(404, false, null, 'Course not created', null);
        }

        return $this->customResponse(201, true, $course);
    }

    public function show(string $slug)
    {
        $course = $this->courseService->showDetail($slug);
        if (!$course) {
            return $this->customResponse(404, false, null, 'Course not found', null);
        }
        return $this->customResponse(200, true, $course);
    }

    public function update(Request $request, $id)
    {
        $data = $request->all();
        $course = $this->courseService->find($id);
        if (!$course) {
            return $this->customResponse(404, false, null, 'Course not found', null);
        }

        if ($request->hasFile('image')) {
            $image = $request->file('image');

            $path = $this->imageUploadService->uploadImage($image, 'courses');

            if ($course->image) {
                $this->imageUploadService->deleteImage($course->image);
            }

            $data['image'] = $path;
        }


        $course = $this->courseService->update($id, $data);
        if (!$course) {
            return $this->customResponse(false, 'Course not updated', 404);
        }
        return $this->customResponse(true, $course, 200);
    }


    public function destroy($id)
    {
        $course = $this->courseService->find($id);
        if (!$course) {
            return $this->customResponse(404, false, null, 'Course not found', null);
        }
        $course->delete();
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