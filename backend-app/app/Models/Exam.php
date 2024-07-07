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
        'start_at',
        'end_at',
        'date',
        'deadline_date',
        'status',
        'fee',
        'class_room_id'
    ];

    public function classroom()
    {
        return $this->belongsTo(ClassRoom::class, 'class_room_id');
    }
}