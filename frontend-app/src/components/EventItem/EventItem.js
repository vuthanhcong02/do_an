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
        <div className="EventItem-title">
          <span>
            Giải đáp những yếu tố quyết định của bài thi IELTS Speaking cùng
            Trung tâm Tin học - Ngoại ngữ TLU
          </span>
        </div>
      </div>
    </div>
  );
}
