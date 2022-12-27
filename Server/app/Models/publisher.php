<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class publisher extends Model
{
    use HasFactory;
    protected $primaryKey = 'publisher_id';
    public $incrementing = false;
    protected $fillable = [
        'publisher_id',
        'publisher_name',
    ];
}
