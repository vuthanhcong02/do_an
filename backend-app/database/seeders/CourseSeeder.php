<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Course;
//Faker
use Faker\Factory as Faker;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //

        for ($i = 0; $i < 10; $i++) {
            $faker = Faker::create();
            Course::create([
                'name' => $faker->sentence(10),
                'description' => $faker->text,
                'short_description' => $faker->text,
                'duration' => $faker->numberBetween(1, 100),
                'start_date' => $faker->date,
                'end_date' => $faker->date,
                'min_student' => $faker->numberBetween(1, 10),
                'max_student' => $faker->numberBetween(1, 50),
                'image' => $faker->imageUrl(),
                'slug' => $faker->slug,
                'status' => $faker->boolean,
                'category_id' => $faker->numberBetween(1, 2),
                'teacher_id' => $faker->numberBetween(1, 20),
                'price' => $faker->numberBetween(1, 10) . '.000.000 VND',
                'discount' => $faker->numberBetween(1, 100) . '%',
                'discount_type' => $faker->boolean,
                'featured' => $faker->boolean,
            ]);
        }
    }
}
