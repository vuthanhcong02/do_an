<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\NewsService;
use Illuminate\Support\Str;

class NewsController extends Controller
{
    protected $newsService;

    public function __construct(NewsService $newsService)
    {
        $this->newsService = $newsService;
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
        if ($request->hasFile('image') && $request->file('image')->isValid()) {
            $file = $request->file('image');
            $fileName = Str::random(32) . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('uploads/news'), $fileName);
            $data['image'] = 'uploads/news/' . $fileName;
        } else {
            $data['image'] = null;
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
        if ($request->hasFile('image') && $request->file('image')->isValid()) {
            $file = $request->file('image');
            $fileName = Str::random(32) . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('uploads/news'), $fileName);
            $data['image'] = 'uploads/news/' . $fileName;
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

        return $this->customResponse(200, true, $news);
    }
}