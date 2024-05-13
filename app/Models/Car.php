<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    use HasFactory;
    protected $fillable = [
        'make',
        'model',
        'year',
        'license_plate',
    ];

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }
}
