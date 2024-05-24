<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\NewsService;

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
        $news = $this->newsService->update($data, $id);
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
