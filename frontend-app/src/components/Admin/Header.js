import React from "react";

export default function Header() {
  return (
    <>
      <div className="app-header header-shadow">
        <div className="app-header__logo">
          <div className="logo-src" />
          <div className="header__pane ml-auto">
            <div>
              <button
                type="button"
                className="hamburger close-sidebar-btn hamburger--elastic"
                data-class="closed-sidebar"
              >
                <span className="hamburger-box">
                  <span className="hamburger-inner" />
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="app-header__mobile-menu">
          <div>
            <button
              type="button"
              className="hamburger hamburger--elastic mobile-toggle-nav"
            >
              <span className="hamburger-box">
                <span className="hamburger-inner" />
              </span>
            </button>
          </div>
        </div>
        <div className="app-header__menu">
          <span>
            <button
              type="button"
              className="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav"
            >
              <span className="btn-icon-wrapper">
                <i className="fa fa-ellipsis-v fa-w-6" />
              </span>
            </button>
          </span>
        </div>
        <div className="app-header__content">
          <div className="app-header-left">
            <div className="search-wrapper">
              <div className="input-holder">
                <input
                  type="text"
                  className="search-input"
                  placeholder="Type to search"
                />
                <button className="search-icon">
                  <span />
                </button>
              </div>
              <button className="close" />
            </div>
          </div>
          <div className="app-header-right">
            <div className="header-dots">
              <div className="dropdown">
                <button
                  type="button"
                  data-toggle="dropdown"
                  className="p-0 mr-2 btn btn-link"
                >
                  <span className="icon-wrapper icon-wrapper-alt rounded-circle">
                    <span className="icon-wrapper-bg bg-focus" />
                    <span className="language-icon opacity-8 flag large DE" />
                  </span>
                </button>
                {/* Choose Language */}
                <div
                  tabIndex={-1}
                  role="menu"
                  aria-hidden="true"
                  className="rm-pointers dropdown-menu dropdown-menu-right"
                >
                  <div className="dropdown-menu-header">
                    <div className="dropdown-menu-header-inner pt-4 pb-4 bg-focus">
                      <div
                        className="menu-header-image opacity-05"
                        style={{
                          backgroundImage:
                            'url("assets/images/dropdown-header/city2.jpg")',
                        }}
                      ></div>
                      <div className="menu-header-content text-center text-white">
                        <h6 className="menu-header-subtitle mt-0">
                          {" "}
                          Choose Language
                        </h6>
                      </div>
                    </div>
                  </div>
                  <h6 tabIndex={-1} className="dropdown-header">
                    {" "}
                    Popular Languages
                  </h6>
                  <button type="button" tabIndex={0} className="dropdown-item">
                    <span className="mr-3 opacity-8 flag large US" /> English
                  </button>
                  <button type="button" tabIndex={0} className="dropdown-item">
                    <span className="mr-3 opacity-8 flag large VN" />
                    Việt Nam
                  </button>
                  <div tabIndex={-1} className="dropdown-divider" />
                  <h6 tabIndex={-1} className="dropdown-header">
                    Others
                  </h6>
                  <button
                    type="button"
                    tabIndex={0}
                    className="dropdown-item active"
                  >
                    <span className="mr-3 opacity-8 flag large DE" /> Germany
                  </button>
                  <button type="button" tabIndex={0} className="dropdown-item">
                    <span className="mr-3 opacity-8 flag large IT" /> Italy
                  </button>
                </div>
                {/* /Choose Language */}
              </div>
              {/* User Online */}
              <div className="dropdown">
                <button
                  type="button"
                  aria-haspopup="true"
                  data-toggle="dropdown"
                  aria-expanded="false"
                  className="p-0 btn btn-link dd-chart-btn"
                >
                  <span className="icon-wrapper icon-wrapper-alt rounded-circle">
                    <span className="icon-wrapper-bg bg-success" />
                    <i className="icon text-success ion-ios-analytics" />
                  </span>
                </button>
                <div
                  tabIndex={-1}
                  role="menu"
                  aria-hidden="true"
                  className="dropdown-menu-xl rm-pointers dropdown-menu dropdown-menu-right"
                >
                  <div className="dropdown-menu-header">
                    <div className="dropdown-menu-header-inner bg-premium-dark">
                      <div
                        className="menu-header-image"
                        style={{
                          backgroundImage:
                            'url("assets/images/dropdown-header/abstract4.jpg")',
                        }}
                      ></div>
                      <div className="menu-header-content text-white">
                        <h5 className="menu-header-title">Users Online</h5>
                        <h6 className="menu-header-subtitle">
                          Recent Account Activity Overview
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="widget-chart">
                    <div className="widget-chart-content">
                      <div className="icon-wrapper rounded-circle">
                        <div className="icon-wrapper-bg opacity-9 bg-focus" />
                        <i className="lnr-users text-white" />
                      </div>
                      <div className="widget-numbers">
                        <span>344k</span>
                      </div>
                      <div className="widget-subheading pt-2">
                        Profile views since last login
                      </div>
                      <div className="widget-description text-danger">
                        <span className="pr-1">
                          <span>176%</span>
                        </span>
                        <i className="fa fa-arrow-left" />
                      </div>
                    </div>
                    <div className="widget-chart-wrapper">
                      <div id="dashboard-sparkline-carousel-3-pop" />
                    </div>
                  </div>
                  <ul className="nav flex-column">
                    <li className="nav-item-divider mt-0 nav-item" />
                    <li className="nav-item-btn text-center nav-item">
                      <button className="btn-shine btn-wide btn-pill btn btn-warning btn-sm">
                        <i className="fa fa-cog fa-spin mr-2" />
                        View Details
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              {/* /User Online */}
            </div>
            {/* User Information */}
            <div className="header-btn-lg pr-0">
              <div className="widget-content p-0">
                <div className="widget-content-wrapper">
                  <div className="widget-content-left">
                    <div className="btn-group">
                      <a
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        className="p-0 btn"
                      >
                        <img
                          width={42}
                          className="rounded-circle"
                          height={42}
                          style={{ borderRadius: "50%" }}
                          src
                          alt
                        />
                        <i className="fa fa-angle-down ml-2 opacity-8" />
                      </a>
                      <div
                        tabIndex={-1}
                        role="menu"
                        aria-hidden="true"
                        className="rm-pointers dropdown-menu-lg dropdown-menu dropdown-menu-right"
                      >
                        <div className="dropdown-menu-header">
                          <div className="dropdown-menu-header-inner bg-info">
                            <div
                              className="menu-header-image opacity-2"
                              style={{
                                backgroundImage:
                                  'url("Dashboard/assets/images/dropdown-header/city3.jpg")',
                              }}
                            ></div>
                            <div className="menu-header-content text-left">
                              <div className="widget-content p-0">
                                <div className="widget-content-wrapper">
                                  <div className="widget-content-left mr-3">
                                    {"{"}
                                    {"{"}--{" "}
                                    <img
                                      width={42}
                                      height={42}
                                      alt="rounded-circle"
                                      style={{ borderRadius: "50%" }}
                                      src="assets/images/avatar/{{ Auth::user()->avatar ?? 'default-avatar.jpeg' }}"
                                    />{" "}
                                    --{"}"}
                                    {"}"}
                                  </div>
                                  <div className="widget-content-left">
                                    <div className="widget-heading">
                                      đsjdlsd
                                    </div>
                                    <div className="widget-subheading opacity-8">
                                      dsdjsdjs
                                    </div>
                                  </div>
                                  <div className="widget-content-right mr-2">
                                    <a
                                      href="/admin/logout"
                                      className="btn-pill btn-shadow btn-shine btn btn-focus"
                                    >
                                      Logout
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="scroll-area-xs" style={{ height: 150 }}>
                          <div className="scrollbar-container ps">
                            <ul className="nav flex-column">
                              <li className="nav-item-header nav-item">
                                Activity
                              </li>
                              <li className="nav-item">
                                <a
                                  href="javascript:void(0);"
                                  className="nav-link"
                                >
                                  Chat
                                  <div className="ml-auto badge badge-pill badge-info">
                                    8
                                  </div>
                                </a>
                              </li>
                              <li className="nav-item">
                                <a
                                  href="javascript:void(0);"
                                  className="nav-link"
                                >
                                  Recover Password
                                </a>
                              </li>
                              <li className="nav-item-header nav-item">
                                My Account
                              </li>
                              <li className="nav-item">
                                <a
                                  href="javascript:void(0);"
                                  className="nav-link"
                                >
                                  Settings
                                  <div className="ml-auto badge badge-success">
                                    New
                                  </div>
                                </a>
                              </li>
                              <li className="nav-item">
                                <a
                                  href="javascript:void(0);"
                                  className="nav-link"
                                >
                                  Messages
                                  <div className="ml-auto badge badge-warning">
                                    512
                                  </div>
                                </a>
                              </li>
                              <li className="nav-item">
                                <a
                                  href="javascript:void(0);"
                                  className="nav-link"
                                >
                                  Logs
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <ul className="nav flex-column">
                          <li className="nav-item-divider mb-0 nav-item" />
                        </ul>
                        <div className="grid-menu grid-menu-2col">
                          <div className="no-gutters row">
                            <div className="col-sm-6">
                              <button className="btn-icon-vertical btn-transition btn-transition-alt pt-2 pb-2 btn btn-outline-warning">
                                <i className="pe-7s-chat icon-gradient bg-amy-crisp btn-icon-wrapper mb-2" />
                                Message Inbox
                              </button>
                            </div>
                            <div className="col-sm-6">
                              <button className="btn-icon-vertical btn-transition btn-transition-alt pt-2 pb-2 btn btn-outline-danger">
                                <i className="pe-7s-ticket icon-gradient bg-love-kiss btn-icon-wrapper mb-2" />
                                <b>Support Tickets</b>
                              </button>
                            </div>
                          </div>
                        </div>
                        <ul className="nav flex-column">
                          <li className="nav-item-divider nav-item"></li>
                          <li className="nav-item-btn text-center nav-item">
                            <button className="btn-wide btn btn-primary btn-sm">
                              {" "}
                              Open Messages
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="widget-content-left  ml-3 header-user-info">
                    <div className="widget-heading"> dsdsdj</div>
                    <div className="widget-subheading"> dsjdksjdskdj</div>
                  </div>
                  <div className="widget-content-right header-user-info ml-3">
                    <button
                      type="button"
                      className="btn-shadow p-1 btn btn-primary btn-sm show-toastr-example"
                    >
                      <i className="fa text-white fa-calendar pr-1 pl-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* End User Information */}
            <div className="header-btn-lg">
              <button
                type="button"
                className="hamburger hamburger--elastic open-right-drawer"
              >
                <span className="hamburger-box">
                  <span className="hamburger-inner" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
