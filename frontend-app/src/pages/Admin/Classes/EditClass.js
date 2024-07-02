import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { getClassById } from "../../../services/ClassService";
import { getTeachers } from "../../../services/TeacherService";
import { getCourses } from "../../../services/CourseService";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

export default function EditClass() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [classData, setClassData] = useState(null);
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    fetchTeachers();
    fetchCourses();
    fetchClass();
  }, []);

  useEffect(() => {
    if (classData) {
      setValue("name", classData.name);
      setValue("teacher_id", classData.teacher_id);
      setValue("course_id", classData.course_id);
      setValue("status", classData.status === "active" ? true : false);
    }
  }, [classData]);

  const fetchClass = async () => {
    const { success, data } = await getClassById(id);
    if (success) {
      setClassData(data);
    }
  };

  const fetchCourses = async () => {
    const { success, data } = await getCourses();
    if (success) {
      setCourses(data.data);
    }
  };

  const fetchTeachers = async () => {
    const { success, data } = await getTeachers();
    if (success) {
      setTeachers(data.data);
    }
  };
  const onSubmit = async (dataClass) => {
    const dataUpdate = {
      name: dataClass.name,
      teacher_id: dataClass.teacher_id,
      course_id: dataClass.course_id,
      status: dataClass.status ? "active" : "inactive",
    };
    const res = await axios.put(
      `http://api.ngoaingutinhoc.tech.com/api/classes/${id}`,
      dataUpdate
    );
    // console.log("success", res);
    if (res.data.success) {
      navigate("/admin/classes");
      toast.success("Cập nhật class thành công");
    } else {
      toast.error("Cập nhật class thất bại");
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
                    htmlFor="title"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Name
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <input
                      {...register("name")}
                      id="title"
                      placeholder="Name"
                      type="text"
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="position-relative row form-group">
                  <label
                    htmlFor="index"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Khóa học
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <select {...register("course_id")} className="form-select">
                      <option value="">Select Course</option>
                      {courses.map((course) => (
                        <option key={course.id} value={course.id}>
                          {course?.name}
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
                <div className="position-relative row form-group d-flex align-items-center">
                  <label
                    htmlFor="status"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Trạng thái
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <input
                      {...register("status")}
                      type="checkbox"
                      value={1}
                      defaultValue={0}
                    />
                  </div>
                </div>

                <div class="position-relative row form-group mb-1">
                  <div class="col-md-9 col-xl-8 offset-md-2">
                    <NavLink
                      // onClick={() => navigate(-1)}
                      to="/admin/classes"
                      className="border-0 btn btn-outline-danger mr-1"
                    >
                      <span className="btn-icon-wrapper pr-1 opacity-8">
                        <i className="fa fa-times fa-w-20"></i>
                      </span>
                      <span>Hủy</span>
                    </NavLink>

                    <button
                      type="submit"
                      class="btn-shadow btn-hover-shine btn btn-primary"
                    >
                      <span class="btn-icon-wrapper pr-2 opacity-8">
                        <i class="fa fa-download fa-w-20"></i>
                      </span>
                      <span>Lưu</span>
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
