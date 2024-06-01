<?php

namespace App\Services;

use Illuminate\Http\Request;
use App\Models\Event;

class EventService extends BaseService
{

    public function __construct(Event $event)
    {
        parent::__construct($event);
    }

    public function getEventsByFeatured()
    {
        return $this->model->where('status', 1)->limit(5)->orderBy('created_at', 'desc')->get();
    }

    public function getEventsByOrderById()
    {
        return $this->model->orderBy('id', 'desc')->limit(5)->get();
    }
}