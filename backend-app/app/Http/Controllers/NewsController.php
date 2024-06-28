<?php

namespace App\Http\Controllers;

use App\Services\ImageUploadService;
use Illuminate\Http\Request;
use App\Services\NewsService;
use Illuminate\Support\Str;

class NewsController extends Controller
{
    protected $newsService, $imageUploadService;

    public function __construct(NewsService $newsService, ImageUploadService $imageUploadService)
    {
        $this->newsService = $newsService;
        $this->imageUploadService = $imageUploadService;
    }

    //
    public function index()
    {
        $news = $this->newsService->getAll();
        if (!$news) {
            return $this->customResponse(404, false, null, 'News not found', null);
        }

        return $this->customResponse(200, true, $news);
    }

    public function create(Request $request)
    {
        $data = $request->all();


        if ($request->hasFile('image')) {
            $avatar = $request->file('image');

            $path = $this->imageUploadService->uploadImage($avatar, 'news');

            $data['image'] = $path;
        }


        $new = $this->newsService->create($data);
        if (!$new) {
            return $this->customResponse(400, false, null, 'News not created', null);
        }

        return $this->customResponse(200, true, $new);
    }

    public function show($id)
    {
        $news = $this->newsService->find($id);
        if (!$news) {
            return $this->customResponse(404, false, null, 'News not found', null);
        }

        return $this->customResponse(200, true, $news);
    }

    public function update(Request $request, $id)
    {
        $data = $request->all();
        $news = $this->newsService->find($id);
        if (!$news) {
            return $this->customResponse(404, false, null, 'News not found', null);
        }

        if ($request->hasFile('image')) {
            $image = $request->file('image');

            $path = $this->imageUploadService->uploadImage($image, 'news');

            if ($news->image) {
                $this->imageUploadService->deleteImage($news->image);
            }

            $data['image'] = $path;
        }


        $news = $this->newsService->update($id, $data);
        if (!$news) {
            return $this->customResponse(404, false, null, 'News not found', null);
        }
        return $this->customResponse(200, true, $news);
    }

    public function destroy($id)
    {
        $news = $this->newsService->delete($id);
        if (!$news) {
            return $this->customResponse(404, false, null, 'News not found', null);
        }

        return $this->customResponse(200, true, $news);
    }

    public function getNewsByFeatured()
    {
        $news = $this->newsService->getNewsByFeatured();
        if (!$news) {
            return $this->customResponse(404, false, null, 'News not found', null);
        }

        return $this->customResponse(200, true, $news);
    }

    public function getNewsOrderById()
    {
        $news = $this->newsService->getNewsByOrderById();
        if (!$news) {
            return $this->customResponse(404, false, null, 'News not found', null);
        }
        if ($news->image) {
            $this->imageUploadService->deleteImage($news->image);
        }
        return $this->customResponse(200, true, $news);
    }
}