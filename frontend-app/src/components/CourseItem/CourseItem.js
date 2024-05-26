import React from "react";
import "./CourseItem.scss";
import { getSummary } from "../../utils/function";
import { baseUrl } from "../../config";
import { NavLink } from "react-router-dom";
export default function CourseItem({ title, image, description, course }) {
  console.log("CourseItem", course);
  return (
    <div className="CourseItem-container">
      <NavLink to={`/courses/${course?.id}`} className="CourseItem-image">
        <img src={`${baseUrl}${course?.image}`} alt="" />
      </NavLink>
      <div className="CourseItem-content">
        <div className="CourseItem-title">
          <NavLink
            to={`/courses/${course?.id}`}
            style={{ textDecoration: "none" }}
          >
            <span className="CourseItem-title-text">{course?.name}</span>
          </NavLink>
          <div className="CourseItem-description">
            {getSummary(course?.short_description)}
          </div>
        </div>
      </div>
    </div>
  );
}
