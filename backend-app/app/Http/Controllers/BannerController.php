<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\BannerService;
use App\Services\ImageUploadService;
use Illuminate\Support\Str;


class BannerController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    protected $bannerService, $imageUploadService;
    public function __construct(BannerService $bannerService, ImageUploadService $imageUploadService)
    {
        $this->bannerService = $bannerService;
        $this->imageUploadService = $imageUploadService;
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

        if ($request->hasFile('image')) {
            $image = $request->file('image');

            $path = $this->imageUploadService->uploadImage($image, 'banners');

            $data['image'] = $path;
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


        $banner = $this->bannerService->find($id);
        if (!$banner) {
            return $this->customResponse(404, false, null, 'Banner not found', null);
        }

        if ($request->hasFile('image')) {
            $image = $request->file('image');

            $path = $this->imageUploadService->uploadImage($image, 'banners');

            if ($banner->image) {
                $this->imageUploadService->deleteImage($banner->image);
            }

            $data['image'] = $path;
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
        $banner->delete();
        return $this->customResponse(200, true, $banner, null, null);
    }
}
