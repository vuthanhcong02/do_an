<?php

namespace App\Services;

use App\Repositories\NewsRepository;
use Illuminate\Http\Request;

class NewsService
{
    protected $newsRepository;

    public function __construct(NewsRepository $newsRepository)
    {
        $this->newsRepository = $newsRepository;
    }

    public function getAll()
    {
        return $this->newsRepository->getAll();
    }


    public function createNews(Request $request)
    {
        $data = $request->all();
        $teacher = $this->newsRepository->create($data);
        if (!$teacher) {
            return false;
        }
        return $teacher;
    }

    public function getNews($id)
    {
        $teacher = $this->newsRepository->find($id);
        if (!$teacher) {
            return false;
        }
        return $teacher;
    }

    public function updateNews(Request $request, $id)
    {
        $teacher = $this->newsRepository->updateNews($request, $id);
        if (!$teacher) {
            return false;
        }
        return $teacher;
    }

    public function deleteNews($id)
    {
        $news =  $this->newsRepository->delete($id);
        if (!$news) {
            return false;
        }
        return $news;
    }

    public function getNewsByFeatured()
    {
        $news = $this->newsRepository->getNewsByFeatured();
        if (!$news) {
            return false;
        }
        return $news;
    }

    public function getNewsOrderById()
    {
        $news = $this->newsRepository->getNewsByOrderById();
        if (!$news) {
            return false;
        }
        return $news;
    }
}
