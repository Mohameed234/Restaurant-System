<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class MenuItemFactory extends Factory
{
    public function definition(): array
    {
        $categories = ['Breakfast', 'Main Dishes', 'Drinks', 'Desserts'];


        $images = [
            'menu_images/pizza.png',
            'menu_images/butterscotch.png',
            'menu_images/cheese burger.png',
            'menu_images/chocolate.png',
            'menu_images/eggs.png',
            'menu_images/mint.png',
            'menu_images/waffles.png',
        ];



        return [
            'name' => $this->faker->words(2, true),
            'description' => $this->faker->sentence(),
            'price' => $this->faker->randomFloat(2, 50, 500),
            'category' => $this->faker->randomElement($categories),
            'image' => $this->faker->randomElement($images),
        ];
    }
}
