<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;


;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {


         // Create admin
         User::factory()->admin()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => 'password', // auto-hash in model
        ]);

        // Create 2 normal users
        User::factory(2)->create();

        $this->call([
            MenuItemSeeder::class,
            BookingSeeder::class
        ]);




    }
}
