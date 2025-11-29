<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\MenuItemController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Middleware\AdminMiddleware;



/************* Public **********/

//Auth
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

//menu-items
Route::get('/menu-items', [MenuItemController::class, 'index']);




/*************** Protected ****************/
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    // profile route for user
    Route::get('/profile', [AuthController::class, 'profile']);
    Route::put('/profile/update', [AuthController::class, 'updateProfile']);

    // bookings routes for user
    Route::post('/bookings', [BookingController::class, 'store']);
    Route::get('/my-bookings', [BookingController::class, 'myBookings']);



    // Cart
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart', [CartController::class, 'add']);
    Route::put('/cart/{id}', [CartController::class, 'updateQuantity']);
    Route::delete('/cart/{id}', [CartController::class, 'delete']);


    // checkout
    Route::post('/checkout', [OrderController::class, 'checkout']);

    // my orders
    Route::get('/my-orders', [OrderController::class, 'myOrders']);


});




/******************* Admin (protected) *****************/

Route::middleware(['auth:sanctum',AdminMiddleware::class])->group(function () {
    // menu-items
    Route::get('/menu-items', [MenuItemController::class, 'index']);
    Route::post('/menu-items', [MenuItemController::class, 'store']);
    Route::put('/menu-items/{id}', [MenuItemController::class, 'update']);
    Route::delete('/menu-items/{id}', [MenuItemController::class, 'destroy']);

    // bookings routes
    Route::get('/bookings', [BookingController::class, 'index']);
    Route::put('/bookings/{id}/status', [BookingController::class, 'updateStatus']);




    // Admin — get all orders
    Route::get('/orders', [OrderController::class, 'allOrders']);

    // Admin — update order status
    Route::put('/orders/{id}/status', [OrderController::class, 'updateStatus']);
});



