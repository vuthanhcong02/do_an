<?php

namespace App\Services;

use Illuminate\Http\Request;
use App\Models\Notification;

class NotificationService extends BaseService
{
    public function __construct(Notification $notification)
    {
        parent::__construct($notification);
    }

    public function getAllNotifications()
    {
        return $this->model::with('notificationType')->orderBy('id', 'desc')->paginate(10);
    }

    public function getNotification($slug)
    {
        return $this->model::where('slug', $slug)->first();
    }
}