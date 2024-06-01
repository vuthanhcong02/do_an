<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Teacher extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'full_name',
        'gender',
        'email',
        'phone',
        'email',
        'address',
        'experience',
        'degree',
        'image',
        'description',
        'category_id'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}