<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use Illuminate\Http\Request;

class CartController extends Controller
{
    /**
     * عرض محتويات الكارت
     */
    public function index()
    {
        $items = CartItem::where('user_id', auth()->id())
            ->with('menuItem') // علشان يجيب تفاصيل المنيو
            ->get();

        return response()->json([
            'status' => true,
            'data' => $items
        ]);
    }

    /**
     * إضافة عنصر للكارت
     */
    public function add(Request $request)
    {
        $request->validate([
            'menu_item_id' => 'required|exists:menu_items,id',
            'quantity' => 'required|integer|min:1'
        ]);

        // لو العنصر موجود في الكارت → نزود الكمية فقط
        $item = CartItem::where('user_id', auth()->id())
            ->where('menu_item_id', $request->menu_item_id)
            ->first();

        if ($item) {
            $item->quantity += $request->quantity;
            $item->save();
        } else {
            $item = CartItem::create([
                'user_id' => auth()->id(),
                'menu_item_id' => $request->menu_item_id,
                'quantity' => $request->quantity
            ]);
        }

        return response()->json([
            'status' => true,
            'message' => 'Item added to cart',
            'data' => $item
        ]);
    }

    /**
     * تعديل كمية عنصر في الكارت
     */
    public function updateQuantity(Request $request, $id)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1'
        ]);

        $item = CartItem::where('user_id', auth()->id())
            ->where('id', $id)
            ->firstOrFail();

        $item->quantity = $request->quantity;
        $item->save();

        return response()->json([
            'status' => true,
            'message' => 'Quantity updated',
            'data' => $item
        ]);
    }

    /**
     * حذف عنصر من الكارت
     */
    public function delete($id)
    {
        $item = CartItem::where('user_id', auth()->id())
            ->where('id', $id)
            ->firstOrFail();

        $item->delete();

        return response()->json([
            'status' => true,
            'message' => 'Item removed from cart'
        ]);
    }
}
