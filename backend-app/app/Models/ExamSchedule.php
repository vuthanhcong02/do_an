<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExamSchedule extends Model
{
    use HasFactory;

    protected $fillable = [
        'exam_id',
        'shift',
        'start_time',
        'end_time',
        'class_room_id',
        'max_student_per_shift',
    ];

    public function exam()
    {
        return $this->belongsTo(Exam::class);
    }

    public function classroom()
    {
        return $this->belongsTo(ClassRoom::class, 'class_room_id');
    }


    public function registrations()
    {
        return $this->hasMany(ExamRegister::class);
    }
}
