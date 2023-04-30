<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /*
     * Handle Sign up Requests
     */
    public function signup(SignupRequest $request)
    {
        // validate and store the request data
        $data = $request->validated();

        /** @var User $user */
        // create new user
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        // create user's token
        $token = $user->createToken('master')->plainTextToken;

        // return response
        return response([
            'user' => $user,
            'token' => $token
        ]);
    }

    /*
     * Handle Login Requests
     */
    public function login(LoginRequest $request)
    {
        // get request credentials
        $credentials = $request->validated();

        // set the remember me state
        $remember = $credentials['remember'] ?? false;

        // remove it from the request
        unset($credentials['remember']);

        // if authentication failed
        if (!Auth::attempt($credentials, $remember)) {
            // return error response
            return response([
                'errors' => ['error' => 'The provided email/password is wrong']
            ], 422);
        }

        // get the user info
        $user = Auth::user();

        // create new user's token to prevent Session fixation
        $token = $user->createToken('master')->plainTextToken;

        // return response
        return response([
            'user' => $user,
            'token' => $token
        ]);

    }

    /*
     * Handle Log out Requests
     */
    public function logout(Request $request)
    {
        // get the authenticated user
        /** @var User $user */
        $user = Auth::user();

        // Revoke the token that was used to authenticate the current request
        $user->currentAccessToken()->delete();

        return response([
            'success' => true
        ]);

    }

    /*
     * Get user information
     */

    public function user(Request $request): UserResource
    {
        return new UserResource($request->user());
    }
}
