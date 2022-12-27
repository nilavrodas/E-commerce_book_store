<?php

namespace App\Http\Controllers\API;

use App\Models\Book;
use App\Models\Order;
use App\Models\OrderList;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function Add(Request $request)
    {
        if (auth('sanctum')->check()) {
            $email = auth('sanctum')->user()->email;
            $isbn = $request->isbn;
            $confirmOrder = Order::where('email', $email)->latest();
            $confirm = $confirmOrder->Confirm;
            if($confirmOrder){
                if ($confirm) {
                    $order = Order::create([
                        'email' => $email,
                    ]);
                    $order->save();
                    $orderlist  = OrderList::create([
                        'email' => $email,
                        'isbn' => $isbn,
                        'Order_No' => $order->Order_No,
                        'price' => Book::Select('selling_srice')->where('isbn', $isbn),
    
                    ]);
                    $orderlist->save();
                } else {
                    $Order = Order::where('email', $email)->latest();
                    $orderlist  = OrderList::create([
                        'email' => $email,
                        'isbn' => $isbn,
                        'Order_No' => $Order->Order_No,
                        'price' => Book::Select('selling_srice')->where('isbn', $isbn)->value('selling_srice'),
                    ]);
                    $orderlist->save();
                }
            }
            else{
                $order = Order::create([
                    'email' => $email,
                ]);
                $order->save();
                $orderlist  = OrderList::create([
                    'email' => $email,
                    'isbn' => $isbn,
                    'Order_No' => $order->Order_No,
                    'price' => Book::Select('selling_srice')->where('isbn', $isbn),

                ]);
                $orderlist->save();
            }
            
            return response()->json([
                'status' => 201,
                'message' => 'Order added successfully'
            ]);
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Have to Login before ordering'
            ]);
        }
    }
    public function Confirm()
    {
        if (Auth::check()) {
            $email = Auth::user()->email;
            $order = Order::where('email', $email)->latest();
            $order->update(['Confirm' => true,]);
        }
    }
}
