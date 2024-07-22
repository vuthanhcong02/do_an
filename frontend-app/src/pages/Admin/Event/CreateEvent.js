import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { toast } from "react-toastify";

export default function CreateEvent() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");
  const {
    register,
    handleSubmit,
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

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("image", selectedImage);
    formData.append("name", data.name);
    formData.append("description", description);
    formData.append("location", data.location);
    formData.append("start_date", data.start_date);
    formData.append("start_time", data.start_time);
    formData.append("end_time", data.end_time);
    formData.append("status", data.featured ? 1 : 0);

    // console.log(data, content);
    try {
      const response = await axios.post(
        "http://api.ngoaingutinhoc.tech.com/api/events",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response?.data?.success) {
        navigate("/admin/events");
        toast.success("Tạo event thành công");
      }
    } catch (error) {
      console.error("Error uploading data", error);
      toast.error("Tạo event thất bại");
    }
  };

  return (
    <div className="app-main__inner">
      <div className="app-page-title">
        <div className="page-title-wrapper">
          <div className="page-title-heading">
            <div className="page-title-icon">
              <i className="pe-7s-ticket icon-gradient bg-mean-fruit"></i>
            </div>
            <div>
              News
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
                    Hình ảnh
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
                      <div className="invalid-feedback">
                        {errors.image.message}
                      </div>
                    )}
                  </div>
                </div>

                <div className="position-relative row form-group">
                  <label
                    htmlFor="title"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Tiêu đề
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <input
                      {...register("name", {
                        required: "Tên bắt buộc phải nhập!",
                        minLength: {
                          value: 3,
                          message: "Tên phải nhất 3 kí tự",
                        },
                        maxLength: {
                          value: 255,
                          message: "Tên phải không quá 255 kí tự",
                        },
                      })}
                      placeholder="Title"
                      type="text"
                      className="form-control"
                    />
                    {errors.name && <span>{errors.name.message}</span>}
                  </div>
                </div>

                <div className="position-relative row form-group">
                  <label
                    htmlFor="content"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Mô tả
                  </label>
                  <div className="col-md-9 col-xl-8 mb-5">
                    <ReactQuill
                      theme="snow"
                      style={{ height: "400px" }}
                      onChange={(e) => {
                        setDescription(e);
                      }}
                    />
                  </div>
                </div>

                <div className="position-relative row form-group">
                  <label
                    htmlFor="title"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Địa điểm
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <input
                      placeholder="Location"
                      type="text"
                      className="form-control"
                      {...register("location", {
                        required: "Địa điểm bắt buộc phải điền!",
                        minLength: {
                          value: 3,
                          message: "Tên địa điểm phải ít nhất 3 kí tự",
                        },
                        mexLength: {
                          value: 255,
                          message: "Tên địa điểm không quá 255 kí tự",
                        },
                      })}
                    />
                    {errors?.location && (
                      <span>{errors?.location.message}</span>
                    )}
                  </div>
                </div>

                <div className="position-relative row form-group">
                  <label
                    htmlFor="title"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Ngày diễn ra
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <input
                      placeholder="Start Date"
                      type="date"
                      className="form-control"
                      {...register("start_date", {
                        required: "Ngày diễn ra bắt buộc phải chọn!",
                      })}
                    />
                    {errors?.start_date && (
                      <span>{errors?.start_date.message}</span>
                    )}
                  </div>
                </div>

                <div className="position-relative row form-group">
                  <label
                    htmlFor="title"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Thời gian bắt đầu
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <input
                      placeholder="Start Date"
                      type="time"
                      className="form-control"
                      {...register("start_time", {
                        required: "Thời gian bắt đầu bắt buộc phải chọn!",
                      })}
                    />
                    {errors?.start_time && (
                      <span>{errors?.start_time.message}</span>
                    )}
                  </div>
                </div>

                <div className="position-relative row form-group">
                  <label
                    htmlFor="title"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Thời gian kết thúc
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <input
                      placeholder="End Date"
                      type="time"
                      className="form-control"
                      {...register("end_time", {
                        required: "Thời gian kết thúc bắt buộc phải chọn!",
                      })}
                    />
                    {errors?.end_time && (
                      <span>{errors?.end_time.message}</span>
                    )}
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
                      {...register("status")}
                      type="checkbox"
                      value={1}
                      defaultValue={0}
                    />
                  </div>
                </div>
                <div className="position-relative row form-group mb-1">
                  <div className="col-md-9 col-xl-8 offset-md-2">
                    <NavLink
                      // onClick={() => navigate(-1)}
                      to="/admin/events"
                      className="border-0 btn btn-outline-danger mr-1"
                    >
                      <span className="btn-icon-wrapper pr-1 opacity-8">
                        <i className="fa fa-times fa-w-20"></i>
                      </span>
                      <span>Hủy</span>
                    </NavLink>

                    <button
                      type="submit"
                      className="btn-shadow btn-hover-shine btn btn-primary"
                    >
                      <span className="btn-icon-wrapper pr-2 opacity-8">
                        <i className="fa fa-download fa-w-20"></i>
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
