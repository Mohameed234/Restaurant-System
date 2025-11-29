<?php

namespace App\Http\Controllers;

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * User checkout → create order
     */
    public function checkout()
    {
        $userId = auth()->id();

        $cartItems = CartItem::where('user_id', $userId)
            ->with('menuItem')
            ->get();

        if ($cartItems->isEmpty()) {
            return response()->json([
                'status' => false,
                'message' => 'Cart is empty'
            ], 400);
        }

        // Calculate total
        $total = 0;
        foreach ($cartItems as $item) {
            $total += $item->menuItem->price * $item->quantity;
        }

        // Create order
        $order = Order::create([
            'user_id' => $userId,
            'total' => $total,
            'status' => 'pending'
        ]);

        // Create order items
        foreach ($cartItems as $item) {
            OrderItem::create([
                'order_id' => $order->id,
                'menu_item_id' => $item->menu_item_id,
                'quantity' => $item->quantity,
                'price' => $item->menuItem->price
            ]);
        }

        // Empty cart
        CartItem::where('user_id', $userId)->delete();

        return response()->json([
            'status' => true,
            'message' => 'Order placed successfully',
            'order' => $order->load('items.menuItem')
        ]);
    }

    /**
     * User — list my orders
     */
    public function myOrders()
    {
        $orders = Order::where('user_id', auth()->id())
            ->with('items.menuItem')
            ->orderBy('id', 'desc')
            ->get();

        return response()->json([
            'status' => true,
            'data' => $orders
        ]);
    }



    // get all orders for admin
    public function allOrders()
    {
        $orders = Order::with('user', 'items.menuItem')
            ->orderBy('id', 'desc')
            ->get();

        return response()->json([
            'status' => true,
            'data' => $orders
        ]);
    }

    // Admin Can Update Status Of The Order
    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:pending,accepted,preparing,delivering,delivered,rejected'
        ]);

        $order = Order::find($id);

        if (!$order) {
            return response()->json([
                'status' => false,
                'message' => 'Order not found'
            ], 404);
        }

        $order->status = $request->status;
        $order->save();

        return response()->json([
            'status' => true,
            'message' => 'Order status updated successfully',
            'data' => $order
        ]);
    }

}
