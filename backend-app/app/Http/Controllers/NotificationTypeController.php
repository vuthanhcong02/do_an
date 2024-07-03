<?php

namespace App\Http\Controllers;

use App\Services\NotificationTypeService;
use Illuminate\Http\Request;

class NotificationTypeController extends Controller
{
    //

    protected $notificationTypeService;

    public function __construct(NotificationTypeService $notificationTypeService)
    {
        $this->notificationTypeService = $notificationTypeService;
    }

    public function index()
    {
        $notifications = $this->notificationTypeService->getAll();
        if (!$notifications) {
            return $this->customResponse(404, false, null, 'Notification not found', null);
        }
        return $this->customResponse(200, true, $notifications, null, null);
    }

    public function show(string $id)
    {
        $banner = $this->notificationTypeService->find($id);
        if (!$banner) {
            return $this->customResponse(404, false, null, 'Banner not found', null);
        }
        return $this->customResponse(200, true, $banner, null, null);
    }

    public function create(Request $request)
    {
        $data = $request->all();
        $notification = $this->notificationTypeService->create($data);
        if (!$notification) {
            return $this->customResponse(500, false, null, 'Notification not created', null);
        }
        return $this->customResponse(200, true, $notification, null, null);
    }

    public function update(Request $request, $id)
    {
        $data = $request->all();
        $notification = $this->notificationTypeService->update($id, $data);
        if (!$notification) {
            return $this->customResponse(404, false, null, 'Notification not found', null);
        }
        return $this->customResponse(200, true, $notification, null, null);
    }

    public function destroy($id)
    {
        $notification = $this->notificationTypeService->delete($id);
        if (!$notification) {
            return $this->customResponse(404, false, null, 'Notification not found', null);
        }
        return $this->customResponse(200, true, $notification, null, null);
    }
}