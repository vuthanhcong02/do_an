@extends('Dashboard.layout.base')

@section('title', 'Dashboard')
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
                        Exam Result
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
                        <form method="post" action="">
                            @csrf


                            <div class="position-relative row form-group">
                                <label for="course" class="col-md-3 text-md-right col-form-label">Khóa học</label>
                                <div class="col-md-9 col-xl-8">
                                    <select name="course" id="course" class="form-control">
                                        <option value="">-- Course --</option>
                                    </select>
                                </div>
                            </div>



                            <div class="position-relative row form-group">
                                <label for="date" class="col-md-3 text-md-right col-form-label">Ngày thi</label>
                                <div class="col-md-9 col-xl-8">
                                    <input name="date" id="date" placeholder="Date" type="date"
                                        class="form-control" value="">
                                </div>
                            </div>
                            <div class="position-relative row form-group">
                                <label for="status" class="col-md-3 text-md-right col-form-label">Trang thái</label>
                                <div class="col-md-9 col-xl-8">
                                    <select name="status" id="status" class="form-control">
                                        <option value="">-- Status --</option>
                                    </select>
                                </div>
                            </div>
                    </div>


                    <div class="position-relative row form-group mb-1">
                        <div class="col-md-9 col-xl-8 offset-md-2">
                            <a href="admin/notifications/exam-results" class="border-0 btn btn-outline-danger mr-1">
                                <span class="btn-icon-wrapper pr-1 opacity-8">
                                    <i class="fa fa-times fa-w-20"></i>
                                </span>
                                <span>Cancel</span>
                            </a>

                            <button type="submit" class="btn-shadow btn-hover-shine btn btn-primary">
                                <span class="btn-icon-wrapper pr-2 opacity-8">
                                    <i class="fa fa-download fa-w-20"></i>
                                </span>
                                <span>Save</span>
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
@endsection
