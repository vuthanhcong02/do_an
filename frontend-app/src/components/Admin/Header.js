import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { adminLogout } from "../../services/AuthService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function Header() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    const { success } = await adminLogout();
    if (success) {
      localStorage.removeItem("token");
      navigate("/admin/login");
      toast.success("Đăng xuất thành công");
    }
  };
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
                ></button>
              </div>
            </div>
            {/* User Information */}
            <div className="header-btn-lg pr-0">
              <div className="widget-content p-0">
                <div className="widget-content-wrapper">
                  <div className="widget-content-left  ml-3 header-user-info">
                    <DropdownButton id="dropdown-item-button" title="Admin">
                      <Dropdown.Item as="button">
                        <div className="widget-heading">Admin</div>
                      </Dropdown.Item>
                      <Dropdown.Item as="button">
                        <div className="widget-subheading">admin@gmail.com</div>
                      </Dropdown.Item>
                      <Dropdown.Item as="button" onClick={() => handleLogout()}>
                        Logout
                      </Dropdown.Item>
                    </DropdownButton>
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
