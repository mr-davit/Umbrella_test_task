<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategoryProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $products = Product::all();
        $categories = Category::all();

        foreach ($products as $product) {
            $product->categories()->attach(
                $categories->random(rand(1, 4))->pluck('id')->toArray()
            );
        }

    }
}
