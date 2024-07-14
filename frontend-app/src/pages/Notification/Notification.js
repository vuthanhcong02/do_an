import React, { useEffect, useState } from "react";
import "./Notification.scss";
import NotificationItem from "../../components/NotitficationItem/NotificationItem";
import Paginate from "../../components/Paginate/Paginate";
import { getNotifications } from "../../services/NotificationService";
export default function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    fetchNotifications();
  }, []);
  const fetchNotifications = async (page) => {
    const { success, data } = await getNotifications(page || 1);
    if (success) {
      console.log(data);
      setNotifications(data.data);
      setPageCount(data.last_page);
    }
  };
  const handlePageClick = (data) => {
    const currentPage = data.selected + 1;
    fetchNotifications(currentPage);
  };
  return (
    <div className="Notification-container">
      <div className="Notification-content">
        <div className="Notification-content-title">
          <span>Thông báo</span>
        </div>
        <div className="News-content-item">
          {notifications.map((item, index) => {
            return <NotificationItem key={index} notification={item} />;
          })}

          {pageCount > 1 && (
            <div className="News-content-pagination mt-3">
              <ul class="pagination justify-content-end">
                <Paginate
                  pageCount={pageCount}
                  handlePageClick={handlePageClick}
                />
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
