<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Course;
use App\Models\Event;
use App\Models\News;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    //

    public function search(Request $request)
    {
        $query = $request->input('query');
        if (empty($query)) {
            return response()->json([
                'courses' => [],
                'news' => [],
                'events' => [],
            ]);
        }
        $courses = Course::where('name', 'LIKE', "%{$query}%")->get();
        $news = News::where('title', 'LIKE', "%{$query}%")->orWhere('content', 'LIKE', "%{$query}%")->get();
        $events = Event::where('name', 'LIKE', "%{$query}%")->orWhere('description', 'LIKE', "%{$query}%")->get();

        return response()->json([
            'courses' => $courses,
            'news' => $news,
            'events' => $events,
        ]);
    }
}