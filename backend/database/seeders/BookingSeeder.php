<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Booking;
use App\Models\User;
use Faker\Factory as Faker;

class BookingSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        // تأكد إنه فيه users موجودين
        $users = User::all();

        // لو مفيش users، ممكن تعمل واحد وهمي
        if ($users->count() == 0) {
            $users = \App\Models\User::factory(5)->create();
        }

        // إنشاء 20 حجز وهمي
        for ($i = 0; $i < 20; $i++) {
            Booking::create([
                'user_id' => $users->random()->id,
                'name' => $faker->name,
                'phone' => $faker->phoneNumber,
                'date' => $faker->dateTimeBetween('now', '+1 month')->format('Y-m-d'),
                'time' => $faker->time('H:i'),
                'guests_count' => $faker->numberBetween(1, 10),
                'notes' => $faker->sentence,
                'status' => $faker->randomElement(['pending', 'approved', 'rejected']),
            ]);
        }
    }
}
