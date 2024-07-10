import {
  faBell,
  faBookOpen,
  faCalendarCheck,
  faCalendarDays,
  faChartSimple,
  faHouseUser,
  faLandmark,
  faMessage,
  faNewspaper,
  faSliders,
  faTableList,
  faTrophy,
  faUserPlus,
  faUsers,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
                Danh sách quản lí
                <i className="metismenu-state-icon pe-7s-angle-down caret-left" />
              </NavLink>
              <ul>
                <li>
                  <NavLink to="/admin" className="nav-link">
                    <FontAwesomeIcon
                      icon={faChartSimple}
                      style={{ marginRight: "10px" }}
                    />
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink to="banners" className="nav-link">
                    <FontAwesomeIcon
                      icon={faSliders}
                      style={{ marginRight: "10px" }}
                    />
                    Banner
                  </NavLink>
                </li>
                <li>
                  <NavLink to="news" className="nav-link">
                    <FontAwesomeIcon
                      icon={faNewspaper}
                      style={{ marginRight: "10px" }}
                    />
                    Tin tức
                  </NavLink>
                </li>
                <li>
                  <NavLink to="events" className="nav-link">
                    <FontAwesomeIcon
                      icon={faCalendarCheck}
                      style={{ marginRight: "10px" }}
                    />
                    Sự kiện
                  </NavLink>
                </li>
                <li>
                  <NavLink to="categories" className="nav-link">
                    <FontAwesomeIcon
                      icon={faTableList}
                      style={{ marginRight: "10px" }}
                    />
                    Chuyên môn
                  </NavLink>
                </li>
                <li>
                  <NavLink to="courses" className="nav-link">
                    <FontAwesomeIcon
                      icon={faBookOpen}
                      style={{ marginRight: "10px" }}
                    />
                    Khóa học
                  </NavLink>
                </li>
                <li>
                  <NavLink to="teachers" className="nav-link">
                    <FontAwesomeIcon
                      icon={faUserTie}
                      style={{ marginRight: "10px" }}
                    />
                    Giảng viên
                  </NavLink>
                </li>
                <li>
                  <NavLink to="users" className="nav-link">
                    <FontAwesomeIcon
                      icon={faUsers}
                      style={{ marginRight: "10px" }}
                    />
                    Người dùng
                  </NavLink>
                </li>
                <li>
                  <NavLink to="registrations" className="nav-link">
                    <FontAwesomeIcon
                      icon={faUserPlus}
                      style={{ marginRight: "10px" }}
                    />
                    Đăng kí học
                  </NavLink>
                </li>
                <li>
                  <NavLink to="classes" className="nav-link">
                    <FontAwesomeIcon
                      icon={faLandmark}
                      style={{ marginRight: "10px" }}
                    />
                    Lớp học
                  </NavLink>
                </li>

                <li>
                  <NavLink to="classrooms" className="nav-link">
                    <FontAwesomeIcon
                      icon={faHouseUser}
                      style={{ marginRight: "10px" }}
                    />
                    Phòng học
                  </NavLink>
                </li>

                <li>
                  <NavLink to="schedules" className="nav-link">
                    <FontAwesomeIcon
                      icon={faCalendarDays}
                      style={{ marginRight: "10px" }}
                    />
                    Thời khóa biểu
                  </NavLink>
                </li>

                <li>
                  <NavLink to="exams" className="nav-link">
                    <FontAwesomeIcon
                      icon={faTrophy}
                      style={{ marginRight: "10px" }}
                    />
                    Lịch thi
                  </NavLink>
                </li>

                <li>
                  <NavLink to="exams/registrations" className="nav-link">
                    <FontAwesomeIcon
                      icon={faUserPlus}
                      style={{ marginRight: "10px" }}
                    />
                    Đăng kí thi
                  </NavLink>
                </li>

                <li>
                  <NavLink to="contacts" className="nav-link">
                    <FontAwesomeIcon
                      icon={faMessage}
                      style={{ marginRight: "10px" }}
                    />
                    Liên hệ
                  </NavLink>
                </li>

                <li>
                  <NavLink to="" className="nav-link">
                    <FontAwesomeIcon
                      icon={faBell}
                      style={{ marginRight: "10px" }}
                    />
                    Thông báo
                  </NavLink>
                  <ul>
                    <li>
                      <NavLink to="notifications/types" className=" nav-link">
                        Loại thông báo
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="notifications" className=" nav-link">
                        <i className="metismenu-icon" />
                        Danh sách thông báo
                      </NavLink>
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
