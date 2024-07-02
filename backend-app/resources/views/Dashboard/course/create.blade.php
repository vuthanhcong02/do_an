@extends('Dashboard.layout.base')
@section('title', 'Admin Dashboard')
@section('body')
    <!-- Main -->
    <div class="app-main__inner">

        <div class="app-page-title">
            <div class="page-title-wrapper">
                <div class="page-title-heading">
                    <div class="page-title-icon">
                        <i class="pe-7s-ticket icon-gradient bg-mean-fruit"></i>
                    </div>
                    <div>
                        Course
                        <div class="page-title-subheading">
                            View, create, update, delete and manage.
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="main-card mb-3 card">
                    <div class="card-body">
                        <form method="post" enctype="multipart/form-data" action="">
                            @csrf
                            <div class="position-relative row form-group">
                                <label for="image" class="col-md-3 text-md-right col-form-label">Hình ảnh</label>
                                <div class="col-md-9 col-xl-8 d-flex flex-lg-column">
                                    <img src="Dashboard/assets/images/blog/default-blog.jpeg"
                                        alt="Generic placeholder image" class="img-fluid"
                                        style="width: 300px; height: 180px; object-fit: fill;" name="image"
                                        id="Image" />
                                </div>
                                <div class="col-md-9 col-xl-8" style="margin-top: 20px;margin-left: 115px;">
                                    <div class="d-flex flex-column align-items-center justify-content-center">
                                        <label class="label">
                                            <input type="file" onchange="Img(this)" value="{{ old('image') }}"
                                                name="image" accept="image/x-png,image/gif,image/jpeg" />
                                            <span>Chọn hình ảnh</span>
                                        </label>
                                    </div>
                                </div>
                            </div>


                            <div class="position-relative row form-group">
                                <label for="title" class="col-md-3 text-md-right col-form-label">Tiêu đề</label>
                                <div class="col-md-9 col-xl-8">
                                    <input name="title" id="title" placeholder="Title" type="text"
                                        class="form-control" value="">
                                </div>
                            </div>

                            <div class="position-relative row form-group">
                                <label for="content" class="col-md-3 text-md-right col-form-label">Content</label>
                                <div class="col-md-9 col-xl-8">
                                    <textarea name="content" id="content" placeholder="Content" type="text" class="form-control" value=""></textarea>
                                </div>
                            </div>

                            <div class="position-relative row form-group mb-1">
                                <div class="col-md-9 col-xl-8 offset-md-2">
                                    <a href="admin/courses" class="border-0 btn btn-outline-danger mr-1">
                                        <span class="btn-icon-wrapper pr-1 opacity-8">
                                            <i class="fa fa-times fa-w-20"></i>
                                        </span>
                                        <span>Hủy</span>
                                    </a>

                                    <button type="submit" class="btn-shadow btn-hover-shine btn btn-primary">
                                        <span class="btn-icon-wrapper pr-2 opacity-8">
                                            <i class="fa fa-download fa-w-20"></i>
                                        </span>
                                        <span>Lưu</span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- End Main -->
    <script>
        function Img(input) {
            var reader = new FileReader();

            reader.onload = function(e) {
                document.getElementById('Image').src = e.target.result;
            };

            reader.readAsDataURL(input.files[0]);
        }
    </script>
    <script src="https://cdn.ckeditor.com/4.14.1/standard/ckeditor.js"></script>
    <script>
        CKEDITOR.replace('content');
    </script>
@endsection
