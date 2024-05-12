import React from "react";
import CourseItem from "../../CourseItem/CourseItem";
import { Link } from "react-router-dom";
export default function ITCourse() {
  const description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
  return (
    <div className="EnglishCourse-container">
      <div className="EnglishCourse-content">
        <div className="EnglishCourse-content-title">
          <span>IT Course</span>
        </div>
        <div className="EnglishCourse-content-item">
          <CourseItem description={description} />
          <CourseItem description={description} />
          <CourseItem description={description} />
          <CourseItem description={description} />
          <CourseItem description={description} />
          <CourseItem description={description} />
          <CourseItem description={description} />
          <CourseItem description={description} />
          <div className="News-content-pagination mt-3">
            <ul class="pagination justify-content-end">
              <li class="page-item disabled">
                <Link
                  class="page-link"
                  href="#"
                  tabindex="-1"
                  aria-disabled="true"
                >
                  &#60;
                </Link>
              </li>
              <li class="page-item active">
                <Link class="page-link" href="#">
                  1
                </Link>
              </li>
              <li class="page-item">
                <Link class="page-link" href="#">
                  2
                </Link>
              </li>
              <li class="page-item">
                <Link class="page-link" href="#">
                  3
                </Link>
              </li>
              <li class="page-item">
                <Link class="page-link" href="#">
                  &#62;
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
