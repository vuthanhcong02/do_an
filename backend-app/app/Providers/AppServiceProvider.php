<?php

namespace App\Providers;

use App\Models\ExamRegister;
use App\Models\Registration;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
        Registration::observe(\App\Observers\RegistrationObserver::class);
        ExamRegister::observe(\App\Observers\ExamRegisterObserver::class);
    }
}