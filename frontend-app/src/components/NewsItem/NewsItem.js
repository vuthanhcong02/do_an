import React from "react";
import "./NewsItem.scss";
import { NavLink } from "react-router-dom";
export default function NewsItem({ news }) {
  // console.log(news);
  return (
    <div className="NewItems-container p-2">
      <div className="NewItems-title">
        <NavLink
          to={`/news/${news?.id}`}
          style={{ color: "black" }}
          className="NewItems-title-text"
        >
          {news?.title}
        </NavLink>
        {/* <img src={news?.image} alt="" width={33} height={16} /> */}
      </div>
    </div>
  );
}
