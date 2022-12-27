<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderList extends Model
{
    use HasFactory;
    protected $table = 'orderlists';
    protected $primaryKey = ['email', 'isbn', 'Order_No'];
    public $incrementing = false;
    protected $fillable = [
        'email',
        'isbn',
        'Order_No',
    ];
    protected $with = ['orders', 'book'];
    public function orders()
    {

        return $this->belongsTo(Order::class, 'email', 'email');
    }
    public function order()
    {

        return $this->belongsTo(Order::class, 'Order_No', 'Order_No');
    }
    public function books()
    {

        return $this->belongsTo(Book::class, 'isbn', 'isbn');
    }
}
