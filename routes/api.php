<?php

use App\Http\Controllers\AuthController;
use Illuminate\Routing\Route;

Route::get('/signup', [AuthController::class, 'signup']);
Route::get('/login', [AuthController::class, 'login']);
