import React from "react";
import "./Contact.scss";
export default function Contact() {
  return (
    <div className="Contact-container">
      <div className="Contact-content">
        <div className="Contact-content-title">
          <span>Liên hệ</span>
        </div>
        <div className="Contact-content-main">
          <div className="Contact-content-main-item ">
            <span>
              Trung tâm Ngoại ngữ và Tin học - Trường Đại học Thủy Lợi
            </span>
            <span>Địa chỉ: 175 Tây Sơn, Đống Đa, Hà Nội</span>
            <span>Điện thoại: 096 123 4567</span>
          </div>
          <div className="Contact-content-main-item ">
            <span className="title">
              Liên hệ đăng kí kiểm tra năng lực ngoại ngữ-tin học
            </span>
            <span>Di động: 096 123 4567</span>
          </div>
          <div className="Contact-content-main-item">
            <span className="title">
              Thời gian làm việc (từ thứ 2 đến thứ 6)
            </span>
            <span>Sáng: 8h30 - 11h30</span>
            <span>Chiều: 13h - 17h30</span>
          </div>
          <div
            className="Contact-content-main-item"
            style={{ width: "100%", borderBottom: "1px solid #d9d9d9" }}
          >
            <iframe
              srcDoc={`<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4830.248889734316!2d105.82241378878874!3d21.007421095669034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac8109765ba5%3A0xd84740ece05680ee!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBUaOG7p3kgbOG7o2k!5e0!3m2!1svi!2s!4v1715501630092!5m2!1svi!2s" width="100%" height="400" style="border:0;"  loading="lazy" ></iframe>`}
              width="100%"
              height="450"
              style={{ border: "0" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="Contact-content-main-form p-2">
            <form className="row g-3">
              <div className="form-group mb-3 col-6">
                <label className="col" htmlFor="formGroupExampleInput">
                  Họ và tên
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nhập họ tên"
                />
              </div>
              <div className="form-group mb-3 col-6">
                <label className="col" htmlFor="formGroupExampleInput">
                  Địa chỉ
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="formGroupExampleInput"
                  placeholder="Nhập họ tên"
                />
              </div>
              <div className="form-group mb-3 col-6">
                <label htmlFor="formGroupExampleInput">Email</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email"
                />
              </div>
              <div className="form-group mb-3 col-6">
                <label htmlFor="formGroupExampleInput">Số điện thoại</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Số điện thoại"
                />
              </div>
              <div className="form-group mb-3 col-12">
                <label htmlFor="formGroupExampleInput">Tiêu đề</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tiêu đề"
                />
              </div>
              <div className="form-group mb-3 col-12">
                <label htmlFor="formGroupExampleInput">Nội dung</label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                ></textarea>
              </div>
              <div className="form-group mb-3 col-12 d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    width: "150px",
                    backgroundColor: "#273272",
                    color: "white",
                  }}
                >
                  Gửi
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
