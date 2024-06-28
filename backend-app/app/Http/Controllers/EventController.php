<?php

namespace App\Http\Controllers;

use App\Services\EventService;
use App\Services\ImageUploadService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;


class EventController extends Controller
{
    protected $eventService, $imageUploadService;
    public function __construct(EventService $eventService, ImageUploadService $imageUploadService)
    {
        $this->imageUploadService = $imageUploadService;
        $this->eventService = $eventService;
    }
    //
    public function index()
    {
        $events = $this->eventService->getAll();
        if (!$events) {
            return $this->customResponse(404, false, null, 'Not found', null);
        }
        return $this->customResponse(200, true, $events, null, null);
    }

    public function getEventsByFeatured()
    {
        $events = $this->eventService->getEventsByFeatured();
        if (!$events) {
            return $this->customResponse(404, false, null, 'Not found', null);
        }
        return $this->customResponse(200, true, $events, null, null);
    }

    public function store(Request $request)
    {
        $data = $request->all();

        if ($request->hasFile('image')) {
            $image = $request->file('image');

            $path = $this->imageUploadService->uploadImage($image, 'events');

            $data['image'] = $path;
        }

        $banner = $this->eventService->create($data);

        if (!$banner) {
            return $this->customResponse(400, false, null, 'Event not created', null);
        }

        return $this->customResponse(200, true, $banner, null, null);
    }

    public function updateEvent(Request $request, string $id)
    {
        $data = $request->all();

        $event = $this->eventService->find($id);
        if (!$event) {
            return $this->customResponse(404, false, null, 'Event not found', null);
        }

        if ($request->hasFile('image')) {
            $image = $request->file('image');

            $path = $this->imageUploadService->uploadImage($image, 'events');

            if ($event->image) {
                $this->imageUploadService->deleteImage($event->image);
            }

            $data['image'] = $path;
        }


        $banner = $this->eventService->update($id, $data);

        if (!$banner) {
            return $this->customResponse(404, false, null, 'Banner not updated', null);
        }

        return $this->customResponse(200, true, $banner, null, null);
    }

    public function show(string $id)
    {
        $banner = $this->eventService->find($id);
        if (!$banner) {
            return $this->customResponse(404, false, null, 'Banner not found', null);
        }
        return $this->customResponse(200, true, $banner, null, null);
    }

    public function destroy(string $id)
    {
        $banner = $this->eventService->delete($id);
        if (!$banner) {
            return $this->customResponse(404, false, null, 'Banner not found', null);
        }
        if ($banner->image) {
            $this->imageUploadService->deleteImage($banner->image);
        }
        return $this->customResponse(200, true, $banner, null, null);
    }
}