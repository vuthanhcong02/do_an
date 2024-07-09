import React from "react";
import { baseUrl, baseUrlImage } from "../../config";
import { getSummary } from "../../utils/function";
import moment from "moment";
import { NavLink } from "react-router-dom";
export default function NewList({ news }) {
  return (
    <div className="EventItem-container">
      <div className="EventItem-image">
        <img src={`${baseUrlImage}${news?.image}`} alt="" />
      </div>
      <div className="EventItem-content">
        <div className="EventItem-title d-flex flex-column">
          <NavLink
            to={`/news/${news?.slug}`}
            style={{ textDecoration: "none" }}
          >
            <span>{news?.title}</span>
            <span className="EventItem-date">
              {" "}
              ({moment(news?.created_at).format("DD/MM/YYYY")})
            </span>
          </NavLink>
          <div
            className="EventItem-description"
            dangerouslySetInnerHTML={{
              __html: getSummary(news?.description),
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
