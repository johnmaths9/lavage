<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $services = Service::all();
        return response()->json($services);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'features' => 'nullable|array',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        /*if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }*/

        $data = $validator->validated(); // Get validated data

        $imagePath = $request->file('image')->store('public/images');

        $data['image'] = Storage::url($imagePath);

        // Check if image is provided
        $token = Str::random(16);
        $data['token'] = $token;
        $service = Service::create($data);

        return response()->json(['success' => true,'message' => 'Service créé avec succès', 'service' => $service]);
    }

    public function show($id)
    {
        $service = Service::findOrFail($id);
        return response()->json($service);
    }

    public function getService($token)
    {
        $service = Service::where('token', $token)->first();
        return response()->json($service);
    }

    public function update(Request $request, $id)
    {


        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'features' => 'nullable|array',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $data = $validator->validated();

        try {
            $service = Service::findOrFail($id);

            if ($request->hasFile('image')) {
                $imagePath = $request->file('image')->store('public/images');
                $data['image'] = Storage::url($imagePath);
            }

            $service->update($data);

            return response()->json(['success' => true,'message' => 'Service mis à jour avec succès', 'service' => $service]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Échec de la mise à jour du service'], 500);
        }
    }

    public function destroy($id)
    {
        $service = Service::findOrFail($id);
        $service->delete();
        return response()->json(['success' => true,'message' => 'Service supprimé avec succès']);
    }



}
