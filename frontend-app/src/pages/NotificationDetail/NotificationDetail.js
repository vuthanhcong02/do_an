import React, { useEffect, useState } from "react";
import "./NotificationDetail.scss";
import { NavLink, useParams } from "react-router-dom";
import {
  getNotificationById,
  getNotifications,
} from "../../services/NotificationService";
export default function NotificationDetail() {
  const { id } = useParams();

  const [notification, setNotification] = useState({});
  const [otherNotifications, setOtherNotifications] = useState([]);

  useEffect(() => {
    fetchNotificationById();
    fetchAllNotifications();
  }, [id]);
  const fetchNotificationById = async () => {
    const { success, data } = await getNotificationById(id);
    if (success) {
      setNotification(data);
    }
  };

  const fetchAllNotifications = async () => {
    const { success, data } = await getNotifications();
    if (success) {
      const filteredNotifications = data.data.filter(
        (notif) => notif.id !== parseInt(id)
      );
      setOtherNotifications(filteredNotifications);
    }
  };

  return (
    <div className="CourseDetails-container">
      <div className="CourseDetails-content col-sm-9">
        <div className="CourseDetails-content-title">
          <span>Thông báo</span>
        </div>

        <div className="CourseDetails-content-item p-3">
          <h4 className="CourseDetails-content-item-title">
            {notification?.title}
          </h4>
          <div className="CourseDetails-content-item-content">
            {/* <NotificationItem /> */}
            <p
              dangerouslySetInnerHTML={{
                __html: notification?.content,
              }}
            />
          </div>
        </div>
      </div>

      <div className="CourseDetails-more col-sm-3">
        <div className="CourseDetails-more-title">
          <span>Thông báo khác</span>
        </div>
        <div className="NotificationDetails-more-item">
          {otherNotifications.map((item, index) => {
            return (
              <NavLink
                to={`/notifications/${item.id}`}
                key={index}
                className="NotificationDetails-more-item-title"
              >
                {item.title}
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
}
