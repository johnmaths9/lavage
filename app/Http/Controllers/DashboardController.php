<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        try {
            $user = Auth::user(); // Retrieve the authenticated user

            $statuses = [
                'En attente',
                'En cours',
                'Terminée',
            ];

            $reservations = [];
            $total = 0; // Initialize the total variable

            foreach ($statuses as $status) {
                $query = Reservation::query()->where('status', $status);

                if (!$user->is_admin) {
                    $query->where('employee_id', $user->id);
                }

                $reservationCount = $query->count();
                $reservations[$status] = $reservationCount;
                $total += $reservationCount; // Increment the total variable
            }

            return response()->json([
                'success' => true,
                'reservations' => $reservations,
                'total' => $total
            ]);
        } catch (\Exception $e) {
            // Handle any exceptions and return an error response
            return response()->json(['message' => 'Failed to fetch reservations.'], 500);
        }
    }}
