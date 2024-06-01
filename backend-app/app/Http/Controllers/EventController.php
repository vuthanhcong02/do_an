<?php

namespace App\Http\Controllers;

use App\Services\EventService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;


class EventController extends Controller
{
    protected $eventService;
    public function __construct(EventService $eventService)
    {
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
        if ($request->hasFile('image') && $request->file('image')->isValid()) {
            $file = $request->file('image');
            $fileName = Str::random(32) . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('uploads/events'), $fileName);
            $data['image'] = 'uploads/events/' . $fileName;
        } else {
            $data['image'] = null;
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

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $fileName = Str::random(32) . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('uploads/events'), $fileName);
            $data['image'] = 'uploads/events/' . $fileName;
        } else {
        }

        $banner = $this->eventService->update($id, $data);

        if (!$banner) {
            return $this->customResponse(404, false, null, 'Banner not found', null);
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
        return $this->customResponse(200, true, $banner, null, null);
    }
}