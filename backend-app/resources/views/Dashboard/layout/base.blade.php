<!doctype html>
<html lang="en">

<head>
    <base href="{{ asset('/') }}">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="Content-Language" content="en">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>@yield('title')</title>
    <meta name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, shrink-to-fit=no" />
    <meta name="description"
        content="This is an example dashboard (CodeLean) created using build-in elements and components.">

    <!-- Disable tap highlight on IE -->
    <meta name="msapplication-tap-highlight" content="no">

    <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">

    <link href="{{ asset('Dashboard/main.css') }}" rel="stylesheet">
    <link href="{{ asset('Dashboard/my_style.css') }}" rel="stylesheet">
</head>

<body>
    <div class="app-container app-theme-white body-tabs-shadow fixed-header fixed-sidebar">
        <div class="app-header header-shadow">
            <div class="app-header__logo">
                {{-- <div class="logo-src"></div> --}}
                <div class="header__pane ml-auto">
                    <div>
                        <button type="button" class="hamburger close-sidebar-btn hamburger--elastic"
                            data-class="closed-sidebar">
                            <span class="hamburger-box">
                                <span class="hamburger-inner"></span>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="app-header__mobile-menu">
                <div>
                    <button type="button" class="hamburger hamburger--elastic mobile-toggle-nav">
                        <span class="hamburger-box">
                            <span class="hamburger-inner"></span>
                        </span>
                    </button>
                </div>
            </div>
            <div class="app-header__menu">
                <span>
                    <button type="button"
                        class="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav">
                        <span class="btn-icon-wrapper">
                            <i class="fa fa-ellipsis-v fa-w-6"></i>
                        </span>
                    </button>
                </span>
            </div>
            <div class="app-header__content">
                <div class="app-header-left">
                    <div class="search-wrapper">
                        <div class="input-holder">
                            <input type="text" class="search-input" placeholder="Type to search">
                            <button class="search-icon"><span></span></button>
                        </div>
                        <button class="close"></button>
                    </div>
                </div>
                <div class="app-header-right">
                    <div class="header-dots">
                        <div class="dropdown">
                            <button type="button" data-toggle="dropdown" class="p-0 mr-2 btn btn-link">
                                <span class="icon-wrapper icon-wrapper-alt rounded-circle">
                                    <span class="icon-wrapper-bg bg-focus"></span>
                                    <span class="language-icon opacity-8 flag large DE"></span>
                                </span>
                            </button>
                            <!-- Choose Language -->
                            <div tabindex="-1" role="menu" aria-hidden="true"
                                class="rm-pointers dropdown-menu dropdown-menu-right">
                                <div class="dropdown-menu-header">
                                    <div class="dropdown-menu-header-inner pt-4 pb-4 bg-focus">
                                        <div class="menu-header-image opacity-05"
                                            style="background-image: url('assets/images/dropdown-header/city2.jpg');">
                                        </div>
                                        <div class="menu-header-content text-center text-white">
                                            <h6 class="menu-header-subtitle mt-0"> Choose Language</h6>
                                        </div>
                                    </div>
                                </div>
                                <h6 tabindex="-1" class="dropdown-header"> Popular Languages</h6>
                                <button type="button" tabindex="0" class="dropdown-item">
                                    <span class="mr-3 opacity-8 flag large US"></span> English
                                </button>
                                <button type="button" tabindex="0" class="dropdown-item">
                                    <span class="mr-3 opacity-8 flag large VN"></span>Việt Nam
                                </button>
                                <div tabindex="-1" class="dropdown-divider"></div>
                                <h6 tabindex="-1" class="dropdown-header">Others</h6>
                                <button type="button" tabindex="0" class="dropdown-item active">
                                    <span class="mr-3 opacity-8 flag large DE"></span> Germany
                                </button>
                                <button type="button" tabindex="0" class="dropdown-item">
                                    <span class="mr-3 opacity-8 flag large IT"></span> Italy
                                </button>
                            </div>
                            <!-- /Choose Language -->
                        </div>
                        <!-- User Online -->
                        <div class="dropdown">
                            <button type="button" aria-haspopup="true" data-toggle="dropdown" aria-expanded="false"
                                class="p-0 btn btn-link dd-chart-btn">
                                <span class="icon-wrapper icon-wrapper-alt rounded-circle">
                                    <span class="icon-wrapper-bg bg-success"></span>
                                    <i class="icon text-success ion-ios-analytics"></i>
                                </span>
                            </button>
                            <div tabindex="-1" role="menu" aria-hidden="true"
                                class="dropdown-menu-xl rm-pointers dropdown-menu dropdown-menu-right">
                                <div class="dropdown-menu-header">
                                    <div class="dropdown-menu-header-inner bg-premium-dark">
                                        <div class="menu-header-image"
                                            style="background-image: url('assets/images/dropdown-header/abstract4.jpg');">
                                        </div>
                                        <div class="menu-header-content text-white">
                                            <h5 class="menu-header-title">Users Online</h5>
                                            <h6 class="menu-header-subtitle">Recent Account Activity Overview</h6>
                                        </div>
                                    </div>
                                </div>
                                <div class="widget-chart">
                                    <div class="widget-chart-content">
                                        <div class="icon-wrapper rounded-circle">
                                            <div class="icon-wrapper-bg opacity-9 bg-focus"></div>
                                            <i class="lnr-users text-white"></i>
                                        </div>
                                        <div class="widget-numbers">
                                            <span>344k</span>
                                        </div>
                                        <div class="widget-subheading pt-2">
                                            Profile views since last login
                                        </div>
                                        <div class="widget-description text-danger">
                                            <span class="pr-1"><span>176%</span></span>
                                            <i class="fa fa-arrow-left"></i>
                                        </div>
                                    </div>
                                    <div class="widget-chart-wrapper">
                                        <div id="dashboard-sparkline-carousel-3-pop"></div>
                                    </div>
                                </div>
                                <ul class="nav flex-column">
                                    <li class="nav-item-divider mt-0 nav-item"></li>
                                    <li class="nav-item-btn text-center nav-item">
                                        <button class="btn-shine btn-wide btn-pill btn btn-warning btn-sm">
                                            <i class="fa fa-cog fa-spin mr-2"></i>View Details
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <!-- /User Online -->
                    </div>
                    <!-- User Information -->
                    <div class="header-btn-lg pr-0">
                        <div class="widget-content p-0">
                            <div class="widget-content-wrapper">
                                <div class="widget-content-left">
                                    <div class="btn-group">
                                        <a data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                                            class="p-0 btn">
                                            <img width="42" class="rounded-circle" height="42"
                                                style="border-radius: 50%" src="" alt="">
                                            <i class="fa fa-angle-down ml-2 opacity-8"></i>
                                        </a>
                                        <div tabindex="-1" role="menu" aria-hidden="true"
                                            class="rm-pointers dropdown-menu-lg dropdown-menu dropdown-menu-right">
                                            <div class="dropdown-menu-header">
                                                <div class="dropdown-menu-header-inner bg-info">
                                                    <div class="menu-header-image opacity-2"
                                                        style="background-image: url('Dashboard/assets/images/dropdown-header/city3.jpg');">
                                                    </div>
                                                    <div class="menu-header-content text-left">
                                                        <div class="widget-content p-0">
                                                            <div class="widget-content-wrapper">
                                                                <div class="widget-content-left mr-3">
                                                                    {{-- <img width="42" height="42"
                                                                        alt="rounded-circle"
                                                                        style="border-radius: 50%"
                                                                        src="assets/images/avatar/{{ Auth::user()->avatar ?? 'default-avatar.jpeg' }}"
                                                                        alt=""> --}}
                                                                </div>
                                                                <div class="widget-content-left">
                                                                    <div class="widget-heading">
                                                                        đsjdlsd</div>
                                                                    <div class="widget-subheading opacity-8">
                                                                        dsdjsdjs</div>
                                                                </div>
                                                                <div class="widget-content-right mr-2">
                                                                    <a href="/admin/logout"
                                                                        class="btn-pill btn-shadow btn-shine btn btn-focus">Logout</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="scroll-area-xs" style="height: 150px;">
                                                <div class="scrollbar-container ps">
                                                    <ul class="nav flex-column">
                                                        <li class="nav-item-header nav-item">Activity</li>
                                                        <li class="nav-item">
                                                            <a href="javascript:void(0);" class="nav-link">Chat
                                                                <div class="ml-auto badge badge-pill badge-info">8
                                                                </div>
                                                            </a>
                                                        </li>
                                                        <li class="nav-item">
                                                            <a href="javascript:void(0);" class="nav-link">Recover
                                                                Password</a>
                                                        </li>
                                                        <li class="nav-item-header nav-item">My Account
                                                        </li>
                                                        <li class="nav-item">
                                                            <a href="javascript:void(0);" class="nav-link">Settings
                                                                <div class="ml-auto badge badge-success">New</div>
                                                            </a>
                                                        </li>
                                                        <li class="nav-item">
                                                            <a href="javascript:void(0);" class="nav-link">Messages
                                                                <div class="ml-auto badge badge-warning">512</div>
                                                            </a>
                                                        </li>
                                                        <li class="nav-item">
                                                            <a href="javascript:void(0);" class="nav-link">Logs</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <ul class="nav flex-column">
                                                <li class="nav-item-divider mb-0 nav-item"></li>
                                            </ul>
                                            <div class="grid-menu grid-menu-2col">
                                                <div class="no-gutters row">
                                                    <div class="col-sm-6">
                                                        <button
                                                            class="btn-icon-vertical btn-transition btn-transition-alt pt-2 pb-2 btn btn-outline-warning">
                                                            <i
                                                                class="pe-7s-chat icon-gradient bg-amy-crisp btn-icon-wrapper mb-2"></i>
                                                            Message Inbox
                                                        </button>
                                                    </div>
                                                    <div class="col-sm-6">
                                                        <button
                                                            class="btn-icon-vertical btn-transition btn-transition-alt pt-2 pb-2 btn btn-outline-danger">
                                                            <i
                                                                class="pe-7s-ticket icon-gradient bg-love-kiss btn-icon-wrapper mb-2"></i>
                                                            <b>Support Tickets</b>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <ul class="nav flex-column">
                                                <li class="nav-item-divider nav-item">
                                                </li>
                                                <li class="nav-item-btn text-center nav-item">
                                                    <button class="btn-wide btn btn-primary btn-sm"> Open Messages
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="widget-content-left  ml-3 header-user-info">
                                    <div class="widget-heading"> dsdsdj</div>
                                    <div class="widget-subheading"> dsjdksjdskdj</div>
                                </div>
                                <div class="widget-content-right header-user-info ml-3">
                                    <button type="button"
                                        class="btn-shadow p-1 btn btn-primary btn-sm show-toastr-example">
                                        <i class="fa text-white fa-calendar pr-1 pl-1"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End User Information -->
                    <div class="header-btn-lg">
                        <button type="button" class="hamburger hamburger--elastic open-right-drawer">
                            <span class="hamburger-box">
                                <span class="hamburger-inner"></span>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Layouts Option -->
        <div class="ui-theme-settings">
            <button type="button" id="TooltipDemo" class="btn-open-options btn btn-warning">
                <i class="fa fa-cog fa-w-16 fa-spin fa-2x"></i>
            </button>
            <div class="theme-settings__inner">
                <div class="scrollbar-container">
                    <div class="theme-settings__options-wrapper">
                        <h3 class="themeoptions-heading">Layout Options</h3>
                        <div class="p-3">
                            <ul class="list-group">
                                <li class="list-group-item">
                                    <div class="widget-content p-0">
                                        <div class="widget-content-wrapper">
                                            <div class="widget-content-left mr-3">
                                                <div class="switch has-switch switch-container-class"
                                                    data-class="fixed-header">
                                                    <div class="switch-animate switch-on">
                                                        <input type="checkbox" checked data-toggle="toggle"
                                                            data-onstyle="success">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="widget-content-left">
                                                <div class="widget-heading">Fixed Header</div>
                                                <div class="widget-subheading">Makes the header top fixed, always
                                                    visible!</div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li class="list-group-item">
                                    <div class="widget-content p-0">
                                        <div class="widget-content-wrapper">
                                            <div class="widget-content-left mr-3">
                                                <div class="switch has-switch switch-container-class"
                                                    data-class="fixed-sidebar">
                                                    <div class="switch-animate switch-on">
                                                        <input type="checkbox" checked data-toggle="toggle"
                                                            data-onstyle="success">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="widget-content-left">
                                                <div class="widget-heading">Fixed Sidebar</div>
                                                <div class="widget-subheading">Makes the sidebar left fixed, always
                                                    visible!</div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li class="list-group-item">
                                    <div class="widget-content p-0">
                                        <div class="widget-content-wrapper">
                                            <div class="widget-content-left mr-3">
                                                <div class="switch has-switch switch-container-class"
                                                    data-class="fixed-footer">
                                                    <div class="switch-animate switch-off">
                                                        <input type="checkbox" data-toggle="toggle"
                                                            data-onstyle="success">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="widget-content-left">
                                                <div class="widget-heading">Fixed Footer</div>
                                                <div class="widget-subheading">Makes the app footer bottom fixed,
                                                    always
                                                    visible!</div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- End Layouts Option -->
        <div class="app-main">
            <div class="app-sidebar sidebar-shadow">
                <div class="app-header__logo">
                    <div class="logo-src"></div>
                    <div class="header__pane ml-auto">
                        <div>
                            <button type="button" class="hamburger close-sidebar-btn hamburger--elastic"
                                data-class="closed-sidebar">
                                <span class="hamburger-box">
                                    <span class="hamburger-inner"></span>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="app-header__mobile-menu">
                    <div>
                        <button type="button" class="hamburger hamburger--elastic mobile-toggle-nav">
                            <span class="hamburger-box">
                                <span class="hamburger-inner"></span>
                            </span>
                        </button>
                    </div>
                </div>
                <div class="app-header__menu">
                    <span>
                        <button type="button"
                            class="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav">
                            <span class="btn-icon-wrapper">
                                <i class="fa fa-ellipsis-v fa-w-6"></i>
                            </span>
                        </button>
                    </span>
                </div>
                <div class="scrollbar-sidebar">
                    <div class="app-sidebar__inner">
                        <ul class="vertical-nav-menu">
                            <li class="app-sidebar__heading">Menu</li>

                            <li class="mm-active">
                                <a href="#">
                                    <i class="metismenu-icon pe-7s-plugin"></i>Danh sách quản lí
                                    <i class="metismenu-state-icon pe-7s-angle-down caret-left"></i>
                                </a>
                                <ul>
                                    <li>
                                        <a href="admin"
                                            class="{{ request()->segment(2) == '' ? 'mm-active' : '' }}">
                                            <i class="metismenu-icon"></i>Báo cáo thống kê
                                        </a>
                                    </li>
                                    <li>
                                        <a href="admin/news"
                                            class="{{ request()->segment(2) == 'news' ? 'mm-active' : '' }}">
                                            <i class="metismenu-icon"></i>Bài đăng - tin tức
                                        </a>
                                    </li>
                                    <li>
                                        <a href="admin/courses"
                                            class="{{ request()->segment(2) == 'courses' ? 'mm-active' : '' }}">
                                            <i class="metismenu-icon"></i>Khóa học
                                        </a>
                                    </li>
                                    <li>
                                        <a href="admin/users"
                                            class="{{ request()->segment(2) == 'users' ? 'mm-active' : '' }}">
                                            <i class="metismenu-icon"></i>Người dùng
                                        </a>
                                    </li>
                                    <li>
                                        <a href="admin/registrations"
                                            class="{{ request()->segment(2) == 'registrations' ? 'mm-active' : '' }}">
                                            <i class="metismenu-icon"></i>Đăng kí học
                                        </a>
                                    </li>
                                    <li>
                                        <a href="admin/classes"
                                            class="{{ request()->segment(2) == 'classes' ? 'mm-active' : '' }}">
                                            <i class="metismenu-icon"></i>Lớp học
                                        </a>
                                    </li>


                                    <li>
                                        <a class="{{ request()->segment(2) == 'notifications' ? 'mm-active' : '' }}">
                                            <i class="metismenu-icon"></i>Thông báo
                                        </a>
                                        <ul>
                                            <li>
                                                <a href="admin/notifications/exam-schedules"
                                                    class="{{ request()->segment(3) == 'exam-schedules' ? 'mm-active' : '' }}">
                                                    <i class="metismenu-icon"></i>Lịch thi
                                                </a>
                                            </li>
                                            <li>
                                                <a href="admin/notifications/exam-results"
                                                    class="{{ request()->segment(3) == 'exam-results' ? 'mm-active' : '' }}">
                                                    <i class="metismenu-icon"></i>Kết quả thi
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="app-main__outer">
                @yield('body')
            </div>
        </div>

    </div>
    <div class="app-drawer-wrapper">
        <div class="drawer-nav-btn">
            <button type="button" class="hamburger hamburger--elastic is-active">
                <span class="hamburger-box"><span class="hamburger-inner"></span></span>
            </button>
        </div>
        <div class="drawer-content-wrapper">
            <div class="scrollbar-container">
                <h3 class="drawer-heading">Servers Status</h3>
                <div class="drawer-section">
                    <div class="row">
                        <div class="col">
                            <div class="progress-box">
                                <h4>Server Load 1</h4>
                                <div class="circle-progress circle-progress-gradient-xl mx-auto">
                                    <small></small>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="progress-box">
                                <h4>Server Load 2</h4>
                                <div class="circle-progress circle-progress-success-xl mx-auto">
                                    <small></small>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="progress-box">
                                <h4>Server Load 3</h4>
                                <div class="circle-progress circle-progress-danger-xl mx-auto">
                                    <small></small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="divider"></div>
                    <div class="mt-3">
                        <h5 class="text-center card-title">Live Statistics</h5>
                        <div id="sparkline-carousel-3"></div>
                        <div class="row">
                            <div class="col">
                                <div class="widget-chart p-0">
                                    <div class="widget-chart-content">
                                        <div class="widget-numbers text-warning fsize-3">43</div>
                                        <div class="widget-subheading pt-1">Packages</div>
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div class="widget-chart p-0">
                                    <div class="widget-chart-content">
                                        <div class="widget-numbers text-danger fsize-3">65</div>
                                        <div class="widget-subheading pt-1">Dropped</div>
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div class="widget-chart p-0">
                                    <div class="widget-chart-content">
                                        <div class="widget-numbers text-success fsize-3">18</div>
                                        <div class="widget-subheading pt-1">Invalid</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="divider"></div>
                        <div class="text-center mt-2 d-block">
                            <button class="mr-2 border-0 btn-transition btn btn-outline-danger">Escalate Issue</button>
                            <button class="border-0 btn-transition btn btn-outline-success">Support Center</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="app-drawer-overlay d-none animated fadeIn"></div>

    <script src="Dashboard/assets/scripts/jquery-3.2.1.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

    <script type="text/javascript" src="Dashboard/assets/scripts/main.js"></script>
    <script type="text/javascript" src="Dashboard/assets/scripts/my_script.js"></script>
</body>

</html>
