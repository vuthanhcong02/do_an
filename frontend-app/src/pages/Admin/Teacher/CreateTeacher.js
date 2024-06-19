import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getCategories } from "../../../services/CategoryService";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function CreateTeacher() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [categories, setCategories] = useState([]);

  const { register, handleSubmit } = useForm();

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

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("image", selectedImage);
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
        "http://api.ngoaingutinhoc.tech.com/api/teachers",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.success) {
        navigate("/admin/teachers");
        toast.success("Tạo teacher thành công");
      }
    } catch (error) {
      console.error("Error uploading data", error);
      toast.error("Tạo teacher thất bại");
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
                      {...register("full_name")}
                    />
                  </div>
                </div>

                <div className="position-relative row form-group">
                  <label
                    htmlFor="index"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Gender
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <select {...register("gender")} className="form-select">
                      <option value="">Select Gender</option>
                      <option value={1}>Nam</option>
                      <option value={0}>Nữ</option>
                    </select>
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
                      {...register("email")}
                    />
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
                      {...register("address")}
                    />
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
                      {...register("phone")}
                    />
                  </div>
                </div>
                <div className="position-relative row form-group">
                  <label
                    htmlFor="experience"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Experience
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <input
                      placeholder="Experience"
                      type="text"
                      className="form-control"
                      {...register("experience")}
                    />
                  </div>
                </div>
                <div className="position-relative row form-group">
                  <label
                    htmlFor="degree"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Degree
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <input
                      placeholder="Degree"
                      type="text"
                      className="form-control"
                      {...register("degree")}
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

                <div className="position-relative row form-group mb-1">
                  <div className="col-md-9 col-xl-8 offset-md-2">
                    <NavLink
                      to="/admin/teachers"
                      className="border-0 btn btn-outline-danger mr-1"
                    >
                      <span className="btn-icon-wrapper pr-1 opacity-8">
                        <i className="fa fa-times fa-w-20" />
                      </span>
                      <span>Cancel</span>
                    </NavLink>
                    <button
                      type="submit"
                      className="btn-shadow btn-hover-shine btn btn-primary"
                    >
                      <span className="btn-icon-wrapper pr-2 opacity-8">
                        <i className="fa fa-download fa-w-20" />
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
