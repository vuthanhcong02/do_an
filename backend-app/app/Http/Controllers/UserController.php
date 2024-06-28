<?php

namespace App\Http\Controllers;

use App\Services\ImageUploadService;
use App\Services\UserService;
use Illuminate\Http\Request;

class UserController extends Controller
{
    //

    protected $userService, $imageUploadService;

    public function __construct(UserService $userService, ImageUploadService $imageUploadService)
    {
        $this->userService = $userService;
        $this->imageUploadService = $imageUploadService;
    }


    public function getAll()
    {

        $users = $this->userService->getAll();
        if (!$users) {
            return $this->customResponse(404, false, null, 'User not found', null);
        }
        return $this->customResponse(200, true, $users, null, null);
    }

    public function show($id)
    {
        $user = $this->userService->find($id);
        if (!$user) {
            return $this->customResponse(404, false, null, 'User not found', null);
        }
        return $this->customResponse(200, true, $user, null, null);
    }

    public function updateUser(Request $request, $id)
    {
        $data = $request->all();
        $user = $this->userService->find($id);
        if (!$user) {
            return $this->customResponse(404, false, null, 'User not found', null);
        }
        if ($request->hasFile('avatar')) {
            $avatar = $request->file('avatar');

            $path = $this->imageUploadService->uploadImage($avatar, 'avatars');

            if ($user->avatar) {
                $this->imageUploadService->deleteImage($user->avatar);
            }

            $data['avatar'] = $path;
        }
        $user = $this->userService->update($id, $data);
        if (!$user) {
            return $this->customResponse(404, false, null, 'User not updated', null);
        }
        return $this->customResponse(200, true, $user, null, null);
    }

    public function destroy($id)
    {
        $user = $this->userService->find($id);
        if (!$user) {
            return $this->customResponse(404, false, null, 'User not found', null);
        }
        if ($user->avatar) {
            $this->imageUploadService->deleteImage($user->avatar);
        }

        $user = $this->userService->delete($id);
        return $this->customResponse(200, true, $user, null, null);
    }
}