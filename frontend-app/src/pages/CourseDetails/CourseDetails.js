import React, { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import "./CourseDetails.scss";
import {
  getCourseById,
  getCourseByFeatured,
  getCourses,
} from "../../services/CourseService";
import { getSchedulesByCourseId } from "../../services/ScheduleService";
import { baseUrl, baseUrlImage } from "../../config";
import TableSchedule from "../../components/TableSchedule/TableSchedule";
export default function CourseDetails() {
  const { id } = useParams();
  // const [courses, setCourses] = useState([]);
  const [courseOther, setCourseOther] = useState([]);
  const [courseDetails, setCourseDetails] = useState({});
  const [schedules, setSchedules] = useState([]);
  //   console.log(course);

  useEffect(() => {
    fetchCourseDetails();
    fetchCourses();
  }, [id]);

  const fetchCourseDetails = async () => {
    const { success, data } = await getCourseById(id);
    if (success) {
      setCourseDetails(data);
    }
  };

  useEffect(() => {}, []);

  const fetchCourses = async () => {
    const { success, data } = await getCourses();
    if (success) {
      const dataOther = data.data.filter((item) => item.id !== parseInt(id));
      setCourseOther(dataOther);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, [id]);

  const fetchSchedules = async () => {
    const { success, data } = await getSchedulesByCourseId(id);
    if (success) {
      setSchedules(data);
    }
  };

  return (
    <div className="CourseDetails-container">
      <div className="CourseDetails-content col-8">
        <div className="CourseDetails-content-title">
          <span>Khóa học</span>
        </div>
        <div className="CourseDetails-content-item p-3">
          <h4 className="CourseDetails-content-item-title">
            {courseDetails.name}
          </h4>
          <p className="CourseDetails-content-item-description">
            {courseDetails.sub_description}
          </p>
          <img
            src={`${baseUrlImage}${courseDetails?.image}`}
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

        <div className="CourseDetails-content-schedule p-3">
          <TableSchedule course={courseDetails} schedules={schedules} />
        </div>
      </div>
      <div className="CourseDetails-more col-4">
        <div className="CourseDetails-more-title">
          <span>Các khóa học khác</span>
        </div>
        {courseOther.map((course, index) => (
          <NavLink
            to={`/courses/${course?.id}`}
            style={{ textDecoration: "none" }}
            className="CourseDetails-more-item row"
            key={course?.id}
          >
            <div className="CourseDetails-more-item-image col-5">
              <img src={`${baseUrlImage}${course?.image}`} alt="" />
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
