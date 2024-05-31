<?php

namespace App\Http\Resources;

use App\Models\Image;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public static $wrap = false;
    public function toArray(Request $request): array
    {
      return [
        'id' => $this->id,
        'name' => $this->name,
        'desc' => $this->desc,
        'price' => $this->price,
        'categories' => CategoryResource::collection($this->whenLoaded('categories')),
//        'images_url'=> ImageResource::collection($this->whenLoaded('images')),
        'images_url'=> ( $this->whenLoaded('images')->map(function ($image) {

            if (Str::startsWith($image->path, 'images/')) {
                    return asset(Storage::url($image->path));
                } else {
                    return $image->path; // Return the original path if it does not start with "images/"
                }
        }) ),
        'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),      ];    }
}
