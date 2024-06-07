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
              <span className="p-2 fz-13">ngoaingutinhoc.tlu.com</span>
            </div>
          </div>
        </div>
        <div className="App-footer-contact">
          <h6>Thông tin chung</h6>
          <div className="d-flex flex-column">
            <div className="d-flex align-items-center">
              <FontAwesomeIcon icon={faArrowRight} />
              <span className="p-2">Trang chủ</span>
            </div>
            <div className="d-flex align-items-center">
              <FontAwesomeIcon icon={faArrowRight} />
              <span className="p-2">Tin tức</span>
            </div>
            <div className="d-flex align-items-center">
              <FontAwesomeIcon icon={faArrowRight} />
              <span className="p-2">Đào tạo</span>
            </div>
            <div className="d-flex align-items-center">
              <FontAwesomeIcon icon={faArrowRight} />
              <span className="p-2">Thông báo</span>
            </div>
            <div className="d-flex align-items-center">
              <FontAwesomeIcon icon={faArrowRight} />
              <span className="p-2">Liên hệ</span>
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
                className="p-2 cursor-pointer"
              />
            </div>
            <div className="d-flex align-items-center">
              <FontAwesomeIcon
                icon={faInstagram}
                size="2x"
                className="p-2 cursor-pointer"
              />
            </div>
            <div className="d-flex align-items-center">
              <FontAwesomeIcon
                icon={faTwitter}
                size="2x"
                className="p-2 cursor-pointer"
              />
            </div>
            <div className="d-flex align-items-center">
              <FontAwesomeIcon
                icon={faYoutube}
                size="2x"
                className="p-2 cursor-pointer"
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
