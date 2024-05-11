<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::prefix('/admin')->group(function () {
    Route::get('/', [App\Http\Controllers\DashboardController::class, 'index']);
    Route::group(['prefix' => 'news',], function () {
        Route::get('/', [App\Http\Controllers\NewsController::class, 'index']);
        Route::get('/create', [App\Http\Controllers\NewsController::class, 'create']);
        Route::get('/edit', [App\Http\Controllers\NewsController::class, 'edit']);
    });

    Route::group(['prefix' => 'courses',], function () {
        Route::get('/', [App\Http\Controllers\CourseController::class, 'index']);
        Route::get('/create', [App\Http\Controllers\CourseController::class, 'create']);
        Route::get('/show', [App\Http\Controllers\CourseController::class, 'show']);
        Route::get('/edit', [App\Http\Controllers\CourseController::class, 'edit']);
    });

    Route::group(['prefix' => 'users',], function () {
        Route::get('/', [App\Http\Controllers\UserController::class, 'index']);
        Route::get('/create', [App\Http\Controllers\UserController::class, 'create']);
        Route::get('/show', [App\Http\Controllers\UserController::class, 'show']);
        Route::get('/edit', [App\Http\Controllers\UserController::class, 'edit']);
    });

    Route::group(['prefix' => 'registrations',], function () {
        Route::get('/', [App\Http\Controllers\RegisterCourseController::class, 'index']);
        Route::get('/create', [App\Http\Controllers\RegisterCourseController::class, 'create']);
        Route::get('/show', [App\Http\Controllers\RegisterCourseController::class, 'show']);
        Route::get('/edit', [App\Http\Controllers\RegisterCourseController::class, 'edit']);
    });

    Route::group(['prefix' => 'classes',], function () {
        Route::get('/', [App\Http\Controllers\ClassController::class, 'index']);
        Route::get('/create', [App\Http\Controllers\ClassController::class, 'create']);
        Route::get('/edit', [App\Http\Controllers\ClassController::class, 'edit']);
    });

    Route::group(['prefix' => 'notifications/exam-schedules',], function () {
        Route::get('/', [App\Http\Controllers\ExamScheduleController::class, 'index']);
        Route::get('/create', [App\Http\Controllers\ExamScheduleController::class, 'create']);
        Route::get('/edit', [App\Http\Controllers\ExamScheduleController::class, 'edit']);
    });

    Route::group(['prefix' => 'notifications/exam-results',], function () {
        Route::get('/', [App\Http\Controllers\ExamResultController::class, 'index']);
        Route::get('/create', [App\Http\Controllers\ExamResultController::class, 'create']);
        Route::get('/edit', [App\Http\Controllers\ExamResultController::class, 'edit']);
    });
});
Route::fallback(function () {
    return response()->json([
        'message' => 'Page Not Found. If error persists, contact info@website.com'
    ], 404);
});