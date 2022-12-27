<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function reg(Request $request)
    {
        $validator =  Validator::make($request->all(), [
            'First_name' => 'required',
            'Last_name' => 'required',
            'email' => 'required|email|max:191|unique:users,email',
            'password' => 'required|min:10'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
        } else {
            $user = User::create([
                'First_name' => $request->First_name,
                'Last_name' => $request->Last_name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);
        }
        $token = $user->createToken($user->email . '_Token')->plainTextToken;

        return response()->json([
            'status' => 200,
            'First_name' => $user->First_name,
            'Last_name' => $user->Last_name,
            'token' => $token,
            'email' => $user->email,
            'message' => 'Registered Successfully',

        ]);
    }
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|max:191',
            'password' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'Validation_errors' => $validator->messages(),
            ]);
        } else {
            $user = User::where('email', $request->email)->first();

            if (!$user || !Hash::check($request->password, $user->password)) {
                return response()->json([
                    'status' => 401,
                    'message' => 'Invalid Credentials',
                ]);
            } else {
                $token = $user->createToken($user->email . '_Token')->plainTextToken;
                return response()->json([
                    'status' => 200,
                    'First_name' => $user->First_name,
                    'Last_name' => $user->Last_name,
                    'token' => $token,
                    'email' => $user->email,
                    'message' => 'Logged In Successfully',
                ]);
            }
        }
    }
    public function logout(Request $request)
    {
        auth()->user()->tokens()->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Logged out Successfully'
        ]);
    }
}
