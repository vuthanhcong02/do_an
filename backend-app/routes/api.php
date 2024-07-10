<?php

use App\Http\Controllers\AuthController;
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
Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {
    Route::post('/social-login', [AuthController::class, 'loginWithSocial']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/admin/login', [AuthController::class, 'adminLogin']);
    Route::post('/admin/logout', [AuthController::class, 'adminLogout']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/user-profile', [AuthController::class, 'user_profile']);
    Route::post('/change-pass', [AuthController::class, 'changePassWord']);
    Route::put('/update-profile', [AuthController::class, 'updateProfile']);
});

Route::group(['prefix' => '/banners'], function () {
    Route::get('/', [\App\Http\Controllers\BannerController::class, 'getAll']);
    Route::get('/order-by-position', [\App\Http\Controllers\BannerController::class, 'getBannersOrderByPosition']);
    Route::get('/{id}', [\App\Http\Controllers\BannerController::class, 'show']);
    Route::post('/', [\App\Http\Controllers\BannerController::class, 'store']);
    Route::put('/{id}', [\App\Http\Controllers\BannerController::class, 'updateBanner']);
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
    Route::put('/{id}', [\App\Http\Controllers\CategoryController::class, 'updateCategory']);
    Route::delete('/{id}', [\App\Http\Controllers\CategoryController::class, 'destroy']);
});

Route::group(['prefix' => '/news'], function () {
    Route::get(
        '/{slug}',
        [\App\Http\Controllers\NewsController::class, 'show']
    );
    Route::get('/{id}', [\App\Http\Controllers\NewsController::class, 'showEdit']);
    Route::get('/featured', [\App\Http\Controllers\NewsController::class, 'getNewsByFeatured']);
    Route::get('/order-by-id', [\App\Http\Controllers\NewsController::class, 'getNewsOrderById']);
    Route::get('/', [\App\Http\Controllers\NewsController::class, 'index']);

    Route::post('/', [\App\Http\Controllers\NewsController::class, 'create']);
    Route::put('/{id}', [\App\Http\Controllers\NewsController::class, 'update']);
    Route::delete('/{id}', [\App\Http\Controllers\NewsController::class, 'destroy']);
});

Route::group(['prefix' => '/events'], function () {
    Route::get('/featured', [\App\Http\Controllers\EventController::class, 'getEventsByFeatured']);
    Route::get('/', [\App\Http\Controllers\EventController::class, 'index']);
    Route::get('/{slug}', [\App\Http\Controllers\EventController::class, 'show']);

    Route::post('/', [\App\Http\Controllers\EventController::class, 'store']);
    Route::put('/{id}', [\App\Http\Controllers\EventController::class, 'updateEvent']);
    Route::delete('/{id}', [\App\Http\Controllers\EventController::class, 'destroy']);
});

Route::group(['prefix' => '/courses'], function () {
    Route::get('/featured', [\App\Http\Controllers\CourseController::class, 'getCourseByFeatured']);
    Route::get('/get-course-by-english-category', [\App\Http\Controllers\CourseController::class, 'getCourseByEnglishCategory']);
    Route::get('/get-course-by-information-category', [\App\Http\Controllers\CourseController::class, 'getCourseByInformationCategory']);
    Route::get('/', [\App\Http\Controllers\CourseController::class, 'index']);
    Route::get('/order-by-id', [\App\Http\Controllers\CourseController::class, 'getCourseOrderById']);
    Route::get('/{slug}', [\App\Http\Controllers\CourseController::class, 'show'])->name('courses.show');
    Route::post('/', [\App\Http\Controllers\CourseController::class, 'createCourse']);
    Route::put('/{id}', [\App\Http\Controllers\CourseController::class, 'update']);
    Route::delete('/{id}', [\App\Http\Controllers\CourseController::class, 'destroy']);
});

Route::group(['prefix' => '/classrooms'], function () {
    Route::get('/', [\App\Http\Controllers\ClassRoomController::class, 'getAll']);
    Route::get('/{id}', [\App\Http\Controllers\ClassRoomController::class, 'showClassRoom']);
    Route::post('/', [\App\Http\Controllers\ClassRoomController::class, 'createClassRoom']);
    Route::put('/{id}', [\App\Http\Controllers\ClassRoomController::class, 'updateClassRoom']);
    Route::delete('/{id}', [\App\Http\Controllers\ClassRoomController::class, 'deleteClassRoom']);
});

Route::group(['prefix' => '/classes'], function () {
    Route::get('/', [\App\Http\Controllers\ClassesController::class, 'getAll']);
    Route::get('/{id}', [\App\Http\Controllers\ClassesController::class, 'showClass']);
    Route::post('/', [\App\Http\Controllers\ClassesController::class, 'createClass']);
    Route::put('/{id}', [\App\Http\Controllers\ClassesController::class, 'updateClass']);
    Route::delete('/{id}', [\App\Http\Controllers\ClassesController::class, 'destroyClass']);
    Route::get('/course/{id}', [\App\Http\Controllers\ClassesController::class, 'getClassesByCourse']);
});

Route::group(['prefix' => '/schedules'], function () {
    Route::get('/{id}/students', [\App\Http\Controllers\ScheduleController::class, 'getAllStudentsByScheduleId']);
    Route::get('/course/{id}', [\App\Http\Controllers\ScheduleController::class, 'getScheduleByCourseId']);
    Route::get('/', [\App\Http\Controllers\ScheduleController::class, 'getAll']);
    Route::get('/{id}', [\App\Http\Controllers\ScheduleController::class, 'getScheduleById']);
    Route::post('/', [\App\Http\Controllers\ScheduleController::class, 'makeSchedule']);
    Route::put('/{id}', [\App\Http\Controllers\ScheduleController::class, 'updateSchedule']);
    Route::delete('/{id}', [\App\Http\Controllers\ScheduleController::class, 'deleteSchedule']);
});

Route::group(['prefix' => '/contacts'], function () {
    Route::get('/', [\App\Http\Controllers\ContactController::class, 'getAll']);
    Route::post('/', [\App\Http\Controllers\ContactController::class, 'createContact']);
    Route::get('/{id}', [\App\Http\Controllers\ContactController::class, 'showContact']);
    Route::put('/{id}', [\App\Http\Controllers\ContactController::class, 'updateContact']);
    Route::delete('/{id}', [\App\Http\Controllers\ContactController::class, 'deleteContact']);
});
Route::group(['prefix' => '/users'], function () {
    Route::get('/', [\App\Http\Controllers\UserController::class, 'getAll']);
    Route::get('/{id}', [\App\Http\Controllers\UserController::class, 'show']);
    Route::put('/{id}', [\App\Http\Controllers\UserController::class, 'updateUser']);
    Route::delete('/{id}', [\App\Http\Controllers\UserController::class, 'destroy']);
});

Route::group(['prefix' => '/registrations'], function () {
    Route::get('/get-registrations-by-user', [\App\Http\Controllers\RegistrationController::class, 'getRegistrationByUser']);
    Route::get('/', [\App\Http\Controllers\RegistrationController::class, 'getAll']);
    Route::get('/{id}', [\App\Http\Controllers\RegistrationController::class, 'showRegistration']);
    Route::post('/', [\App\Http\Controllers\RegistrationController::class, 'createRegistration']);
    Route::put('/{id}', [\App\Http\Controllers\RegistrationController::class, 'updateRegistration']);
    Route::delete('/{id}', [\App\Http\Controllers\RegistrationController::class, 'deleteRegistration']);
    Route::get('/vnpay/return', [\App\Http\Controllers\RegistrationController::class, 'handleVNPayReturn'])->name('vnpay.return');
});

Route::group(['prefix' => '/exams'], function () {
    Route::get('/active', [\App\Http\Controllers\ExamController::class, 'getExamActive']);
    Route::get('/', [\App\Http\Controllers\ExamController::class, 'getAll']);
    Route::get('/{id}', [\App\Http\Controllers\ExamController::class, 'show']);
    Route::post('/', [\App\Http\Controllers\ExamController::class, 'store']);
    Route::put('/{id}', [\App\Http\Controllers\ExamController::class, 'update']);
    Route::delete('/{id}', [\App\Http\Controllers\ExamController::class, 'destroy']);
});


Route::group(['prefix' => '/exam-registers'], function () {
    Route::get('/get-registrations-by-user', [\App\Http\Controllers\ExamRegisterController::class, 'getRegistrationByUserId']);
    Route::get('/', [\App\Http\Controllers\ExamRegisterController::class, 'getAllRegistrations']);
    Route::get('/{id}', [\App\Http\Controllers\ExamRegisterController::class, 'show']);
    Route::post('/', [\App\Http\Controllers\ExamRegisterController::class, 'createExamRegister']);
    Route::put('/{id}', [\App\Http\Controllers\ExamRegisterController::class, 'updateRegistration']);
    Route::delete('/{id}', [\App\Http\Controllers\ExamRegisterController::class, 'destroy']);
});

Route::group(['prefix' => '/notifications'], function () {
    Route::get('/', [\App\Http\Controllers\NotificationController::class, 'index']);
    Route::post('/', [\App\Http\Controllers\NotificationController::class, 'create']);
    Route::get('/{slug}', [\App\Http\Controllers\NotificationController::class, 'show']);
    Route::put('/{id}', [\App\Http\Controllers\NotificationController::class, 'update']);
    Route::delete('/{id}', [\App\Http\Controllers\NotificationController::class, 'destroy']);
});

Route::group(['prefix' => '/notification-types'], function () {
    Route::get('/', [\App\Http\Controllers\NotificationTypeController::class, 'index']);
    Route::post('/', [\App\Http\Controllers\NotificationTypeController::class, 'create']);
    Route::get('/{id}', [\App\Http\Controllers\NotificationTypeController::class, 'show']);
    Route::put('/{id}', [\App\Http\Controllers\NotificationTypeController::class, 'update']);
    Route::delete('/{id}', [\App\Http\Controllers\NotificationTypeController::class, 'destroy']);
});

Route::group(['prefix' => '/dashboard'], function () {
    Route::get('/get-count-courses', [\App\Http\Controllers\DashboardController::class, 'getCountCourses']);
    Route::get('/get-count-news', [\App\Http\Controllers\DashboardController::class, 'getCountNews']);
    Route::get('/get-count-events', [\App\Http\Controllers\DashboardController::class, 'getCountEvents']);
    Route::get('/get-count-contacts', [\App\Http\Controllers\DashboardController::class, 'getCountContacts']);
    Route::get('/get-count-exams', [\App\Http\Controllers\DashboardController::class, 'getCountExams']);
    Route::get('/get-count-registrations-with-status-success', [\App\Http\Controllers\DashboardController::class, 'getCountRegistrationsWithStatusSuccess']);
    Route::get('/get-count-registrations-with-status-pending', [\App\Http\Controllers\DashboardController::class, 'getCountRegistrationsWithStatusPending']);
    Route::get('/get-total-price-registrations-with-status-success', [\App\Http\Controllers\DashboardController::class, 'getTotalRegistrationsWithStatusSuccess']);
    Route::get('/get-count-exam-registrations-with-status-success', [\App\Http\Controllers\DashboardController::class, 'getCountExamRegistrationsWithStatusSuccess']);
    Route::get('/get-count-exam-registrations-with-status-pending', [\App\Http\Controllers\DashboardController::class, 'getCountExamRegistrationsWithStatusPending']);
    Route::get('/get-total-price-exam-registrations-with-status-success', [\App\Http\Controllers\DashboardController::class, 'getTotalExamRegistrationsWithStatusSuccess']);
});

Route::group(['prefix' => '/search'], function () {
    Route::get('/', [\App\Http\Controllers\SearchController::class, 'search']);
});

Route::fallback(function () {
    return response()->json([
        'message' => 'Page Not Found. If error persists, contact info@website.com'
    ], 404);
});