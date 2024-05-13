<?php

namespace App\Http\Controllers;

use App\Models\Car;
use App\Models\Reservation;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
{
    $query = Reservation::with('user', 'service', 'car','employee');

    if (request("status")) {
        $query->where("status", "like", "%" . request("status") . "%");
    }

    $reservations = $query->orderBy('created_at', 'desc')->get();

    return response()->json([
        'success' => true,
        "reservations" => $reservations,
        'queryParams' => request()->query(),
    ]);
}

public function getReservationsForEmployee(Request $request)
{
    $employee = $request->user();
    $employeeId = $employee->id;
    $query = Reservation::with('user', 'service', 'car')->where('employee_id', $employeeId);

    if (request("status")) {
        $query->where("status", "like", "%" . request("status") . "%");
    }

    $reservations = $query->orderBy('created_at', 'desc')->get();

    return response()->json([
        'success' => true,
        "reservations" => $reservations,
        'queryParams' => request()->query(),
    ]);
}

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Get the authenticated user
        $user = $request->user();

        // Check if the user is authenticated
        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // Validate the request data
        $validator = Validator::make($request->all(), [
            'service_id' => 'required|exists:services,id',
            'car.make' => 'required|string',
            'car.model' => 'required|string',
            'car.year' => 'required|integer',
            'car.license_plate' => 'required|string|unique:cars,license_plate',
            'reservation.reservation_date' => 'required|date',
            'location.location' => 'nullable|string',
            'location.latitude' => 'nullable|numeric',
            'location.longitude' => 'nullable|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $car = Car::create([
            'make' => $request->input('car.make'),
            'model' => $request->input('car.model'),
            'year' => $request->input('car.year'),
            'license_plate' => $request->input('car.license_plate'),
        ]);

        // Create a new reservation
        $reservation = Reservation::create([
            'user_id' => $user->id,
            'service_id' => $request->input('service_id'),
            'car_id' => $car->id,
            'reservation_date' => $request->input('reservation.reservation_date'),
            'location' => $request->input('location.location'),
            'latitude' => $request->input('location.latitude'),
            'longitude' => $request->input('location.longitude'),
        ]);

        return response()->json(['success' => true,'message' => 'Réservation créée avec succès', 'reservation' => $reservation], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $reservation = Reservation::with('user', 'car')->findOrFail($id);
        return response()->json($reservation);
    }


    public function getEmployees()
    {
        $employees = User::where('status', 'employe')->get();

        return response()->json($employees);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $data = $validator->validated();

        try {
            $reservation = Reservation::findOrFail($id);



            $reservation->update($data);

            return response()->json(['success' => true,'message' => 'réservation mise à jour avec succès', 'reservation' => $reservation]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Échec de la mise à jour de la réservation'], 500);
        }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $reservation = Reservation::findOrFail($id);
        $reservation->delete();
        return response()->json(['success' => true,'message' => 'Réservation supprimée avec succès']);
    }


    public function commandes(Request $request)
    {
        $user = $request->user();

        // Check if the user is authenticated
        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $upcomingReservations = Reservation::where('user_id', $user->id)
            ->where('reservation_date', '>', now())
            ->orderBy('created_at', 'desc')
            ->with(['service', 'car'])
            ->get();

        $pastReservations = Reservation::where('user_id', $user->id)
            ->where('reservation_date', '<', now())
            ->orderBy('created_at', 'desc')
            ->with(['service', 'car'])
            ->get();

        return response()->json([
            'success' => true,
            'upcomingReservations' => $upcomingReservations,
            'pastReservations' => $pastReservations,
        ]);
    }


    public function addEmployeeToReservation(Request $request, $reservationId, $employeeId)
{
    try {
        // Fetch the reservation by ID
        $reservation = Reservation::findOrFail($reservationId);

        // Check if the reservation already has an employee
        if ($reservation->employee_id) {
            // If an employee is already assigned, you can choose to update or return an error
            return response()->json(['message' => 'Reservation already has an employee assigned.'], 400);
        }

        // Fetch the employee by ID
        $employee = User::findOrFail($employeeId);

        // Assign the employee to the reservation
        $reservation->employee_id = $employee->id;
        $reservation->save();

        // Return a success response
        return response()->json(['success' => true,'message' => 'Employee assigned to reservation successfully.'], 200);
    } catch (\Exception $e) {
        // Handle any exceptions and return an error response
        return response()->json(['message' => 'Failed to assign employee to reservation.'], 500);
    }
}
}
