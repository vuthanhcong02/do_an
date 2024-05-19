<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
//Faker
use App\Models\News;
use Faker\Factory as Faker;

class NewsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $faker = Faker::create();
        for ($i = 0; $i < 30; $i++) {
            $news = new News();
            $news->title = $faker->title();
            $news->content = $faker->sentence();
            $news->image = $faker->imageUrl();
            $news->slug = $faker->slug();
            $news->author = $faker->name();
            $news->featured = $faker->randomElement([0, 1]);
            $news->description = $faker->sentence();
            $news->save();
        }
    }
}
