<?php

namespace App\Repositories;

use App\Models\Banner;
use App\Repositories\BaseRepository;
use Illuminate\Http\Request;

class BannerRepository extends BaseRepository
{
    public function getModel()
    {
        return Banner::class;
    }

    public function updateBanner(Request $request, $id)
    {
        $banner = $this->model->find($id);
        if (!$banner) {
            return false;
        }
        $banner->update($request->all());
        return $banner;
    }
    public function getBannersOrderByPosition()
    {
        return $this->model->where('status', 1)->orderBy('position', 'asc')->get();
    }
}