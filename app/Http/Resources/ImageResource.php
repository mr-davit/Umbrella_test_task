<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ImageResource extends JsonResource
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
        'product_id' => $this->product_id,
        'path' =>   Str::startsWith($this->path, 'images/') ? asset(Storage::url($this->path)) : $this->path,
          // change image path to asset url,Return the original path if it does not start with "images/ ,
          // scenario for both url and uploaded pictures"
      ];
    }


}
