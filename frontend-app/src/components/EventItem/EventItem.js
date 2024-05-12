import React from "react";
import "./EventItem.scss";
export default function EventItem() {
  return (
    <div className="EventItem-container">
      <div className="EventItem-image">
        <img src="https://picsum.photos/200" alt="" />
      </div>
      <div className="EventItem-content">
        <div className="EventItem-dot"></div>
        <div className="EventItem-title d-flex flex-column">
          <div>
            <span>
              Giải đáp những yếu tố quyết định của bài thi IELTS Speaking cùng
              Trung tâm Tin học - Ngoại ngữ TLU
            </span>
            <span className="EventItem-date"> (25/12/2022)</span>
          </div>
          <div className="EventItem-description">
            "Trong bối cảnh học tập trực tuyến đang trở thành xu hướng chính
            trong giáo dục, các nền tảng và ứng dụng học trực tuyến như
            Coursera, Udemy,
          </div>
        </div>
      </div>
    </div>
  );
}
