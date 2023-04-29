<?php

use App\Http\Controllers\AuthController;
use \Illuminate\Support\Facades\Route;


Route::middleware('auth:sanctum')->group(function (){
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
