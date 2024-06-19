<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\CreateUserRequest;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Services\AuthService;
use Validator;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {

        // dd("123");
        $user = $this->authService->login($request);
        // echo ($user);
        if (!$user) {
            return $this->customResponse(401, false, null, 'Email or password not correct', null);
        }

        if (!$token = auth()->login($user)) {
            return $this->customResponse(401, false, null, 'Email or password not correct', null);
        }

        return $this->createNewToken($token);
    }

    /**
     * Register a User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(CreateUserRequest $request)
    {
        $user = $this->authService->register($request);
        if (!$user) {
            return $this->customResponse(401, false, null, 'Register failed', null);
        }
        if (!$token = auth()->login($user)) {
            return $this->customResponse(401, false, null, 'Register failed', null);
        }

        return $this->createNewToken($token);
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        // dd("logout");
        if (!Auth::check()) {
            return $this->customResponse(401, false, null, 'Unauthenticated.', null);
        }

        Auth::logout();
        return $this->customResponse(200, true, null, null, null);
    }

    public function user_profile()
    {
        $user = auth()->user();
        return $this->customResponse(200, true, $user, null, null);
    }
    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->createNewToken(auth()->refresh());
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */


    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function createNewToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'expires_in' => auth()->factory()->getTTL() * 60,
            'data' =>  ['user' => auth()->user()],
            'statusCode' => 200,
            'success' => true,
        ], 200);
    }
}