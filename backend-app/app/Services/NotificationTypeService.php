<?php

namespace App\Services;

use Illuminate\Http\Request;
use App\Models\NotificationType;

class NotificationTypeService extends BaseService
{
    public function __construct(NotificationType $notificationType)
    {
        parent::__construct($notificationType);
    }
}