import React from "react";
import "./EventItem.scss";
import { baseUrl } from "../../config";
import { getSummary } from "../../utils/function";
import moment from "moment";
export default function EventItem({ news }) {
  return (
    <div className="EventItem-container">
      <div className="EventItem-image">
        <img src={`${baseUrl}${news?.image}`} alt="" />
      </div>
      <div className="EventItem-content">
        <div className="EventItem-title d-flex flex-column">
          <div>
            <span>{news?.title}</span>
            <span className="EventItem-date">
              {" "}
              ({moment(news?.created_at).format("DD/MM/YYYY")})
            </span>
          </div>
          <div className="EventItem-description">
            {getSummary(news?.description)}
          </div>
        </div>
      </div>
    </div>
  );
}
