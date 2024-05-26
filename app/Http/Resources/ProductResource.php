<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
      return [
        'id' => $this->id,
        'name' => $this->name,
        'desc' => $this->desc,
        'price' => $this->price,
        'categories' => CategoryResource::collection($this->whenLoaded('categories')),
        'images'=> ImageResource::collection($this->whenLoaded('images')),
        'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),      ];    }
}
