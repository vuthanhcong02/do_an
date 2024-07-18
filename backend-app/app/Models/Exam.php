<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Exam extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'name',
        'date',
        'deadline_date',
        'fee',
    ];

    public function schedules()
    {
        return $this->hasMany(ExamSchedule::class);
    }

    public function registrations()
    {
        return $this->hasMany(ExamRegister::class);
    }
}
