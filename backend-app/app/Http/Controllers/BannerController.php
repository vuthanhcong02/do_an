<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Banner;

class BannerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $banners = Banner::orderBy('id', 'desc')->paginate(10);

        return response()->json([
            'banners' => $banners,
            'success' => true,
            'message' => 'Banner fetched successfully',

        ], 200);
    }

    public function getBannersOrderByPosition()
    {
        $banners = Banner::where('status', 1)->orderBy('position', 'asc')->get();
        return response()->json([
            'banners' => $banners,
            'success' => true,
            'message' => 'Banner fetched successfully',
        ]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return view('Dashboard.banner.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //

        $banner = Banner::create($request->all());
        return response()->json([
            'banner' => $banner,
            'message' => 'Banner created successfully',
            'success' => true
        ]);
        // dd($banner);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit()
    {
        //
        return view('Dashboard.banner.edit');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}