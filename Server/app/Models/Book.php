<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;
    protected $table = 'book';
    protected $primaryKey = 'isbn';
    public $incrementing = false;
    protected $fillable = [
        'book_name',
        'author_name',
        'coppies',
        'description',
        'selling_priice',
        'image'
    ];
    // public function publishers()
    // {
    //     return $this->belongsTo(publisher::class, 'publisher_id', 'publisher_id');
    // }
}
