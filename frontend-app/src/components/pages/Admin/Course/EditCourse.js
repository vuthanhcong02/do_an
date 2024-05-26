import React, { useEffect, useState } from "react";
import { useNavigate, NavLink, useParams } from "react-router-dom";
import { createBanner } from "../../../../services/BannerService";
import { getCategories } from "../../../../services/CategoryService";
import { getTeachers } from "../../../../services/TeacherService";
import { getCourseById } from "../../../../services/CourseService";
import httpClient from "../../../../utils/axiosCustom";
import { useForm } from "react-hook-form";
import axios from "axios";
import ReactQuill from "react-quill";
import { baseUrl } from "../../../../config";

export default function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [course, setCourse] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { success, data } = await getCategories();
    if (success) {
      setCategories(data.data);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    const { success, data } = await getTeachers();
    if (success) {
      setTeachers(data.data);
    }
  };
  const handleImageChange = (event) => {
    const image = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    setSelectedImage(event.target.files[0]);
  };

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    const { success, data } = await getCourseById(id);
    if (success) {
      setCourse(data);
    }
  };

  useEffect(() => {
    if (course) {
      setValue("image", course.image);
      setValue("name", course.name);
      setValue("slug", course.slug);
      setValue("min_student", course.min_student);
      setValue("max_student", course.max_student);
      setValue("duration", course.duration);
      setValue("category_id", course.category_id);
      setValue("teacher_id", course.teacher_id);
      setValue("start_date", course.start_date);
      setValue("end_date", course.end_date);
      setValue("price", course.price);
      setValue("discount", course.discount);
      setValue("featured", course.featured);
      setValue("status", course.status);
      setDescription(course.description);
    }
  }, [course]);
  useEffect(() => {
    if (course && course.image) {
      setImagePreview(`${baseUrl}${course.image}`);
    } else {
      setImagePreview(null);
    }
  }, [course, selectedImage]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("image", selectedImage);
    formData.append("name", data.name);
    formData.append("description", description);
    formData.append("slug", data.slug);
    formData.append("min_student", data.min_student);
    formData.append("max_student", data.max_student);
    formData.append("duration", data.duration);
    formData.append("category_id", data.category_id);
    formData.append("teacher_id", data.teacher_id);
    formData.append("start_date", data.start_date);
    formData.append("end_date", data.end_date);
    formData.append("price", data.price);
    formData.append("discount", data.discount);
    formData.append("featured", data.featured ? 1 : 0);
    formData.append("status", data.status ? 1 : 0);

    try {
      const response = await axios.post(
        "http://api.ngoaingutinhoc.tech.com/api/courses/" + id,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.success) {
        navigate("/admin/courses");
      }
    } catch (error) {
      console.error("Error uploading data", error);
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
              Banner
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
                    htmlFor="image"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Image
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <img
                      style={{ height: 200, width: 450, cursor: "pointer" }}
                      data-toggle="tooltip"
                      title="Click to change the image"
                      data-placement="bottom"
                      src={imagePreview ? imagePreview : "/add-image-icon.jpg"}
                      alt=""
                    />
                    <input
                      type="file"
                      accept="image/x-png,image/gif,image/jpeg"
                      {...register("image")}
                      onChange={handleImageChange}
                      className="image form-control-file"
                      // style={{ display: "none" }}
                    />
                    <input type="hidden" name="image" />
                    <small className="form-text text-muted">
                      Click on the image to change (required)
                    </small>
                  </div>
                </div>

                <div className="position-relative row form-group">
                  <label
                    htmlFor="title"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Tên khóa học
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <input
                      {...register("name")}
                      id="title"
                      placeholder="Title"
                      type="text"
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="position-relative row form-group">
                  <label
                    htmlFor="content"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Content
                  </label>
                  <div className="col-md-9 col-xl-8 mb-5">
                    <ReactQuill
                      theme="snow"
                      style={{ height: "400px" }}
                      onChange={(e) => {
                        setDescription(e);
                      }}
                      value={description}
                    />
                  </div>
                </div>

                <div className="position-relative row form-group">
                  <label
                    htmlFor="index"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Sĩ số tối thiểu
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <input
                      {...register("min_student")}
                      type="text"
                      className="form-control"
                      width="20px"
                    />
                  </div>
                </div>

                <div className="position-relative row form-group">
                  <label
                    htmlFor="index"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Sĩ số tối đa
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <input
                      {...register("max_student")}
                      type="text"
                      className="form-control"
                      width="20px"
                    />
                  </div>
                </div>

                <div className="position-relative row form-group">
                  <label
                    htmlFor="index"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Ngày bắt đầu
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <input
                      {...register("start_date")}
                      placeholder="Số thứ tự"
                      type="date"
                      className="form-control"
                      width="20px"
                    />
                  </div>
                </div>

                <div className="position-relative row form-group">
                  <label
                    htmlFor="index"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Ngày kết thúc
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <input
                      {...register("end_date")}
                      placeholder="Số thứ tự"
                      type="date"
                      className="form-control"
                      width="20px"
                    />
                  </div>
                </div>

                <div className="position-relative row form-group">
                  <label
                    htmlFor="index"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Subject
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <select
                      {...register("category_id")}
                      className="form-select"
                    >
                      <option value="">Select Subject</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
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
                    Duration
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <input
                      {...register("duration")}
                      type="text"
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="position-relative row form-group d-flex align-items-center">
                  <label
                    htmlFor="status"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Giá
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <input
                      {...register("price")}
                      type="text"
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="position-relative row form-group d-flex align-items-center">
                  <label
                    htmlFor="status"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Discount
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <input
                      {...register("discount")}
                      type="text"
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="position-relative row form-group d-flex align-items-center">
                  <label
                    htmlFor="status"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Slug
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <input
                      {...register("slug")}
                      type="text"
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="position-relative row form-group d-flex align-items-center">
                  <label
                    htmlFor="status"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Status
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

                <div className="position-relative row form-group d-flex align-items-center">
                  <label
                    htmlFor="status"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Featured
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <input
                      {...register("featured")}
                      type="checkbox"
                      value={1}
                      defaultValue={0}
                    />
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
