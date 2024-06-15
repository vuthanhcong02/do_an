<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

class CreateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            //
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|max:255|min:3|unique:users',
            'gender' => 'required|string',
            'password' => 'required|string|min:6',
            'phone' => 'required|string|max:15',
            'address' => 'required|string|max:255',
            'object_type' => 'required|string',
            'date_of_birthday' => 'required|date',
            'id_card' => 'required|string|max:20',
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'success' => false,
            'statusCode' => 422,
            'data' => null,
            'errors' => $validator->errors(),
            'meta' => null,
        ], 422));
    }
}