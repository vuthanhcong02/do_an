import React from "react";
import { NavLink } from "react-router-dom";
export default function SideNav() {
  return (
    <div className="app-sidebar sidebar-shadow">
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
      <div className="scrollbar-sidebar">
        <div className="app-sidebar__inner">
          <ul className="vertical-nav-menu">
            <li className="app-sidebar__heading">Menu</li>
            <li className="mm-active">
              <NavLink to="/admin" className="nav-link">
                <i className="metismenu-icon pe-7s-plugin" />
                Danh sách quản lí
                <i className="metismenu-state-icon pe-7s-angle-down caret-left" />
              </NavLink>
              <ul>
                <li>
                  <NavLink to="/admin" className="nav-link">
                    <i className="metismenu-icon" />
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink to="banners" className="nav-link">
                    <i className="metismenu-icon" />
                    Banner
                  </NavLink>
                </li>
                <li>
                  <NavLink to="news" className="nav-link">
                    <i className="metismenu-icon" />
                    Tin tức
                  </NavLink>
                </li>
                <li>
                  <NavLink to="events" className="nav-link">
                    <i className="metismenu-icon" />
                    Sự kiện
                  </NavLink>
                </li>
                <li>
                  <NavLink to="categories" className="nav-link">
                    <i className="metismenu-icon" />
                    Subject
                  </NavLink>
                </li>
                <li>
                  <NavLink to="courses" className="nav-link">
                    <i className="metismenu-icon" />
                    Khóa học
                  </NavLink>
                </li>
                <li>
                  <NavLink to="teachers" className="nav-link">
                    <i className="metismenu-icon" />
                    Giảng viên
                  </NavLink>
                </li>
                <li>
                  <NavLink to="users" className="nav-link">
                    <i className="metismenu-icon" />
                    Người dùng
                  </NavLink>
                </li>
                <li>
                  <NavLink to="registrations" className="nav-link">
                    <i className="metismenu-icon" />
                    Đăng kí học
                  </NavLink>
                </li>
                <li>
                  <NavLink to="classes" className="nav-link">
                    <i className="metismenu-icon" />
                    Lớp học
                  </NavLink>
                </li>

                <li>
                  <NavLink to="classrooms" className="nav-link">
                    <i className="metismenu-icon" />
                    Phòng học
                  </NavLink>
                </li>

                <li>
                  <NavLink to="schedules" className="nav-link">
                    <i className="metismenu-icon" />
                    Thời khóa biểu
                  </NavLink>
                </li>

                <li>
                  <NavLink to="contacts" className="nav-link">
                    <i className="metismenu-icon" />
                    Liên hệ
                  </NavLink>
                </li>

                <li>
                  <NavLink className="nav-link">
                    <i className="metismenu-icon" />
                    Thông báo
                  </NavLink>
                  <ul>
                    <li>
                      <a
                        href="notifications/exam-schedules"
                        className=" nav-link"
                      >
                        <i className="metismenu-icon" />
                        Lịch thi
                      </a>
                    </li>
                    <li>
                      <a
                        href="notifications/exam-results"
                        className=" nav-link"
                      >
                        <i className="metismenu-icon" />
                        Kết quả thi
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
  );
}
