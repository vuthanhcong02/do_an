import React from "react";
import "./NotificationItem.scss";
import moment from "moment";
import { NavLink } from "react-router-dom";
export default function NotificationItem({ notification }) {
  return (
    <div
      className="Notification-item-container p-3"
      style={{ borderBottom: "1px solid #d9d9d9" }}
    >
      <div className="Notification-item-title">
        <div className="Notification-item-title-dot"></div>
        <NavLink
          to={`/notifications/${notification?.slug}`}
          className="text-decoration-none"
        >
          <p className="Notification-item-title-text">{notification?.title}</p>
        </NavLink>
      </div>
      <div className="Notification-item-content d-flex">
        <span>{moment(notification?.created_at).format("DD/MM/YYYY")}</span>
        <div className="Notification-item-content-dot"></div>
        <span>{notification?.notification_type?.name}</span>
      </div>
    </div>
  );
}
