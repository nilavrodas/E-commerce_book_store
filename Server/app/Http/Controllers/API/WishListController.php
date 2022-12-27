<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\WishList;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class WishListController extends Controller
{
    public function AddtoWishList(Request $request){
        if(auth('sanctum')->check()){
            $email = auth('sanctum')->user()->email;
            $isbn = $request->isbn;
            if(WishList::where('isbn',  $isbn)->where('email', $email)->exists()){
                return response()->json([
                    'status' => 409,
                    'message' => 'Book has already been added to WishList',
                ]);
            }else{
                $list = WishList::create([
                    'email'  => $email,
                    'isbn' => $isbn
                ]);
                return response()->json([
                    'status' => 201,
                    'message' => 'Added to WishList',
                ]);
            }
        }
    }
    public function ViewWishList(){
        if(auth('sanctum')->check()){
            $email = auth('sanctum')->user()->email;
            $WishList = DB::select('SELECT * FROM wishlists WHERE email = ?', [$email]);
            return response()->json([
                'status' => 200,
                'wishlist' => $WishList,
            ]);
        }else{
            return response()->json([
                'status' => 401,
                'message' => 'Have to Login first',
            ]);
        }
    }

}
