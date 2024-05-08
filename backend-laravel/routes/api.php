<?php

use App\Http\Controllers\API\CarController;
use App\Http\Controllers\API\PersonController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::prefix('v1/persons')->group(function () {
    Route::get('/', [PersonController::class, 'get']);
    Route::post('/', [PersonController::class, 'create']);
    Route::delete('/{id}', [PersonController::class, 'delete']);
    Route::get('/{id}', [PersonController::class, 'getById']);
    Route::put('/{id}', [PersonController::class, 'update']);
});

// Route::prefix('v1/cars')->group([
//     'middleware' => 'api',
// ], function () {
//     Route::get('/', [CarController::class, 'get']);
//     Route::post('/', [CarController::class, 'create']);
//     Route::delete('/{id}', [CarController::class, 'delete']);
//     Route::get('/{id}', [CarController::class, 'getById']);
//     Route::put('/{id}', [CarController::class, 'update']);
// });

Route::group([
    'middleware' => 'api',
    'prefix' => 'v1/cars'
], function ($router) {
    Route::get('/', [CarController::class, 'get']);
    Route::post('/', [CarController::class, 'create']);
    Route::delete('/{id}', [CarController::class, 'delete']);
    Route::get('/{id}', [CarController::class, 'getById']);
    Route::put('/{id}', [CarController::class, 'update']);
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/user-profile', [AuthController::class, 'userProfile']);
    Route::post('/change-pass', [AuthController::class, 'changePassWord']);
});
