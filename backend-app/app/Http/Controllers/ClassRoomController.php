<?php

namespace App\Http\Controllers;

use App\Services\ClassRoomService;
use Illuminate\Http\Request;

class ClassRoomController extends Controller
{
    //
    protected $classRoomService;

    public function __construct(ClassRoomService $classRoomService)
    {
        $this->classRoomService = $classRoomService;
    }


    public function getAll()
    {
        $classRooms = $this->classRoomService->getAll();
        if (!$classRooms) {
            return $this->customResponse(404, false, null, 'ClassRoom not found', null);
        }

        return $this->customResponse(200, true, $classRooms, null, null);
    }

    public function createClassRoom(Request $request)
    {
        $data = $request->all();
        $classRoom = $this->classRoomService->create($data);
        if (!$classRoom) {
            return $this->customResponse(400, false, null, 'ClassRoom not created', null);
        }

        return $this->customResponse(200, true, $classRoom, null, null);
    }

    public function showClassRoom($id)
    {
        $classRoom = $this->classRoomService->find($id);
        if (!$classRoom) {
            return $this->customResponse(404, false, null, 'ClassRoom not found', null);
        }

        return $this->customResponse(200, true, $classRoom, null, null);
    }

    public function updateClassRoom(Request $request, $id)
    {
        $data = $request->all();
        $classRoom = $this->classRoomService->update($id, $data);
        if (!$classRoom) {
            return $this->customResponse(400, false, null, 'ClassRoom not updated', null);
        }

        return $this->customResponse(200, true, $classRoom, null, null);
    }

    public function deleteClassRoom($id)
    {
        $classRoom = $this->classRoomService->delete($id);
        if (!$classRoom) {
            return $this->customResponse(400, false, null, 'ClassRoom not deleted', null);
        }

        return $this->customResponse(200, true, $classRoom, null, null);
    }
}