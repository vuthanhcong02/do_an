<?php

namespace App\Services;

use Illuminate\Http\Request;
use App\Models\News;

class NewsService extends BaseService
{

    public function __construct(News $news)
    {
        parent::__construct($news);
    }

    public function getNewsByFeatured()
    {
        return $this->model->where('featured', 1)->limit(5)->orderBy('created_at', 'desc')->get();
    }

    public function getNewsByOrderById()
    {
        return $this->model->orderBy('id', 'desc')->limit(5)->get();
    }
}
