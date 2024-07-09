import React from "react";
import "./NewsItem.scss";
import { NavLink } from "react-router-dom";
import { baseUrlImage } from "../../config";
export default function NewsItem({ news }) {
  // console.log(news);
  return (
    <div className="NewItems-container p-2">
      <div className="NewItems-image">
        <img
          src={`${baseUrlImage}${news?.image}`}
          width={120}
          height={90}
          alt=""
        />
      </div>
      <div className="NewItems-title">
        <NavLink
          to={`/news/${news?.slug}`}
          style={{ color: "black" }}
          className="NewItems-title-text"
        >
          {news?.title}
        </NavLink>
      </div>
    </div>
  );
}
