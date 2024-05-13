<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{

    public function index()
    {
        $contacts = Contact::latest()->get();

        return response()->json($contacts);
    }

    public function store(Request $request)
    {


        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'subject' => 'required',
            'message' => 'required',
        ]);


        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $validator->validated();

        // Créer un nouveau message de contact
        $contact = Contact::create($data);

        // Retourner une réponse JSON
        return response()->json([
            'success' => true,
            'message' => 'Votre message a été envoyé avec succès.',
            'data' => $contact
        ]);
    }


    public function destroy($id)
    {
        $contact = Contact::findOrFail($id);
        $contact->delete();
        return response()->json(['success' => true,'message' => 'Contact supprimé avec succès']);
    }
}
