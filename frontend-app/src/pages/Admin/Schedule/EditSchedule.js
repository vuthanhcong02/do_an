import React, { useEffect, useState } from "react";
import { useNavigate, NavLink, useParams } from "react-router-dom";
import { getClasses, getClassesByCourse } from "../../../services/ClassService";
import { getTeachers } from "../../../services/TeacherService";
import { getClassRooms } from "../../../services/ClassRoomService";
import { createSchedule } from "../../../services/ScheduleService";
import { getScheduleById } from "../../../services/ScheduleService";
import { getCourses } from "../../../services/CourseService";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

export default function CreateClass() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [schedule, setSchedule] = useState(null);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState();

  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    fetchTeachers();
  }, []);

  useEffect(() => {
    fetchClassrooms();
  }, []);

  useEffect(() => {
    fetchSchedule();
  }, []);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const { success, data } = await getCourses();
    if (success) {
      setCourses(data.data);
    }
  };

  const fetchSchedule = async () => {
    const { success, data } = await getScheduleById(id);
    if (success) {
      // console.log("schedule", data);
      setSchedule(data);
    }
  };

  // console.log("schedule", schedule?.course?.id);
  useEffect(() => {
    if (schedule) {
      setValue("course_id", schedule?.course?.id);
      setValue("classroom_id", schedule?.classroom?.id);
      setValue("teacher_id", schedule?.teacher?.id);
      setValue("day_of_week", schedule.day_of_week);
      setValue("start_end_time", schedule.start_end_time);
    }
  }, [schedule]);

  useEffect(() => {
    if (selectedCourse) {
      fetchClasses(selectedCourse);
    } else {
      fetchClasses(schedule?.course?.id);
    }
  }, [selectedCourse, schedule]);
  const fetchClasses = async (courseId) => {
    console.log("courseId", courseId);
    const { success, data } = await getClassesByCourse(courseId);
    if (success) {
      setValue("class_id", data[0]?.id);
      setClasses(data);
    }
  };
  const fetchClassrooms = async () => {
    const { success, data } = await getClassRooms();
    if (success) {
      setClassrooms(data.data);
    }
  };
  const fetchTeachers = async () => {
    const { success, data } = await getTeachers();
    if (success) {
      setTeachers(data.data);
    }
  };
  const onSubmit = async (dataSchedule) => {
    const dataUpdate = {
      course_id: dataSchedule.course_id,
      class_id: dataSchedule.class_id,
      classroom_id: dataSchedule.classroom_id,
      teacher_id: dataSchedule.teacher_id,
      day_of_week: dataSchedule.day_of_week,
      start_end_time: dataSchedule.start_end_time,
    };
    const res = await axios.put(
      `http://api.ngoaingutinhoc.tech.com/api/schedules/${id}`,
      dataUpdate
    );
    // console.log("success", res);
    if (res.data.success) {
      navigate("/admin/schedules");
      toast.success("Cập nhật schedule thành công");
    } else {
      toast.error("Cập nhật schedule thất bại");
    }
  };

  return (
    <div className="app-main__inner">
      <div className="app-page-title">
        <div className="page-title-wrapper">
          <div className="page-title-heading">
            <div className="page-title-icon">
              <i className="pe-7s-ticket icon-gradient bg-mean-fruit" />
            </div>
            <div>
              Class
              <div className="page-title-subheading">
                View, create, update, delete and manage.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="main-card mb-3 card">
            <div className="card-body">
              <form
                onSubmit={handleSubmit(onSubmit)}
                encType="multipart/form-data"
              >
                <div className="position-relative row form-group">
                  <label
                    htmlFor="index"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Khóa học
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <select
                      {...register("course_id")}
                      className="form-select"
                      onChange={(e) => {
                        console.log(e.target.value);
                        setSelectedCourse(e.target.value);
                      }}
                    >
                      <option value="">Select Courses</option>
                      {courses.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item?.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="position-relative row form-group">
                  <label
                    htmlFor="index"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Lớp học
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <select {...register("class_id")} className="form-select">
                      <option value="">Select Class</option>
                      {classes.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item?.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="position-relative row form-group">
                  <label
                    htmlFor="index"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Phòng học
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <select
                      {...register("classroom_id")}
                      className="form-select"
                    >
                      <option value="">Select ClassRoom</option>
                      {classrooms.map((classroom) => (
                        <option key={classroom.id} value={classroom.id}>
                          {classroom?.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="position-relative row form-group">
                  <label
                    htmlFor="index"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Giáo viên phụ trách
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <select {...register("teacher_id")} className="form-select">
                      <option value="">Select Teacher</option>
                      {teachers.map((teacher) => (
                        <option key={teacher.id} value={teacher.id}>
                          {teacher.full_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="position-relative row form-group">
                  <label
                    htmlFor="index"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Ngày học
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <select
                      {...register("day_of_week")}
                      className="form-select"
                    >
                      <option value="">Select Date</option>
                      <option value="2-4-6">Thứ 2-4-6</option>
                      <option value="3-5-7">Thứ 3-5-7</option>
                      <option value="7-Chủ nhật">Thứ 7-Chủ nhật</option>
                    </select>
                  </div>
                </div>

                <div className="position-relative row form-group">
                  <label
                    htmlFor="index"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Ca học
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <select
                      {...register("start_end_time")}
                      className="form-select"
                    >
                      <option value="">Select Time</option>
                      <option value="7h30-9h30">7h30-9h30</option>
                      <option value="9h30-11h30">9h30-11h30</option>
                      <option value="13h30-15h30">13h30-15h30</option>
                      <option value="15h30-17h30">15h30-17h30</option>
                      <option value="17h30-19h30">17h30-19h30</option>
                      <option value="19h30-21h30">19h30-21h30</option>
                    </select>
                  </div>
                </div>

                <div class="position-relative row form-group mb-1">
                  <div class="col-md-9 col-xl-8 offset-md-2">
                    <NavLink
                      // onClick={() => navigate(-1)}
                      to="/admin/schedules"
                      className="border-0 btn btn-outline-danger mr-1"
                    >
                      <span className="btn-icon-wrapper pr-1 opacity-8">
                        <i className="fa fa-times fa-w-20"></i>
                      </span>
                      <span>Cancel</span>
                    </NavLink>

                    <button
                      type="submit"
                      class="btn-shadow btn-hover-shine btn btn-primary"
                    >
                      <span class="btn-icon-wrapper pr-2 opacity-8">
                        <i class="fa fa-download fa-w-20"></i>
                      </span>
                      <span>Save</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
