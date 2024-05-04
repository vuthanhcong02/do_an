import React from "react";
import "./NewsItem.scss";
export default function NewsItem() {
  return (
    <div className="NewItems-container">
      <div className="NewItems-dot"></div>
      <div className="NewItems-title">
        <span>Thông báo chiêu sinh khóa học chuẩn đầu ra tháng 05/2024</span>
        <img
          src={"https://static-cdn.uef.edu.vn/s-img/newicon_vi.gif"}
          alt=""
          width={33}
          height={16}
        />
      </div>
    </div>
  );
}
