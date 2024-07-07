<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ExamRegister extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'exam_id',
        'payment_type',
        'status',
        'total_fee',
        'registration_number'
    ];

    public static function createRegistrationNumber($exam_id)
    {
        $exam = Exam::find($exam_id);
        if (!$exam || !$exam->exam_code) {
            throw new \Exception('Invalid exam ID or exam code not set');
        }

        $count = self::where('exam_id', $exam_id)->count();

        $registrationNumber = $exam->exam_code . str_pad($count + 1, 4, '0', STR_PAD_LEFT);

        return $registrationNumber;
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function exam()
    {
        return $this->belongsTo(Exam::class);
    }
}