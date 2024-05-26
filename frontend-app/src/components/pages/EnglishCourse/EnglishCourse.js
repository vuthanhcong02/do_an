import React, { useEffect, useState } from "react";
import "./EnglishCourse.scss";
import CourseItem from "../../CourseItem/CourseItem";
import { Link } from "react-router-dom";
import { getCourseByEnglishCategory } from "../../../services/CourseService";
export default function EnglishCourse() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourseByEnglishCategory();
  }, []);

  const fetchCourseByEnglishCategory = async () => {
    const { success, data } = await getCourseByEnglishCategory();
    if (success) {
      setCourses(data.data);
    }
  };
  return (
    <div className="EnglishCourse-container">
      <div className="EnglishCourse-content">
        <div className="EnglishCourse-content-title">
          <span>English Course</span>
        </div>
        <div className="EnglishCourse-content-item">
          {courses.map((course) => (
            <CourseItem key={course.id} course={course} />
          ))}

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
