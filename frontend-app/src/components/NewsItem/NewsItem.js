import React from "react";
import "./NewsItem.scss";
export default function NewsItem({ news }) {
  // console.log(news);
  return (
    <div className="NewItems-container p-2">
      <div className="NewItems-title">
        <div className="NewItems-title-text">{news?.title}</div>
        {/* <img src={news?.image} alt="" width={33} height={16} /> */}
      </div>
    </div>
  );
}
