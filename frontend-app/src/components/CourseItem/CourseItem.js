import React from "react";
import "./CourseItem.scss";
export default function CourseItem({ title, image, description }) {
  return (
    <div className="CourseItem-container">
      <div className="CourseItem-image">
        <img src="https://picsum.photos/200" alt="" />
      </div>
      <div className="CourseItem-content">
        <div className="CourseItem-dot"></div>
        <div className="CourseItem-title">
          <span className="CourseItem-title-text">
            Kế hoạch tổ chức các lớp bồi dưỡng, ôn tập tiếng Anh theo...
          </span>
          <p className="CourseItem-description">{description}</p>
        </div>
      </div>
    </div>
  );
}
