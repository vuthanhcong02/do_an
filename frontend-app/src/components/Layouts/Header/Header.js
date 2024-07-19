import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faTwitter,
  faYoutube,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";
import { userInfo, logout } from "../../../services/AuthService";
export default function Header() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState({});
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    fetchUserInfo();
  }, [isLoggedIn]);

  const fetchUserInfo = async () => {
    if (isLoggedIn) {
      const { success, data } = await userInfo();
      if (success) {
        setUser(data);
        // console.log(data?.full_name);
      }
    }
  };

  const handleLogout = async () => {
    const { success } = await logout();
    if (success) {
      setIsLoggedIn(false);
      setUser({});
      localStorage.removeItem("token");
      localStorage.removeItem("social");
      localStorage.removeItem("user");
      localStorage.removeItem("expiry_time");
      window.location.href = "/";
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery) {
      return;
    }
    // window.location.href = `/search?query=${searchQuery}`;
    navigate(`/search?query=${searchQuery}`);
  };

  return (
    <>
      <div className="App-header-contact">
        <div className="d-flex justify-content-center align-items-center">
          <div className="App-header-contact-phone d-flex align-items-center">
            <FontAwesomeIcon icon={faPhone} />
            <span className="p-2">(024) 38522201 - Fax: (024) 35633351</span>
          </div>
          <div className="App-header-contact-email d-flex align-items-center">
            <FontAwesomeIcon icon={faEnvelope} />
            <span className="p-2">ttnnth@tlu.edu.vn</span>
          </div>
        </div>
        <div>
          <div className="d-flex justify-content-center align-items-center">
            <a
              style={{ cursor: "pointer", color: "white" }}
              href="https://www.facebook.com/daihocthuyloi1959?locale=vi_VN"
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon
                icon={faFacebook}
                className="p-2"
                style={{ cursor: "pointer" }}
              />
            </a>
            <a
              style={{ cursor: "pointer", color: "white" }}
              href="https://www.instagram.com/daihocthuyloi/"
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon
                icon={faInstagram}
                className="p-2"
                style={{ cursor: "pointer" }}
              />
            </a>
            <FontAwesomeIcon
              icon={faTwitter}
              className="p-2"
              style={{ cursor: "pointer" }}
            />
            <a
              href="https://www.youtube.com/@daihocthuyloi"
              target="_blank"
              rel="noreferrer"
              style={{ cursor: "pointer", color: "white" }}
            >
              <FontAwesomeIcon
                icon={faYoutube}
                className="p-2 mr-4"
                style={{ cursor: "pointer" }}
              />
            </a>
            {isLoggedIn ? (
              <NavDropdown
                id="nav-dropdown-dark-example"
                title={user?.full_name}
                style={{ color: "white" }}
                menuVariant="light"
              >
                <NavDropdown.Item as={NavLink} to="user/profile">
                  Thông tin cá nhân
                </NavDropdown.Item>

                <NavDropdown.Item as={NavLink} to="user/my-courses">
                  Khóa học của bạn
                </NavDropdown.Item>

                <NavDropdown.Item as={NavLink} to="user/my-exams">
                  Xem lịch thi
                </NavDropdown.Item>

                {localStorage.getItem("social") !== "true" && (
                  <NavDropdown.Item as={NavLink} to="user/change-password">
                    Đổi mật khẩu
                  </NavDropdown.Item>
                )}

                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Đăng xuất
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavLink
                to="/login"
                className="p-2"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textDecoration: "none",
                  hover: { textDecoration: "none" },
                }}
              >
                <span className="p-2" style={{ color: "white" }}>
                  Đăng nhập
                </span>
              </NavLink>
            )}
          </div>
        </div>
      </div>
      {["sm"].map((expand) => (
        <div className="App-header-menu">
          <Navbar
            key={expand}
            expand={expand}
            className="bg-body-tertiary mb-3"
          >
            <Container fluid className="bg-body-tertiary">
              <Navbar.Brand href="#">
                <img
                  src="/logo.png"
                  alt=""
                  width={100}
                  height={60}
                  style={{ backgroundImage: "#ECF0F7" }}
                />
              </Navbar.Brand>
              <Navbar.Toggle
                aria-controls={`offcanvasNavbar-expand-${expand}`}
              />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="end"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                    Offcanvas
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="align-items-center">
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <NavLink to="/" className="nav-link">
                      Trang chủ
                    </NavLink>
                    <NavLink to="/news" className="nav-link">
                      Tin tức
                    </NavLink>
                    <NavLink to="/events" className="nav-link">
                      Sự kiện
                    </NavLink>
                    <NavDropdown
                      href="#action2"
                      title="Đào tạo"
                      id="offcanvasNavbarDropdown-expand-${expand}"
                    >
                      <NavLink className="dropdown-item" to="/language-courses">
                        Ngoại ngữ
                      </NavLink>
                      <NavLink
                        className="dropdown-item"
                        to="/information-courses"
                      >
                        Tin học
                      </NavLink>
                    </NavDropdown>
                    <NavLink to="/exams" className="nav-link">
                      Lịch thi
                    </NavLink>

                    <NavLink to="/notifications" className="nav-link">
                      Thông báo
                    </NavLink>
                    <NavLink to="/contacts" className="nav-link">
                      Liên hệ
                    </NavLink>
                  </Nav>
                  <Form
                    className="d-flex App-header-search-input"
                    onSubmit={handleSearch}
                  >
                    <input
                      type="search"
                      placeholder="Tìm kiếm"
                      aria-label="Search"
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button>Tìm kiếm</button>
                  </Form>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        </div>
      ))}
    </>
  );
}
