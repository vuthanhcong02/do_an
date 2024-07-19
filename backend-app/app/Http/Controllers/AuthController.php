<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\CreateUserRequest;
use App\Jobs\SendEmailAccountRegister;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Services\AuthService;
use App\Services\ImageUploadService;
use Validator;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    protected $authService, $imageUploadService;

    public function __construct(AuthService $authService, ImageUploadService $imageUploadService)
    {
        $this->authService = $authService;
        $this->imageUploadService = $imageUploadService;
        $this->middleware('auth:api', ['except' => ['login', 'register', 'adminLogin', 'loginWithSocial', 'verifyEmail']]);
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

    public function loginWithSocial(Request $request)
    {
        $user = $this->authService->loginWithSocial($request);
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
        $verificationUrl = 'http://localhost:3000/verify-email/' . $user->remember_token;
        SendEmailAccountRegister::dispatch($user, $verificationUrl);

        return $this->customResponse(200, true, $user, null, null);
        // return $this->createNewToken($token);
    }

    public function verifyEmail($token)
    {
        $user = $this->authService->verifyEmail($token);
        if (!$user) {
            return $this->customResponse(401, false, null, 'Email verification failed', null);
        }

        if (!$tokenLogin = auth()->login($user)) {
            return $this->customResponse(401, false, null, 'Email verification failed', null);
        }

        return $this->createNewToken($tokenLogin);
        // return $this->customResponse(200, true, null, null, null);
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

    public function adminLogout()
    {
        if (!Auth::check()) {
            return $this->customResponse(401, false, null, 'Unauthenticated.', null);
        }

        Auth::logout();
        return $this->customResponse(200, true, null, null, null);
    }

    public function adminLogin(Request $request)

    {

        $user = $this->authService->adminLogin($request);
        if (!$user) {
            return $this->customResponse(401, false, null, 'Email or password not correct', null);
        }

        if (!$token = auth()->login($user)) {
            return $this->customResponse(401, false, null, 'Email or password not correct', null);
        }
        return $this->createNewToken($token);
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

    public function updateProfile(Request $request)
    {
        $user = auth()->user();
        $id = $user->id;
        $data = $request->all();
        if ($request->hasFile('avatar')) {
            $avatar = $request->file('avatar');

            $path = $this->imageUploadService->uploadImage($avatar, 'avatars');

            if ($user->avatar) {
                $this->imageUploadService->deleteImage($user->avatar);
            }

            $data['avatar'] = $path;
        }
        $user = $this->authService->update($id, $data);
        if (!$user) {
            return $this->customResponse(401, false, null, 'Update failed', null);
        }
        return $this->customResponse(200, true, $user, null, null);
    }

    public function changePassword(Request $request)
    {
        $data = $request->all();
        $data['password'] = bcrypt($data['password']);
        $user = auth()->user();
        $user = $this->authService->update($user->id, $data);
        if (!$user) {
            return $this->customResponse(401, false, null, 'Change password failed', null);
        }
        return $this->customResponse(200, true, $user, null, null);
    }
}