<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Classes extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'name',
        'course_id',
        'teacher_id',
        'status'
    ];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }


    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }
}
