<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::group(['prefix' => '/banners'], function () {
    Route::get('/', [\App\Http\Controllers\BannerController::class, 'getAll']);
    Route::get('/order-by-position', [\App\Http\Controllers\BannerController::class, 'getBannersOrderByPosition']);
    Route::get('/{id}', [\App\Http\Controllers\BannerController::class, 'show']);
    Route::post('/', [\App\Http\Controllers\BannerController::class, 'store']);
    Route::put('/{id}', [\App\Http\Controllers\BannerController::class, 'update']);
    Route::delete('/{id}', [\App\Http\Controllers\BannerController::class, 'destroy']);
});

Route::group(['prefix' => '/teachers'], function () {
    Route::get('/', [\App\Http\Controllers\TeacherController::class, 'getAll']);
    Route::post('/', [\App\Http\Controllers\TeacherController::class, 'createTeacher']);
    Route::get('/{id}', [\App\Http\Controllers\TeacherController::class, 'showTeacher']);
    Route::put('/{id}', [\App\Http\Controllers\TeacherController::class, 'updateTeacher']);
    Route::delete('/{id}', [\App\Http\Controllers\TeacherController::class, 'deleteTeacher']);
});

Route::fallback(function () {
    return response()->json([
        'message' => 'Page Not Found. If error persists, contact info@website.com'
    ], 404);
});
