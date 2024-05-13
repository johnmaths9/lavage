<?php
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {

    Route::middleware(['admin'])->group(function () {

        Route::get('/users', [UserController::class, 'index']);
        Route::get('/users/{id}', [UserController::class, 'getUserById']);
        Route::delete('/users/{id}', [UserController::class, 'destroy']);
        Route::post('/users/create', [UserController::class, 'store']);
        Route::post('/users/edit/{user}', [UserController::class, 'update']);


        Route::apiResource('services', ServiceController::class);
        Route::post('/services/edit/{id}', [ServiceController::class, 'update']);

        Route::get('/employees', [ReservationController::class, 'getEmployees']);
        Route::post('reservations/{reservationId}/employees/{employeeId}', [ReservationController::class, 'addEmployeeToReservation']);

    });
    Route::apiResource('reservations',ReservationController::class);
    Route::post('/reservations/edit/{id}', [ReservationController::class, 'update']);
    Route::get('/commandes', [ReservationController::class, 'commandes']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    Route::get('/contacts', [ContactController::class, 'index']);
    Route::delete('/contacts/{id}', [ContactController::class, 'destroy']);



    Route::get('/service/{token}', [ServiceController::class, 'getService']);


    Route::post('/update-profile', [UserController::class, 'updateProfile']);


    Route::get('/dashboard/status', [DashboardController::class, 'index']);

    Route::get('/getReservationsForEmployee', [ReservationController::class, 'getReservationsForEmployee']);

});




Route::get('/getservices', [ServiceController::class, 'index']);
Route::post('/contacts', [ContactController::class, 'store']);
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
