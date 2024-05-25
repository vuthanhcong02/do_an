<?php

namespace App\Services;

use App\Models\Banner;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Illuminate\Http\Request;

class BannerService extends BaseService
{
    public function __construct(Banner $banner)
    {
        parent::__construct($banner);
    }


    // public function createBanner(Request $request)
    // {
    //     $fileName = null;

    //     if ($request->file('image')) {
    //         $fileName = Str::random(32) . '.' . $request->file('image')->getClientOriginalExtension();
    //         $request->file('image')->move('uploads/banners/', $fileName);
    //     }
    //     dd($fileName);
    //     return $this->model->create([
    //         'title' => $data['title'] ?? null,
    //         'position' => $data['position'] ?? null,
    //         'status' => $data['status'] ?? null,
    //         'image' => $fileName
    //     ]);
    // }



    public function getBannerOrderByPosition()
    {
        return $this->model->where('status', 1)->orderBy('position', 'asc')->get();
    }
}