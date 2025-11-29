<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\User;
use App\Models\MenuItem;

class OrderSeeder extends Seeder
{
    public function run()
    {
        $statuses = ['pending', 'accepted', 'preparing', 'delivering', 'delivered', 'rejected'];

        $users = User::all();
        $menuItems = MenuItem::all();

        if ($users->isEmpty() || $menuItems->isEmpty()) {
            $this->command->info('Please seed users and menu items first!');
            return;
        }

        // نعمل 10 أوردرات تقريبًا
        for ($i = 0; $i < 10; $i++) {
            $user = $users->random();

            $order = Order::create([
                'user_id' => $user->id,
                'total' => 0, // هنحسبه بعد إضافة الآيتيمز
                'status' => $statuses[array_rand($statuses)],
            ]);

            $total = 0;

            // نضيف 1-3 آيتيمز لكل أوردر
            $itemsCount = rand(1, 3);
            $items = $menuItems->random($itemsCount);

            foreach ($items as $menuItem) {
                $quantity = rand(1, 5);

                OrderItem::create([
                    'order_id' => $order->id,
                    'menu_item_id' => $menuItem->id,
                    'quantity' => $quantity,
                    'price' => $menuItem->price,
                ]);

                $total += $menuItem->price * $quantity;
            }

            $order->update(['total' => $total]);
        }

        $this->command->info('Orders and OrderItems seeded successfully!');
    }
}
