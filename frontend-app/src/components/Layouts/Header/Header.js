import React from "react";
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
import { NavLink } from "react-router-dom";
export default function Header() {
  return (
    <>
      <div className="App-header-contact">
        <div className="d-flex justify-content-center align-items-center">
          <div className="App-header-contact-phone d-flex align-items-center">
            <FontAwesomeIcon icon={faPhone} />
            <span className="p-2">0971765824</span>
          </div>
          <div className="App-header-contact-email d-flex align-items-center">
            <FontAwesomeIcon icon={faEnvelope} />
            <span className="p-2">congvtc02@gmail.com</span>
          </div>
        </div>
        <div>
          <div className="d-flex justify-content-center align-items-center">
            <FontAwesomeIcon icon={faFacebook} className="p-2" />
            <FontAwesomeIcon icon={faInstagram} className="p-2" />
            <FontAwesomeIcon icon={faTwitter} className="p-2" />
            <FontAwesomeIcon icon={faYoutube} className="p-2" />
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
              <Navbar.Brand href="#">Logo</Navbar.Brand>
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

                    <NavDropdown
                      href="#action2"
                      title="Đào tạo"
                      id="offcanvasNavbarDropdown-expand-${expand}"
                    >
                      <NavDropdown.Item href="#action3">
                        Ngoại ngữ
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action4">
                        Tin tức
                      </NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="#action2">Thông báo</Nav.Link>
                    <Nav.Link href="#action2">Liên hệ</Nav.Link>
                  </Nav>
                  <Form className="d-flex App-header-search-input">
                    <input
                      type="search"
                      placeholder="Tìm kiếm"
                      aria-label="Search"
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
