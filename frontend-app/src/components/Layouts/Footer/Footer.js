import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faLocation,
  faEarth,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faTwitter,
  faYoutube,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { NavLink } from "react-router-dom";
export default function Footer() {
  return (
    <>
      <div className="App-footer-contact-container">
        <div className="App-footer-contact">
          <h6>Thông tin liên hệ</h6>
          <div className="d-flex flex-column">
            <div className="d-flex align-items-center">
              <FontAwesomeIcon icon={faLocation} />
              <span className="p-2">175 Tây Sơn, Đống Đa, Hà Nội</span>
            </div>
            <div className="d-flex align-items-center">
              <FontAwesomeIcon icon={faPhone} />
              <span className="p-2 fz-13">
                {" "}
                (024) 38522201 - Fax: (024) 35633351
              </span>
            </div>
            <div className="d-flex align-items-center">
              <FontAwesomeIcon icon={faEnvelope} />
              <span className="p-2 fz-13">ttnnth@tlu.edu.vn</span>
            </div>
            <div className="d-flex align-items-center">
              <FontAwesomeIcon icon={faEarth} />
              <span className="p-2 fz-13">
                <a href="/" className="text-decoration-none text-white">
                  ngoaingutinhoc.tlu.com
                </a>
              </span>
            </div>
          </div>
        </div>
        <div className="App-footer-contact">
          <h6>Thông tin chung</h6>
          <div className="d-flex flex-column">
            <div className="d-flex align-items-center">
              <FontAwesomeIcon icon={faArrowRight} />
              <span className="p-1">
                <a href="/" className="text-decoration-none text-white">
                  Trang chủ
                </a>
              </span>
            </div>
            <div className="d-flex align-items-center">
              <FontAwesomeIcon icon={faArrowRight} />
              <span className="p-1">
                <a href="/news" className="text-decoration-none text-white">
                  Tin tức
                </a>
              </span>
            </div>
            <div className="d-flex align-items-center">
              <FontAwesomeIcon icon={faArrowRight} />
              <span className="p-1">
                <a href="/events" className="text-decoration-none text-white">
                  Sự kiện
                </a>
              </span>
            </div>

            <div className="d-flex align-items-center">
              <FontAwesomeIcon icon={faArrowRight} />
              <span className="p-1">
                <a
                  href="/notifications"
                  className="text-decoration-none text-white"
                >
                  Thông báo
                </a>
              </span>
            </div>
            <div className="d-flex align-items-center">
              <FontAwesomeIcon icon={faArrowRight} />
              <span className="p-1">
                <a href="/contact" className="text-decoration-none text-white">
                  Liên hệ
                </a>
              </span>
            </div>
          </div>
        </div>
        <div className="App-footer-contact">
          <h6>Các lĩnh vực hoạt động</h6>
          <div className="d-flex flex-column">
            <div className="d-flex align-items-center">
              <FontAwesomeIcon icon={faArrowRight} />

              <span className="p-2">
                <a href="/language-courses">Đào tạo ngoại ngữ</a>
              </span>
            </div>
            <div className="d-flex align-items-center">
              <FontAwesomeIcon icon={faArrowRight} />
              <span className="p-2">
                <a href="/information-courses">Đào tạo tin học</a>
              </span>
            </div>
            <div className="d-flex align-items-center">
              <FontAwesomeIcon icon={faArrowRight} />
              <span className="p-2">
                <a href="/exams">Luyện thi</a>
              </span>
            </div>
          </div>
        </div>
        <div className="App-footer-contact">
          <h6>Mạng xã hội</h6>
          <div className="d-flex justify-center align-items-center">
            <div className="d-flex align-items-center">
              <a
                style={{ cursor: "pointer", color: "white" }}
                href="https://www.facebook.com/daihocthuyloi1959?locale=vi_VN"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon
                  icon={faFacebook}
                  size="2x"
                  className="p-2"
                  style={{ cursor: "pointer" }}
                />
              </a>
            </div>
            <div className="d-flex align-items-center">
              <a
                style={{ cursor: "pointer", color: "white" }}
                href="https://www.instagram.com/daihocthuyloi/"
              >
                <FontAwesomeIcon
                  icon={faInstagram}
                  size="2x"
                  className="p-2"
                  style={{ cursor: "pointer" }}
                />
              </a>
            </div>
            <div className="d-flex align-items-center">
              <FontAwesomeIcon
                icon={faTwitter}
                size="2x"
                className="p-2"
                style={{ cursor: "pointer" }}
              />
            </div>
            <div className="d-flex align-items-center">
              <a
                href="https://www.youtube.com/@daihocthuyloi"
                target="_blank"
                rel="noreferrer"
                style={{ cursor: "pointer", color: "white" }}
              >
                <FontAwesomeIcon
                  icon={faYoutube}
                  size="2x"
                  className="p-2"
                  style={{ cursor: "pointer" }}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="App-footer-copyright">
        <span>
          © 2024 Bản quyền thuộc về tlu.edu.vn. Website được thiết kế bởi Trung
          tâm tin học - ngoại ngữ
        </span>
      </div>
    </>
  );
}
