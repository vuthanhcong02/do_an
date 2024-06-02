<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Schedule extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = ['class_id', 'classroom_id', 'teacher_id', 'day_of_week', 'start_end_time'];

    public function classroom()
    {
        return $this->belongsTo(ClassRoom::class);
    }

    public function class()
    {
        return $this->belongsTo(Classes::class);
    }

    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }
}