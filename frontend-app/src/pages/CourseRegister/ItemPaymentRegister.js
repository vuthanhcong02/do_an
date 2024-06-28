import {
  faCircleLeft,
  faCircleRight,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl, baseUrlImage } from "../../config";

export default function ItemPaymentRegister({ course, schedule, user }) {
  const navigate = useNavigate();
  return (
    <div className="ItemCourseRegister-container p-3">
      <div className="ItemCourseRegister-content">
        <div className="ItemCourseRegister-content-title">
          <span>
            Vui lòng kiểm tra email để xác nhận!
            <br />
            Anh/Chị đang chọn đăng ký online khóa học với thông tin như sau:
          </span>
        </div>
        <div className="ItemCourseRegister-content-description row mt-4">
          <div className="ItemCourseRegister-content-description-item col-4">
            <img
              src={`${baseUrlImage}${course?.image}`}
              alt=""
              style={{
                width: "100%",
                height: "200px",
                objectFit: "fill",
                marginTop: "20px",
              }}
            />
          </div>
          <div className="ItemCourseRegister-content-description-item col-7 mt-4 ml-2">
            <div className="d-flex row">
              <span className="col-4">Tên: </span>
              <span className="col-6"> {user?.full_name}</span>
            </div>
            <div className="d-flex row mt-3">
              <span className="col-4">Email: </span>
              <span className="col-6"> {user?.email}</span>
            </div>

            <div className="d-flex row mt-3">
              <span className="col-4">Môn học: </span>
              <span className="col-6"> {course?.name}</span>
            </div>

            <div className="d-flex row mt-3">
              <span className="col-4">Tên lớp: </span>
              <span className="col-6"> {schedule?.class?.name}</span>
            </div>
            <div className="d-flex row mt-3">
              <span className="col-4">Học phí (tạm tính): </span>
              <span className="col-6"> {schedule?.course?.price}</span>
            </div>
            <div className="d-flex row mt-3">
              <span className="col-4">Lịch học: </span>
              <span className="col-6">
                Thứ {schedule?.day_of_week} ({schedule?.start_end_time})
              </span>
            </div>

            <div className="d-flex row mt-3">
              <span className="col-4">Địa điểm: </span>
              <span className="col-6"> {schedule?.classroom?.name}</span>
            </div>

            <div className="d-flex row mt-3">
              <span className="col-4">Tổng học phí (tạm tính): </span>
              <span className="col-6"> {schedule?.course?.price}</span>
            </div>

            <div className="d-flex row mt-3">
              <span className="col-4">Hình thức thanh toán: </span>
              <span className="col-6">
                {user?.payment_type === "payment_direct"
                  ? "Thanh toán trực tiếp"
                  : "Thanh toán online qua VNPAY"}
              </span>
            </div>
          </div>
        </div>
        <div className="ItemCourseRegister-button">
          <button
            className="btn_cancel_register"
            style={{ width: "150px", height: "40px" }}
            onClick={() => {
              navigate(-1);
            }}
          >
            <FontAwesomeIcon
              icon={faCircleLeft}
              style={{ marginRight: "5px" }}
            />
            Quay lại
          </button>
          <button
            className="btn_continue_register"
            style={{ width: "150px", height: "40px" }}
            onClick={() => navigate("/")}
          >
            Về trang chủ
            <FontAwesomeIcon
              icon={faCircleRight}
              style={{ marginLeft: "5px" }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
