import React from "react";
import "./Notification.scss";
import NotificationItem from "../../components/NotitficationItem/NotificationItem";
export default function Notification() {
  return (
    <div className="Notification-container">
      <div className="Notification-content">
        <div className="Notification-content-title">
          <span>Thông báo</span>
        </div>
        <div className="Notification-content-item">
          <div className="Notification-content-item-title">
            <span>Lịch thi</span>
            <div className="Notification-content-item-content">
              <NotificationItem />
              <NotificationItem />
              <NotificationItem />
              <NotificationItem />
              <NotificationItem />
            </div>
          </div>
          <div className="Notification-content-item-title">
            <span>Kết quả thi</span>
            <div className="Notification-content-item-content">
              <NotificationItem />
              <NotificationItem />
              <NotificationItem />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
