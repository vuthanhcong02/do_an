import React from "react";
import "./EventItem.scss";
import { baseUrl, baseUrlImage } from "../../config";
import { getSummary } from "../../utils/function";
import moment from "moment";
import { NavLink } from "react-router-dom";
export default function EventList({ event }) {
  return (
    <div className="EventItem-container">
      <div className="EventItem-image">
        <img src={`${baseUrlImage}${event?.image}`} alt="" />
      </div>
      <div className="EventItem-content">
        <div className="EventItem-title d-flex flex-column">
          <NavLink
            to={`/events/${event?.slug}`}
            style={{ textDecoration: "none" }}
          >
            <span>{event?.name}</span>
            <span className="EventItem-date">
              {" "}
              ({moment(event?.created_at).format("DD/MM/YYYY")})
            </span>
          </NavLink>
          <div
            className="EventItem-description"
            dangerouslySetInnerHTML={{
              __html: getSummary(event?.description),
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
