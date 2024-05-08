<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Person extends Model
{
  use HasFactory;

  protected $table = "person";

  protected $fillable = [
    'name',
    'address',
    'phone'
  ];

  public function cars(): HasMany
  {
    return $this->hasMany(Car::class);
  }
}
