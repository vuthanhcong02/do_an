import React from "react";
import "./CourseItem.scss";
import { getSummary } from "../../utils/function";
import { baseUrl } from "../../config";
export default function CourseItem({ title, image, description, course }) {
  console.log("CourseItem", course);
  return (
    <div className="CourseItem-container">
      <div className="CourseItem-image">
        <img src={`${baseUrl}${course?.image}`} alt="" />
      </div>
      <div className="CourseItem-content">
        <div className="CourseItem-title">
          <span className="CourseItem-title-text">{course?.name}</span>
          <div className="CourseItem-description">
            {getSummary(course?.short_description)}
          </div>
        </div>
      </div>
    </div>
  );
}
