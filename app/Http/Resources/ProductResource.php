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
        'images' =>  ImageResource::collection($this->whenLoaded('images')),
        'categories' => CategoryResource::collection($this->whenLoaded('categories')),
        'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),      ];    }
}
