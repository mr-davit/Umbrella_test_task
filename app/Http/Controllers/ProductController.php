<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\ProductResource;
use App\Models\Category;
use App\Models\Product;
use http\Env\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Product::query();

        $sortField = request("sort_field", 'id');
        $sortDirection = request("sort_direction", "desc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }

        if (request("category")) {

            $query->whereHas("categories", function($q) use($request){
                $q->where('id', '=', $request);})->get();
            };

        $products = $query->orderBy($sortField, $sortDirection)->with('categories')->with('images')
            ->paginate(10)
            ->onEachSide(1);
        $categories = Category::all();

        return inertia('Product/Index', [
            "products" => ProductResource::collection($products),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
            'categories' => CategoryResource::collection($categories)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::all();

        return inertia('Product/Create', [
            'categories' => CategoryResource::collection($categories)
        ]);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
       $data = $request->validated();
//       dd($data);
       $product = Product::create($data);
        $product->categories()->sync($request->categories);
            foreach ($data['images'] as $file) {
//                $path = $file->store('images');
                $product->images()->create(['path' => $file]);
            }
//        'thumbnail' => $request->file('thumbnail')->store('thumbnails'),

    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }
}
