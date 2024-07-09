import React from "react";
import "./CourseRegister.scss";
import { baseUrl, baseUrlImage } from "../../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faCircleRight } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
export default function ItemCourseRegister({
  course,
  schedule,
  handleContinue,
}) {
  const navigate = useNavigate();
  return (
    <div className="ItemCourseRegister-container p-3">
      <div className="ItemCourseRegister-content">
        <div className="ItemCourseRegister-content-title">
          <span>
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
              <span className="col-4">Môn học: </span>
              <span className="col-6"> {course?.name}</span>
            </div>
            <div className="d-flex row mt-3">
              <span className="col-4">Tên lớp: </span>
              <span className="col-6"> {schedule?.class?.name}</span>
            </div>
            <div className="d-flex row mt-3">
              <span className="col-4">Học phí (tạm tính): </span>
              <span className="col-6"> {schedule?.course?.price} VND</span>
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
              <span className="col-6"> {schedule?.course?.price} VND</span>
            </div>

            <div className="d-flex row mt-3">
              <span>
                Anh/Chị vui lòng nhấn nút Tiếp tục để điền thông tin học viên và
                nhận ưu đãi học phí (nếu có)
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
            <FontAwesomeIcon icon={faXmark} style={{ marginRight: "5px" }} />
            Hủy đăng kí
          </button>
          <button
            className="btn_continue_register"
            style={{ width: "150px", height: "40px" }}
            onClick={() => handleContinue("profile_information")}
          >
            Tiếp tục
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
