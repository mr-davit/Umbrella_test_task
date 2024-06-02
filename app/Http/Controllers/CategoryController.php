<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {

    $categories = Category::all();
    return inertia('Category/Index', [
      'categories' => CategoryResource::collection($categories),
      'success' => session('success'),

    ]);
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    return inertia('Category/Create');
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {

    $validated = $request->validate([
      'name' => ['required', 'string', 'unique:categories,name'],
    ]);
    $category = Category::create($validated);

    return redirect(route('category.index'))->with('success', 'New category ' . $category->name . ' was added successfully');

  }

  /**
   * Display the specified resource.
   */
  public function show(Category $category)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Category $category)
  {

    return inertia('Category/Edit', [

      'category' => new CategoryResource($category)


    ]);

  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, Category $category)
  {

    $validated = $request->validate([
      'name' => ['required', 'string', 'unique:categories,name'],
    ]);

    $category->update($validated);

    return redirect(route('category.index'))->with('success', 'new category ' . $category->name . ' was edited successfully');


  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Category $category)
  {
    $category->delete();

    return to_route('category.index')
      ->with('success', "Category \"$category->name\" was deleted");
  }
}
