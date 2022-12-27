<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $table = 'orders';
    protected $primaryKey = ['email', 'Order_No'];
    public $incrementing = false;
    protected $attributes = ['Confirm' => 'false'];
    protected $fillable = [
        'email',
        'Order_No',
        'Confirm',
    ];
    protected $with = ['user'];
    public function users()
    {
        return $this->belongsTo(User::class, 'email', 'email');
    }
}
