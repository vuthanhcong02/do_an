<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Course extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'name',
        'description',
        'duration',
        'start_date',
        'end_date',
        'min_student',
        'max_student',
        'image',
        'slug',
        'status',
        'category_id',
        'teacher_id',
        'price',
        'discount',
        'discount_type',
        'featured',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}