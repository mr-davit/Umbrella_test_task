<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProductRequest extends FormRequest
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
            'images' => '',
            'image_files.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:12048',
            'image.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:12048',
            "price" => "required|numeric",
            "categories" => ['required','array', Rule::exists('categories','id')]        ];
    }
}
