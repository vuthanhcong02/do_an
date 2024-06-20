<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthService extends BaseService
{
    public function __construct(User $user)
    {
        parent::__construct($user);
    }


    public function login($data)
    {
        if (isset($data['email']) && isset($data['password'])) {
            $credentials = ['email' => $data['email'], 'password' => $data['password']];

            if (!Auth::attempt($credentials)) {
                return false;
            }


            return auth()->user();
        }

        return false;
    }


    public function register($data)

    {

        $user = $this->model->create([
            'full_name' => $data['full_name'] ?? null,
            'email' => $data['email'] ?? null,
            'gender' => $data['gender'] ?? null,
            'password' => bcrypt($data['password'] ?? null),
            'phone' => $data['phone'] ?? null,
            'address' => $data['address'] ?? null,
            'object_type' => $data['object_type'] ?? null,
            'date_of_birthday' => $data['date_of_birthday'] ?? null,
            'id_card' => $data['id_card'] ?? null,
        ]);

        return $user;
    }

    public function adminLogin($data)
    {
        if (isset($data['email']) && isset($data['password'])) {
            $credentials = ['email' => $data['email'], 'password' => $data['password']];
            if (!Auth::attempt($credentials)) {
                return false;
            }
            if (auth()->user()->role != 'admin') {
                return false;
            }
            return auth()->user();
        }
        return false;
    }
}