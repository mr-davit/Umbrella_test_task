<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\ProductResource;
use App\Models\Category;
use App\Models\Product;
use http\Env\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

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

      $query->whereHas("categories", function ($q) use ($query) {
        $q->where('id', '=', $query);
      })->get();
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
//       dd($request->categories);
    $product->categories()->sync($request->categories);
    foreach ($data['images'] as $file) {
      $path = $file->store('images', 'public');
      $product->images()->create(['path' => $path]);
    }
    $product->categories()->sync($request->categories);
    return redirect(route('product.index'))->with('success', 'Product was added successfully');

  }

  /**
   * Display the specified resource.
   */
  public function show(Product $product)
  {

    $product = $product->with('categories')->with('images')->find($product->id);

    return inertia('Product/Show', [

      'product' => new ProductResource($product),

    ]);

  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Product $product)
  {

    $product = $product->with('categories')->with('images')->find($product->id);
    $categories = Category::all();
    return inertia('Product/Edit', [

      'product' => new ProductResource($product),
      'categories' => CategoryResource::collection($categories)


    ]);


  }

  /**
   * Update the specified resource in storage.
   */
  public function update(UpdateProductRequest $request, Product $product)
  {
    $data = $request->validated();
    $product->update($data);
    $product->categories()->sync($request->categories);


    if (isset($data['images'])) {
        foreach ($data['images'] as $image) {
            $path = $product->images()->where('id' , $image)->first();
            Storage::disk('public')->delete($path->path);
            $path->delete();
        }
    }
    if (isset($data['image_files'])) {
      foreach ($data['image_files'] as $file) {
        $path = $file->store('images', 'public');
        $product->images()->create(['path' => $path]);
      }
    }

  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Product $product)
  {

    $name = $product->name;
    if ($product->images) {
      foreach ($product->images as $image) {
        Storage::disk('public')->delete($image->path);
      }
    }
    $product->delete();
    return to_route('product.index')
      ->with('success', "Product \"$name\" was deleted");

  }
}
