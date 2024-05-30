<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreProductRequest extends FormRequest
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
            "name" => "max:255",
            "desc" => "max:600",
            'images' => 'required',
            'image.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:12048',
            "price" => "required|numeric",
            "categories" => ['required','array', Rule::exists('categories','id')]
        ];
    }
}
