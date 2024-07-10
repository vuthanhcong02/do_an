<?php

namespace App\Http\Controllers;

use App\Services\NotificationService;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    //
    protected $notificationService;

    public function __construct(NotificationService $notificationService)
    {
        $this->notificationService = $notificationService;
    }

    public function index()
    {
        $notifications = $this->notificationService->getAllNotifications();
        if (!$notifications) {
            return $this->customResponse(404, false, null, 'Notification not found', null);
        }
        return $this->customResponse(200, true, $notifications, null, null);
    }

    public function show(string $slug)
    {
        $banner = $this->notificationService->getNotification($slug);
        if (!$banner) {
            return $this->customResponse(404, false, null, 'Notification not found', null);
        }
        return $this->customResponse(200, true, $banner, null, null);
    }

    public function create(Request $request)
    {
        $data = $request->all();
        $notification = $this->notificationService->create($data);
        if (!$notification) {
            return $this->customResponse(500, false, null, 'Notification not created', null);
        }
        return $this->customResponse(200, true, $notification, null, null);
    }

    public function update(Request $request, $id)
    {
        $data = $request->all();
        $notification = $this->notificationService->update($id, $data);
        if (!$notification) {
            return $this->customResponse(404, false, null, 'Notification not found', null);
        }
        return $this->customResponse(200, true, $notification, null, null);
    }

    public function destroy($id)
    {
        $notification = $this->notificationService->delete($id);
        if (!$notification) {
            return $this->customResponse(404, false, null, 'Notification not found', null);
        }
        return $this->customResponse(200, true, $notification, null, null);
    }
}