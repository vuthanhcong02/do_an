import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { getClasses, getClassesByCourse } from "../../../services/ClassService";
import { getTeachers } from "../../../services/TeacherService";
import { getClassRooms } from "../../../services/ClassRoomService";
import { createSchedule } from "../../../services/ScheduleService";
import { getCourses } from "../../../services/CourseService";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function CreateClass() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState();
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    fetchTeachers();
    fetchClassrooms();
    fetchCourses();
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      fetchClasses();
    }
  }, [selectedCourse]);

  const fetchCourses = async () => {
    const { success, data } = await getCourses();
    if (success) {
      setCourses(data.data);
    }
  };

  const fetchClasses = async () => {
    const { success, data } = await getClassesByCourse(selectedCourse);
    if (success) {
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
  const onSubmit = async (dataClass) => {
    const dataCreate = {
      class_id: dataClass.class_id,
      classroom_id: dataClass.classroom_id,
      teacher_id: dataClass.teacher_id,
      course_id: dataClass.course_id,
      day_of_week: dataClass.day_of_week,
      start_end_time: dataClass.start_end_time,
    };
    const { success } = await createSchedule(dataCreate);
    if (success) {
      navigate("/admin/schedules");
      toast.success("Tạo schedule thành công");
    } else {
      toast.error("Tạo schedule thất bại");
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
                    <button
                      onClick={() => navigate(-1)}
                      class="border-0 btn btn-outline-danger mr-1"
                    >
                      <span class="btn-icon-wrapper pr-1 opacity-8">
                        <i class="fa fa-times fa-w-20"></i>
                      </span>
                      <span>Cancel</span>
                    </button>

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
