<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    public function customResponse($statusCode, $success, $data, $error = null, $meta = null)
    {
        $responseData = [
            "statusCode" => $statusCode,
            "success" => $success,
            "data" => $data,
            "error" => $error,
            "meta" => $meta
        ];
        return response()->json($responseData, $statusCode);
    }
}