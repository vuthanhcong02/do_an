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
              <span className="p-2">
                <a href="/" className="text-decoration-none text-white">
                  Trang chủ
                </a>
              </span>
            </div>
            <div className="d-flex align-items-center">
              <FontAwesomeIcon icon={faArrowRight} />
              <span className="p-2">
                <a href="/news" className="text-decoration-none text-white">
                  Tin tức
                </a>
              </span>
            </div>
            <div className="d-flex align-items-center">
              <FontAwesomeIcon icon={faArrowRight} />
              <span className="p-2">
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
              <span className="p-2">
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
              <span className="p-2">Đào tạo ngoại ngữ</span>
            </div>
            <div className="d-flex align-items-center">
              <FontAwesomeIcon icon={faArrowRight} />
              <span className="p-2">Đào tạo tin học</span>
            </div>
            <div className="d-flex align-items-center">
              <FontAwesomeIcon icon={faArrowRight} />
              <span className="p-2">Luyện thi</span>
            </div>
            <div className="d-flex align-items-center">
              <FontAwesomeIcon icon={faArrowRight} />
              <span className="p-2">Cấp chứng chỉ CNTT-ngoại ngữ</span>
            </div>
          </div>
        </div>
        <div className="App-footer-contact">
          <h6>Mạng xã hội</h6>
          <div className="d-flex justify-center align-items-center">
            <div className="d-flex align-items-center">
              <FontAwesomeIcon
                icon={faFacebook}
                size="2x"
                className="p-2"
                style={{ cursor: "pointer" }}
              />
            </div>
            <div className="d-flex align-items-center">
              <FontAwesomeIcon
                icon={faInstagram}
                size="2x"
                className="p-2"
                style={{ cursor: "pointer" }}
              />
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
              <FontAwesomeIcon
                icon={faYoutube}
                size="2x"
                className="p-2"
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="App-footer-copyright">
        <span>
          © 2024 Bản quyền thuộc về Viện VTC. Website được thiết kế bởi Mr.Cong
          Designer
        </span>
      </div>
    </>
  );
}
