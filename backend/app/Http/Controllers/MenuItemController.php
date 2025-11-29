<?php

namespace App\Http\Controllers;

use App\Models\MenuItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class MenuItemController extends Controller
{
    // Public: get all menu items
    public function index()
    {
        $items = MenuItem::all();
        return response()->json([
            'status' => true,
            'menu_items' => $items
        ]);
    }

    // Admin: create menu item
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'category' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $request->only('name', 'description', 'price', 'category');

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('menu_images', 'public');
            $data['image'] = $path;
        }

        $item = MenuItem::create($data);

        return response()->json([
            'status' => true,
            'message' => 'Menu item created successfully',
            'item' => $item
        ]);
    }

    // Admin: update menu item
    public function update(Request $request, $id)
    {
        $item = MenuItem::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'name' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'price' => 'nullable|numeric',
            'category' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $item->update($request->only('name','description','price','category'));

        if ($request->hasFile('image')) {
            if ($item->image) {
                Storage::disk('public')->delete($item->image);
            }
            $path = $request->file('image')->store('menu_images', 'public');
            $item->image = $path;
            $item->save();
        }

        return response()->json([
            'status' => true,
            'message' => 'Menu item updated successfully',
            'item' => $item
        ]);
    }

    // Admin: delete menu item
    public function destroy($id)
    {
        $item = MenuItem::findOrFail($id);

        if ($item->image) {
            Storage::disk('public')->delete($item->image);
        }

        $item->delete();

        return response()->json([
            'status' => true,
            'message' => 'Menu item deleted successfully'
        ]);
    }
}
