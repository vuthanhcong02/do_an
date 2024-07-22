import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { makeClass } from "../../../services/ClassService";
import { getTeachers } from "../../../services/TeacherService";
import { getCourses } from "../../../services/CourseService";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function CreateClass() {
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetchTeachers();
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

  const fetchTeachers = async () => {
    const { success, data } = await getTeachers();
    if (success) {
      setTeachers(data.data);
    }
  };
  const onSubmit = async (dataClass) => {
    const dataCreate = {
      name: dataClass.name,
      teacher_id: dataClass.teacher_id,
      course_id: dataClass.course_id,
      status: dataClass.status ? "active" : "inactive",
    };
    const { success } = await makeClass(dataCreate);
    if (success) {
      navigate("/admin/classes");
      toast.success("Tạo class thành công");
    } else {
      toast.error("Tạo class thất bại");
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
                    Tên
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <input
                      {...register("name", {
                        required: "Tên bắt buộc phải nhập",
                        maxLength: {
                          value: 255,
                          message: "Tên tối đa 255 ky tự",
                        },
                        minLength: {
                          value: 2,
                          message: "Tên tối thiểu 2 ký tự",
                        },
                      })}
                      id="title"
                      placeholder="Name"
                      type="text"
                      className="form-control"
                    />

                    {errors.name && (
                      <span className="text-danger">{errors.name.message}</span>
                    )}
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
                    <select
                      {...register("course_id", {
                        required: "Vui lý chọn khóa học",
                        validate: (value) => value !== "",
                      })}
                      className="form-select"
                    >
                      <option value="">Select Course</option>
                      {courses.map((course) => (
                        <option key={course.id} value={course.id}>
                          {course?.name}
                        </option>
                      ))}
                    </select>
                    {errors.course_id && (
                      <span className="text-danger">
                        {errors.course_id.message}
                      </span>
                    )}
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
                    <select
                      {...register("teacher_id", {
                        required: "Vui lý chọn giáo viên phụ trách",
                        validate: (value) => value !== "",
                      })}
                      className="form-select"
                    >
                      <option value="">Select Teacher</option>
                      {teachers.map((teacher) => (
                        <option key={teacher.id} value={teacher.id}>
                          {teacher.full_name}
                        </option>
                      ))}
                    </select>
                    {errors.teacher_id && (
                      <span className="text-danger">
                        {errors.teacher_id.message}
                      </span>
                    )}
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
