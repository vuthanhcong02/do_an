import React from "react";
import "./CourseItem.scss";
import { getSummary } from "../../utils/function";
import { baseUrlImage } from "../../config";
import { NavLink } from "react-router-dom";
export default function CourseItem({ title, image, description, course }) {
  console.log("CourseItem", course);
  return (
    <div className="CourseItem-container">
      <NavLink to={`/courses/${course?.slug}`} className="CourseItem-image">
        <img src={`${baseUrlImage}${course?.image}`} alt="" />
      </NavLink>
      <div className="CourseItem-content">
        <div className="CourseItem-title">
          <NavLink
            to={`/courses/${course?.slug}`}
            style={{ textDecoration: "none" }}
          >
            <span className="CourseItem-title-text">{course?.name}</span>
          </NavLink>
          <div className="CourseItem-description">
            {course?.short_description && getSummary(course?.short_description)}
          </div>
        </div>
      </div>
    </div>
  );
}
