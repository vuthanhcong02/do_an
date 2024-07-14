import React, { useEffect, useState } from "react";
import "./EnglishCourse.scss";
import CourseItem from "../../components/CourseItem/CourseItem";
import { Link, useNavigate } from "react-router-dom";
import { getCourseByEnglishCategory } from "../../services/CourseService";
import Paginate from "../../components/Paginate/Paginate";
export default function EnglishCourse() {
  const [courses, setCourses] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    fetchCourseByEnglishCategory();
  }, []);

  const fetchCourseByEnglishCategory = async (page) => {
    const { success, data } = await getCourseByEnglishCategory(page || 1);
    if (success) {
      setCourses(data.data);
      setPageCount(data.last_page);
      navigate(`/language-courses?page=${page || 1}`);
    }
  };

  const handlePageClick = (data) => {
    const currentPage = data.selected + 1;
    fetchCourseByEnglishCategory(currentPage);
  };
  return (
    <div className="EnglishCourse-container">
      <div className="EnglishCourse-content">
        <div className="EnglishCourse-content-title">
          <span>Ngoại ngữ</span>
        </div>
        <div className="EnglishCourse-content-item">
          {courses.map((course) => (
            <CourseItem key={course.id} course={course} />
          ))}

          {pageCount > 1 && (
            <div className="News-content-pagination mt-3">
              <ul class="pagination justify-content-end">
                <Paginate
                  pageCount={pageCount}
                  handlePageClick={handlePageClick}
                />
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
