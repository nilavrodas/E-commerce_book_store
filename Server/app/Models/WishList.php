<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WishList extends Model
{
    use HasFactory;
    protected $table = 'wishlists';
    protected $primaryKey = ['email', 'isbn'];
    public $incrementing = false;
    protected $fillable = [
        'email',
        'isbn',
    ];
    protected $with = ['book'];
    // public function users()
    // {

    //     return $this->belongsToMany(User::class, 'email', 'email');
    // }
    public function book()
    {

        return $this->belongsTo(Book::class, 'isbn', 'isbn');
    }
}
