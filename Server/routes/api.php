<?php

use Illuminate\Http\Request;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\BookController;
use App\Http\Controllers\API\OrderController;
use App\Http\Controllers\API\WishListController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('register', [AuthController::class, 'reg']);
Route::Post('login', [AuthController::class, 'login']);
Route::middleware(['auth:sanctum'])->group(function () {
    Route::Post('logout',  [AuthController::class, 'logout']);
});
Route::Post('Add_Book', [BookController::class, 'Add']);

Route::get('Show_Book', [BookController::class, 'Show']);

Route::get('Show_Single_Book/{isbn}', [BookController::class, 'ShowSingle']);

Route::get('Edit_Book/{isbn}', [BookController::class, 'Edit']);

Route::post('Update_Book/{isbn}', [BookController::class, 'Update']);
Route::delete('Delete_Book/{isbn}', [BookController::class, 'Delete']);
Route::Post('Add_Order', [OrderController::class, 'Add']);
Route::Post('Confirm', [OrderController::class, 'Confirm']);
Route::Post('Add_to_WishList', [WishListController::class, 'AddtoWishList']);
Route::get('View_WishList', [WishListController::class, 'ViewWishList']);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
