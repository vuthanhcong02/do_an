<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ExamRegister extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $table = 'exam_registrations';
    protected $fillable = [
        'user_id',
        'exam_id',
        'exam_schedule_id',
        'payment_type',
        'status',
        'total_fee',
        'candidate_number',
    ];



    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function exam()
    {
        return $this->belongsTo(Exam::class);
    }

    public function exam_schedule()
    {
        return $this->belongsTo(ExamSchedule::class);
    }
}
