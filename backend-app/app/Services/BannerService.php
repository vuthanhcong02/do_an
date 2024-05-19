<?php

namespace App\Services;

use App\Repositories\BannerRepository;
use Illuminate\Http\Request;

class BannerService
{
    protected $bannerRepository;

    public function __construct(BannerRepository $bannerRepository)
    {
        $this->bannerRepository = $bannerRepository;
    }

    public function getAll()
    {
        return $this->bannerRepository->getAll();
    }

    public function createBanner(Request $request)
    {
        $data = $request->all();
        $user = $this->bannerRepository->create($data);
        if (!$user) {
            return false;
        }
        // Mail::to($data['email'])->send(new SendMail($data));
        return $user;
    }

    public function updateBanner(Request $request, $id)
    {

        // dd($data);
        $banner = $this->bannerRepository->updateBanner($request, $id);
        if (!$banner) {
            return false;
        }

        return $banner;
    }

    public function deleteBanner($id)
    {
        return $this->bannerRepository->delete($id);
    }

    public function getBannerById($id)
    {
        return $this->bannerRepository->find($id);
    }

    public function getBannerOrderByPosition()
    {
        return $this->bannerRepository->getBannersOrderByPosition();
    }
}