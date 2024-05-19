import React from "react";
import "./CourseItem.scss";
export default function CourseItem({ title, image, description, course }) {
  console.log("CourseItem", course);
  return (
    <div className="CourseItem-container">
      <div className="CourseItem-image">
        <img src={course?.image} alt="" />
      </div>
      <div className="CourseItem-content">
        <div className="CourseItem-dot"></div>
        <div className="CourseItem-title">
          <span className="CourseItem-title-text">{course?.name}</span>
          <p className="CourseItem-description">{course?.description}</p>
        </div>
      </div>
    </div>
  );
}
