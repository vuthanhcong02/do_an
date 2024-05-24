<?php

namespace App\Services;

use App\Repositories\BannerRepository;
use Illuminate\Http\Request;
use App\Models\Banner;

class BannerService extends BaseService
{

    public function __construct(Banner $banner)
    {
        parent::__construct($banner);
    }

    public function getBannerOrderByPosition()
    {
        return $this->model->where('status', 1)->orderBy('position', 'asc')->get();
    }
}
