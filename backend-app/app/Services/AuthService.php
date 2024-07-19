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
        if (isset($data['password'])) {
            $credentials = ['password' => $data['password']];

            if (isset($data['email'])) {
                $credentials['email'] = $data['email'];
            } elseif (isset($data['phone'])) {
                $credentials['phone'] = $data['phone'];
            } elseif (isset($data['id_card'])) {
                $credentials['id_card'] = $data['id_card'];
            } else {
                return false;
            }

            if (!Auth::attempt($credentials)) {
                return false;
            }
            if ($this->findEmailUnverified($data['email'])) {
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
            'remember_token' => Str::random(10),
        ]);

        return $user;
    }

    public function verifyEmail($token)
    {
        $user = User::where('remember_token', $token)->first();

        if (!$user) {
            return false;
        }

        $user->email_verified_at = now();
        $user->remember_token = null;
        $user->save();

        return $user;
    }

    public function findEmailUnverified($email)
    {
        return $this->model->where('email', $email)->where('email_verified_at', null)->first();
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

    public function loginWithSocial($data)
    {
        $user = $this->model->where('email', $data['email'])->first();
        if (!$user) {
            $user = $this->model->create([
                'full_name' => $data['name'] ?? null,
                'email' => $data['email'] ?? null,
                'password' => null,
                'gender' => $data['gender'] ?? null,
                'phone' => $data['phone'] ?? null,
                'address' => $data['address'] ?? null,
                'object_type' => $data['object_type'] ?? null,
                'date_of_birthday' => $data['date_of_birthday'] ?? null,
                'id_card' => $data['id_card'] ?? null,
                'email_verified_at' => Carbon::now(),
            ]);
        }
        if ($user) {
            Auth::login($user);
            return $user;
        }
        return false;
    }
}