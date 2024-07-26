import React, { useEffect, useState } from "react";
import { useNavigate, NavLink, useParams } from "react-router-dom";
import { createBanner } from "../../../services/BannerService";
import { getCategories } from "../../../services/CategoryService";
import { getTeachers } from "../../../services/TeacherService";
import { getCourseBySlug } from "../../../services/CourseService";
import httpClient from "../../../utils/axiosCustom";
import { useForm } from "react-hook-form";
import axios from "axios";
import ReactQuill from "react-quill";
import { baseUrl, baseUrlImage } from "../../../config";
import { toast } from "react-toastify";

export default function EditCourse() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [course, setCourse] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

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
  }, [slug]);

  const fetchCourse = async () => {
    const { success, data } = await getCourseBySlug(slug);
    if (success) {
      setCourse(data);
    }
  };

  useEffect(() => {
    if (course) {
      setValue("id", course.id);
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
      setValue("deadline_date", course.deadline_date);
    }
  }, [course]);
  useEffect(() => {
    if (course && course.image) {
      setImagePreview(`${baseUrlImage}${course?.image}`);
    } else {
      setImagePreview(null);
    }
  }, [course, selectedImage]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("_method", "PUT");
    if (selectedImage) {
      formData.append("image", selectedImage);
    }
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
    formData.append("deadline_date", data.deadline_date);
    console.log("data", data);
    try {
      const response = await axios.post(
        "http://api.ngoaingutinhoc.tech.com/api/courses/" + data.id,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.success) {
        navigate("/admin/courses");
        toast.success("Cập nhật course thành công");
      }
    } catch (error) {
      console.error("Error uploading data", error);
      toast.error("Cập nhật course thất bại");
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
                <input type="hidden" name="id" {...register("id")} />
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
                      Click on the image to change
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
                      {...register("name", {
                        required: "Tên khóa học bắt buộc phải nhập!",
                        maxLength: {
                          value: 255,
                          message: "Tên khóa học không dài quá 255 kí tự",
                        },
                        minLength: {
                          value: 3,
                          message: "Tên khóa học phải ít nhất 3 kí tự",
                        },
                      })}
                      id="title"
                      placeholder="Title"
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
                    htmlFor="content"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Nội dung
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
                      {...register("min_student", {
                        required: "Số học sinh tối thiểu bắt buộc phải điền!",
                        minValue: {
                          value: 1,
                          message: "Số học sinh tối thiểu phải ít nhất là 1",
                        },
                        maxValue: {
                          value: 5,
                          message: "Số học sinh thiểu không quá 5",
                        },
                      })}
                      type="text"
                      className="form-control"
                      width="20px"
                    />
                    {errors.min_student && (
                      <span className="text-danger">
                        {errors.min_student.message}
                      </span>
                    )}
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
                      {...register("max_student", {
                        required: "Số học sinh tối đa bắt buộc phải điền!",
                        minValue: {
                          value: 10,
                          message: "Số học sinh tối đa ít nhất là 10",
                        },
                        maxValue: {
                          value: 50,
                          message: "Số học sinh tối đa không quá 50",
                        },
                      })}
                      type="text"
                      className="form-control"
                      width="20px"
                    />
                    {errors.max_student && (
                      <span className="text-danger">
                        {errors.max_student.message}
                      </span>
                    )}
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
                      {...register("start_date", {
                        required: "Ngày bắt đầu bắt buộc phải chọn!",
                      })}
                      placeholder="Số thứ tự"
                      type="date"
                      className="form-control"
                      width="20px"
                    />
                    {errors.start_date && (
                      <span className="text-danger">
                        {errors.start_date.message}
                      </span>
                    )}
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
                      {...register("end_date", {
                        required: "Ngày kết thúc bắt buộc phải chọn!",
                      })}
                      placeholder="Số thứ tự"
                      type="date"
                      className="form-control"
                      width="20px"
                    />
                    {errors.end_date && (
                      <span className="text-danger">
                        {errors.end_date.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="position-relative row form-group">
                  <label
                    htmlFor="index"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Chuyên môn
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <select
                      {...register("category_id", {
                        required: "Chuyên môn bắt buộc phải chọn!",
                      })}
                      className="form-select"
                    >
                      <option value="">Select Subject</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    {errors.category_id && (
                      <span className="text-danger">
                        {errors.category_id.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="position-relative row form-group d-flex align-items-center">
                  <label
                    htmlFor="status"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Thời gian diễn ra khóa học
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <input
                      {...register("duration", {
                        required: "Duration bắt buộc phải nhập!",
                      })}
                      type="text"
                      className="form-control"
                    />
                    {errors.duration && (
                      <span className="text-danger">
                        {errors.duration.message}
                      </span>
                    )}
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
                      {...register("price", {
                        required: "Giá bắt buộc phải điền!",
                        valueAsNumber: true,
                      })}
                      type="text"
                      className="form-control"
                    />
                    {errors.price && (
                      <span className="text-danger">
                        {errors.price.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="position-relative row form-group">
                  <label
                    htmlFor="index"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Ngày hết hạn đóng học phí
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <input
                      {...register("deadline_date", {
                        required: "Ngày hết học phí bắt buộc phải điền!",
                      })}
                      placeholder="Số thứ tự"
                      type="date"
                      className="form-control"
                      width="20px"
                    />
                    {errors.deadline_date && (
                      <span className="text-danger">
                        {errors.deadline_date.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="position-relative row form-group d-flex align-items-center">
                  <label
                    htmlFor="status"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Giảm giá
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

                <div className="position-relative row form-group d-flex align-items-center">
                  <label
                    htmlFor="status"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Nổi bật
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
                    <NavLink
                      // onClick={() => navigate(-1)}
                      to="/admin/courses"
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
