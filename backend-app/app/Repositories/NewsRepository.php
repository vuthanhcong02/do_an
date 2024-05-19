<?php

namespace App\Repositories;

use App\Models\News;
use App\Repositories\BaseRepository;
use Illuminate\Http\Request;

class NewsRepository extends BaseRepository
{
    public function getModel()
    {
        return News::class;
    }

    public function updateNews(Request $request, $id)
    {
        $news = $this->model->find($id);
        if (!$news) {
            return false;
        }
        $news->update($request->all());
        return $news;
    }

    public function getNewsByFeatured()
    {
        $news = $this->model->where('featured', 1)->limit(5)->orderBy('created_at', 'desc')->get();
        if (!$news) {
            return false;
        }
        return $news;
    }
    public function getNewsByOrderById()
    {
        $news = $this->model->orderBy('id', 'desc')->limit(5)->get();
        if (!$news) {
            return false;
        }
        return $news;
    }
}
