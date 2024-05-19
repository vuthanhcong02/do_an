<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('description');
            $table->string('short_description');
            $table->string('duration');
            $table->date('start_date');
            $table->date('end_date');
            $table->integer('min_student');
            $table->integer('max_student');
            $table->string('image');
            $table->string('slug');
            $table->string('status');
            $table->string('category_id')->nullable();
            $table->string('teacher_id')->nullable();
            $table->string('price')->nullable();
            $table->string('discount')->nullable();
            $table->string('discount_type')->nullable();
            $table->boolean('featured')->default(0);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};