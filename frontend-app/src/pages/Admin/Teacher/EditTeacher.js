import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getCategories } from "../../../services/CategoryService";
import { getTeacherById } from "../../../services/TeacherService";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl, baseUrlImage } from "../../../config";
import { toast } from "react-toastify";

export default function EditTeacher() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [teacher, setTeacher] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

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
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { success, data } = await getCategories();
    if (success) {
      setCategories(data.data);
    }
  };

  useEffect(() => {
    fetchTeacher();
  }, []);

  const fetchTeacher = async () => {
    const { success, data } = await getTeacherById(id);
    if (success) {
      setTeacher(data);
    }
  };

  useEffect(() => {
    if (teacher) {
      setValue("image", teacher.image);
      setValue("full_name", teacher.full_name);
      setValue("email", teacher.email);
      setValue("gender", teacher.gender);
      setValue("phone", teacher.phone);
      setValue("address", teacher.address);
      setValue("description", teacher.description);
      setValue("degree", teacher.degree);
      setValue("experience", teacher.experience);
      setValue("category_id", teacher.category_id);
    }
  }, [teacher]);

  useEffect(() => {
    if (teacher && teacher.image) {
      setImagePreview(`${baseUrlImage}${teacher?.image}`);
    } else {
      setImagePreview(null);
    }
  }, [teacher, selectedImage]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("_method", "PUT");
    if (selectedImage) {
      formData.append("image", selectedImage);
    }
    formData.append("full_name", data.full_name);
    formData.append("email", data.email);
    formData.append("gender", data.gender);
    formData.append("phone", data.phone);
    formData.append("address", data.address);
    formData.append("description", data.description);
    formData.append("degree", data.degree);
    formData.append("experience", data.experience);
    formData.append("category_id", data.category_id);
    try {
      const response = await axios.post(
        "http://api.ngoaingutinhoc.tech.com/api/teachers/" + id,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.success) {
        navigate("/admin/teachers");
        toast.success("Sửa teacher thành công");
      }
    } catch (error) {
      console.error("Error uploading data", error);

      toast.error("Sửa teacher thất bại");
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
              Teacher
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
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="position-relative row form-group">
                  <label
                    htmlFor="image"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Ảnh đại diện
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <img
                      style={{ height: 100, width: 100, cursor: "pointer" }}
                      data-toggle="tooltip"
                      title="Click to change the image"
                      data-placement="bottom"
                      src={imagePreview ? imagePreview : "/add-image-icon.jpg"}
                      alt=""
                    />
                    <input
                      type="file"
                      accept="image/x-png,image/gif,image/jpeg"
                      {...register("image", {
                        required: "Hình ảnh bắt buộc phải chọn!",
                      })}
                      onChange={handleImageChange}
                      className="image form-control-file"
                      // style={{ display: "none" }}
                    />
                    <input type="hidden" name="image" />
                    <small className="form-text text-muted">
                      Click on the image to change (required)
                    </small>
                    {errors.image && (
                      <span className="text-danger">
                        {errors.image.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="position-relative row form-group">
                  <label
                    htmlFor="name"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Họ và tên
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <input
                      placeholder="Name"
                      type="text"
                      className="form-control"
                      {...register("full_name", {
                        required: "Họ và tên bắt buộc phải nhập!",
                        minLength: {
                          value: 3,
                          message: "Họ và tên phải phải có ít nhất 3 kí tự!",
                        },
                        maxLength: {
                          value: 255,
                          message: "Họ và tên không vượt quá 255 kí tự!",
                        },
                      })}
                    />
                    {errors.full_name && (
                      <span className="text-danger">
                        {errors.full_name.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="position-relative row form-group">
                  <label
                    htmlFor="index"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Giới tính
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <select
                      {...register("gender", {
                        required: "Giới tính bắt buộc phải chọn",
                      })}
                      className="form-select"
                    >
                      <option value="">Select Gender</option>
                      <option value={1}>Nam</option>
                      <option value={0}>Nữ</option>
                    </select>
                    {errors.gender && (
                      <span className="text-danger">
                        {errors.gender.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="position-relative row form-group">
                  <label
                    htmlFor="email"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Email
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <input
                      placeholder="Email"
                      type="email"
                      className="form-control"
                      {...register("email", {
                        required: "Email bắt buộc phải chọn!",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Email phải đúng định dạng!",
                        },
                      })}
                    />

                    {errors.email && (
                      <span className="text-danger">
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="position-relative row form-group">
                  <label
                    htmlFor="address"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Địa chỉ
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <input
                      type="text"
                      className="form-control"
                      {...register("address", {
                        required: "Địa chỉ bắt buộc phải nhập!",
                      })}
                    />

                    {errors.address && (
                      <span className="text-danger">
                        {errors.address.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="position-relative row form-group">
                  <label
                    htmlFor="phone"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Số điện thoại
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <input
                      placeholder="Phone"
                      type="text"
                      className="form-control"
                      {...register("phone", {
                        required: "Số điện thoại bắt buộc phải điền!",
                        pattern: {
                          value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
                          message: "Số điện thoại phải đúng định dạng",
                        },
                      })}
                    />

                    {errors.phone && (
                      <span className="text-danger">
                        {errors.phone.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="position-relative row form-group">
                  <label
                    htmlFor="experience"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Kinh nghiệm làm việc
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <input
                      placeholder="Experience"
                      type="text"
                      className="form-control"
                      {...register("experience", {
                        required: "Kinh nghiệm làm việc bắt buộc phải điền!",
                      })}
                    />

                    {errors.experience && (
                      <span className="text-danger">
                        {errors.experience.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="position-relative row form-group">
                  <label
                    htmlFor="degree"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Bằng cấp
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <input
                      placeholder="Degree"
                      type="text"
                      className="form-control"
                      {...register("degree", {
                        required: "Bằng cấp bắt buộc phải điền!",
                      })}
                    />

                    {errors.degree && (
                      <span className="text-danger">
                        {errors.degree.message}
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
                        required: "Chuyên môn bắt buộc phải điền!",
                      })}
                      className="form-select"
                    >
                      <option value="">Chọn chủ đề</option>
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

                <div className="position-relative row form-group mb-1">
                  <div className="col-md-9 col-xl-8 offset-md-2">
                    <NavLink
                      to="/admin/teachers"
                      className="border-0 btn btn-outline-danger mr-1"
                    >
                      <span className="btn-icon-wrapper pr-1 opacity-8">
                        <i className="fa fa-times fa-w-20" />
                      </span>
                      <span>Hủy</span>
                    </NavLink>
                    <button
                      type="submit"
                      className="btn-shadow btn-hover-shine btn btn-primary"
                    >
                      <span className="btn-icon-wrapper pr-2 opacity-8">
                        <i className="fa fa-download fa-w-20" />
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
