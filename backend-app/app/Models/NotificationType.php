<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class NotificationType extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = ['name'];

    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }
}