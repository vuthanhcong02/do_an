import React from "react";
import "./NotificationItem.scss";
export default function NotificationItem() {
  return (
    <div
      className="Notification-item-container p-3"
      style={{ borderBottom: "1px solid #d9d9d9" }}
    >
      <div className="Notification-item-title">
        <div className="Notification-item-title-dot"></div>
        <p className="Notification-item-title-text">
          Học trực tuyến (Online) là giải pháp tối ưu trong tình hình dịch Covid
          hiện nay. Các khóa học và luyện thi Online của Trung tâm Ngoại ngữ Tin
          học Lạc Hồng ra đời đáp ứng nhu cầu của người học, đảm bảo chất lượng
          đào tạo tối ưu. Học viên có thể học mọi lúc, mọi nơi và không giới hạn
          thời gian học
        </p>
      </div>
      <div className="Notification-item-content d-flex">
        <span>30/05/2021</span>
        <div
          className="Notification-item-content-dot"
        ></div>
        <span>ABC</span>
      </div>
    </div>
  );
}
