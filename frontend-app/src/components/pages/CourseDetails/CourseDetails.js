import React, { useEffect, useState } from "react";
import CourseItem from "../../CourseItem/CourseItem";
import { Link, NavLink, useParams } from "react-router-dom";
import "./CourseDetails.scss";
import {
  getCourseById,
  getCourseByFeatured,
} from "../../../services/CourseService";
import { baseUrl } from "../../../config";
export default function CourseDetails() {
  const { id } = useParams();
  const [courses, setCourses] = useState([]);
  const [courseDetails, setCourseDetails] = useState({});
  //   console.log(course);

  useEffect(() => {
    fetchCourseDetails();
  }, [id]);

  const fetchCourseDetails = async () => {
    const { success, data } = await getCourseById(id);
    if (success) {
      setCourseDetails(data);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const { success, data } = await getCourseByFeatured();
    if (success) {
      setCourses(data);
    }
  };
  return (
    <div className="CourseDetails-container">
      <div className="CourseDetails-content col-8">
        <div className="CourseDetails-content-title">
          <span>Tin học</span>
        </div>
        <div className="CourseDetails-content-item p-3">
          <h4 className="CourseDetails-content-item-title">
            {courseDetails.name}
          </h4>
          <p className="CourseDetails-content-item-description">
            {courseDetails.sub_description}
          </p>
          <img
            src={`${baseUrl}${courseDetails.image}`}
            alt=""
            style={{
              width: "100%",
              height: "400px",
              objectFit: "fill",
              marginTop: "20px",
            }}
          />
          <div
            className="CourseDetails-content-item-content"
            dangerouslySetInnerHTML={{
              __html: courseDetails.description,
            }}
          />
        </div>
      </div>
      <div className="CourseDetails-more col-4">
        <div className="CourseDetails-more-title">
          <span>Các khóa học khác</span>
        </div>
        {courses.map((course, index) => (
          <NavLink
            to={`/courses/${course?.id}`}
            style={{ textDecoration: "none" }}
            className="CourseDetails-more-item row"
            key={course?.id}
          >
            <div className="CourseDetails-more-item-image col-5">
              <img src={`${baseUrl}${course?.image}`} alt="" />
            </div>
            <div className="CourseDetails-more-item-content col-7">
              <span className="CourseDetails-more-item-title">
                {course?.name}
              </span>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
