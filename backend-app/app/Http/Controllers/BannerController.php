<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\BannerService;
use Illuminate\Support\Str;


class BannerController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    protected $bannerService;
    public function __construct(BannerService $bannerService)
    {
        $this->bannerService = $bannerService;
    }
    public function getAll()
    {
        //
        $banners = $this->bannerService->getAll();
        if (!$banners) {
            return $this->customResponse(404, false, null, 'Banner not found', null);
        }
        return $this->customResponse(200, true, $banners, null, null);
    }

    public function getBannersOrderByPosition()
    {
        $banners = $this->bannerService->getBannerOrderByPosition();
        if (!$banners) {
            return $this->customResponse(404, false, null, 'Banner not found', null);
        }

        return $this->customResponse(200, true, $banners, null, null);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->all();
        if ($request->hasFile('image') && $request->file('image')->isValid()) {
            $file = $request->file('image');
            $fileName = Str::random(32) . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('uploads/banners'), $fileName);
            $data['image'] = 'uploads/banners/' . $fileName;
        } else {
            $data['image'] = null;
        }

        $banner = $this->bannerService->create($data);

        if (!$banner) {
            return $this->customResponse(400, false, null, 'Banner not created', null);
        }

        return $this->customResponse(200, true, $banner, null, null);
    }




    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //\

        $banner = $this->bannerService->find($id);
        if (!$banner) {
            return $this->customResponse(404, false, null, 'Banner not found', null);
        }
        return $this->customResponse(200, true, $banner, null, null);
    }




    public function updateBanner(Request $request, string $id)
    {
        $data = $request->all();

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $fileName = Str::random(32) . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('uploads/banners'), $fileName);
            $data['image'] = 'uploads/banners/' . $fileName;
        } else {
        }

        $banner = $this->bannerService->update($id, $data);

        if (!$banner) {
            return $this->customResponse(404, false, null, 'Banner not found', null);
        }

        return $this->customResponse(200, true, $banner, null, null);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $banner = $this->bannerService->find($id);
        if (!$banner) {
            return $this->customResponse(404, false, null, 'Banner not found', null);
        }
        if ($banner->image) {
            $imagePath = public_path($banner->image);
            if (file_exists($imagePath)) {
                unlink($imagePath);
            }
        }
        $banner = $this->bannerService->delete($id);
        if (!$banner) {
            return $this->customResponse(404, false, null, 'Banner not found', null);
        }
        return $this->customResponse(200, true, $banner, null, null);
    }
}