<?php

namespace App\Http\Controllers;

use App\Services\UserService;
use Illuminate\Http\Request;

class UserController extends Controller
{
    //

    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }


    public function getAll()
    {

        $users = $this->userService->getAll();
        if (!$users) {
            return $this->customResponse(404, false, null, 'User not found', null);
        }
        return $this->customResponse(200, true, $users, null, null);
    }
    public function create()
    {
        return view('Dashboard.user.create');
    }

    public function show()
    {
        return view('Dashboard.user.show');
    }

    public function edit()
    {
        return view('Dashboard.user.edit');
    }
}
