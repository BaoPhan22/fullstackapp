<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Car extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'color',
        'year',
        'user_id',
    ];

    public function person(): BelongsTo
    {
        return $this->belongsTo(Person::class, 'user_id', 'id');
    }
}
