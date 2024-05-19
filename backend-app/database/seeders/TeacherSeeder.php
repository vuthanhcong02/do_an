<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Teacher;
//Faker
use Faker\Factory as Faker;

class TeacherSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //

        $faker = Faker::create();
        for ($i = 0; $i < 20; $i++) {
            $teacher = new Teacher();
            $teacher->full_name = $faker->name();
            $teacher->email = $faker->email();
            $teacher->phone = $faker->phoneNumber();
            $teacher->description = $faker->text();
            $teacher->image = $faker->imageUrl();
            $teacher->address = $faker->address();
            $teacher->degree = $faker->jobTitle();
            $teacher->gender = $faker->randomElement([0, 1]);
            $teacher->experience = $faker->randomElement([0, 1]) . ' years';
            $teacher->save();
        }
    }
}
