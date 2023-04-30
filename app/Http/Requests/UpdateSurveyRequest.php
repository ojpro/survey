<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSurveyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $survey = $this->route('survey');
        // check if is the owner of this survey
        return $this->user()->id === $survey->user_id;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:500'],
            'image' => ['nullable', 'string'],
            'user_id' => ['exists:users,id'],
            'status' => ['required', 'boolean'],
            'description' => ['nullable', 'string'],
            'expire_date' => ['nullable', 'date', 'after:today'],
            'questions' => ['array']
        ];
    }
}
