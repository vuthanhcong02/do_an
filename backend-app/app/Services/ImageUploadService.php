<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class ImageUploadService
{
    /**
     * Upload an image to Minio.
     *
     * @param UploadedFile $image
     * @param string $folder
     * @return string $path
     */
    public function uploadImage(UploadedFile $image, $folder = 'avatars')
    {
        // Tạo tên file duy nhất
        $fileName = uniqid() . '_' . $image->getClientOriginalName();

        // Lưu file vào Minio
        $path = $image->storeAs($folder, $fileName, 's3');

        return $path;
    }

    /**
     * Delete an image from Minio.
     *
     * @param string $path
     * @return void
     */
    public function deleteImage($path)
    {
        Storage::disk('s3')->delete($path);
    }
}