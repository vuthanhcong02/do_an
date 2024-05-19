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

Route::group(['prefix' => '/categories'], function () {
    Route::get('/', [\App\Http\Controllers\CategoryController::class, 'index']);
    Route::get('/{id}', [\App\Http\Controllers\CategoryController::class, 'show']);
    Route::post('/', [\App\Http\Controllers\CategoryController::class, 'store']);
    Route::put('/{id}', [\App\Http\Controllers\CategoryController::class, 'update']);
    Route::delete('/{id}', [\App\Http\Controllers\CategoryController::class, 'destroy']);
});

Route::group(['prefix' => '/news'], function () {
    Route::get('/featured', [\App\Http\Controllers\NewsController::class, 'getNewsByFeatured']);
    Route::get('/order-by-id', [\App\Http\Controllers\NewsController::class, 'getNewsOrderById']);
    Route::get('/', [\App\Http\Controllers\NewsController::class, 'index']);
    Route::get('/{id}', [\App\Http\Controllers\NewsController::class, 'show']);

    Route::post('/', [\App\Http\Controllers\NewsController::class, 'create']);
    Route::put('/{id}', [\App\Http\Controllers\NewsController::class, 'update']);
    Route::delete('/{id}', [\App\Http\Controllers\NewsController::class, 'destroy']);
});

Route::group(['prefix' => '/courses'], function () {
    Route::get('/', [\App\Http\Controllers\CourseController::class, 'getAll']);
    Route::get('/order-by-id', [\App\Http\Controllers\CourseController::class, 'getCourseOrderById']);
    Route::get('/{id}', [\App\Http\Controllers\CourseController::class, 'show']);
    Route::post('/', [\App\Http\Controllers\CourseController::class, 'createCourse']);
    Route::put('/{id}', [\App\Http\Controllers\CourseController::class, 'update']);
    Route::delete('/{id}', [\App\Http\Controllers\CourseController::class, 'destroy']);
});
Route::fallback(function () {
    return response()->json([
        'message' => 'Page Not Found. If error persists, contact info@website.com'
    ], 404);
});
