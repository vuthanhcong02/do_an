import React from "react";
import "./CourseItem.scss";
export default function CourseItem() {
  return (
    <div className="CourseItem-container">
      <div className="CourseItem-image">
        <img src="https://picsum.photos/200" alt="" />
      </div>
      <div className="CourseItem-content">
        <div className="CourseItem-dot"></div>
        <div className="CourseItem-title">
          <span>
            Kế hoạch tổ chức các lớp bồi dưỡng, ôn tập tiếng Anh theo...
          </span>
        </div>
      </div>
    </div>
  );
}
