import React from "react";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import "./UserLayout.scss";
import { NavLink, Outlet, useLocation, matchPath } from "react-router-dom";
export default function UserLayout() {
  const location = useLocation();

  // use either one of these
  return (
    <div className="layout-user-container app-theme-white body-tabs-shadow fixed-header fixed-sidebar container">
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={3} style={{ height: "100vh" }}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link
                  as={NavLink}
                  to="profile"
                  className={
                    location.pathname === "/user/profile"
                      ? "active-link-custom mt-2"
                      : "nav-link-custom mt-2"
                  }
                >
                  Thông tin cá nhân
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link
                  as={NavLink}
                  to="dashboard"
                  className={
                    location.pathname === "/user/dashboard"
                      ? "active-link-custom mt-2"
                      : "nav-link-custom mt-2"
                  }
                >
                  Khóa học của bạn
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link
                  as={NavLink}
                  to="change-password"
                  className={
                    location.pathname === "/user/change-password"
                      ? "active-link-custom mt-2"
                      : "nav-link-custom mt-2"
                  }
                >
                  Đổi mật khẩu
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col
            sm={9}
            style={{ height: "100vh", borderLeft: "1px solid #E5E5E5" }}
          >
            <Tab.Content className="mt-3">
              <Outlet />
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}
