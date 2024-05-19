import React from "react";
import "./EventItem.scss";
export default function EventItem({ news }) {
  return (
    <div className="EventItem-container">
      <div className="EventItem-image">
        <img src={news?.image} alt="" />
      </div>
      <div className="EventItem-content">
        <div className="EventItem-dot"></div>
        <div className="EventItem-title d-flex flex-column">
          <div>
            <span>{news?.description}</span>
            <span className="EventItem-date"> ({news?.created_at})</span>
          </div>
          <div className="EventItem-description">{news?.content}</div>
        </div>
      </div>
    </div>
  );
}
