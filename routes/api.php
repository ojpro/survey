<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::apiResource('survey', \App\Http\Controllers\SurveyController::class);

    // dashboard
    Route::get('/dashboard', [\App\Http\Controllers\DashboardController::class, 'index']);
});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);

// get survey public information
Route::get('/view/survey/{survey:slug}', [\App\Http\Controllers\SurveyController::class, 'getSurvey']);

// receive surveys' answer
Route::post('/survey/answer/{answer}/', [\App\Http\Controllers\SurveyAnswerController::class, 'storeAnswer']);
