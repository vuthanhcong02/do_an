import React, { useEffect, useState } from "react";
import { useNavigate, NavLink, useParams } from "react-router-dom";
import { createBanner, showBanner } from "../../../services/BannerService";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl, baseUrlImage } from "../../../config";
import { toast } from "react-toastify";

export default function EditBanner() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [banner, setBanner] = useState(null);
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
    fetchBanner();
  }, []);
  const fetchBanner = async () => {
    const { success, data } = await showBanner(id);
    if (success) {
      console.log(data);
      setBanner(data);
    }
  };

  useEffect(() => {
    if (banner) {
      setValue("image", banner.image);
      setValue("title", banner.title);
      setValue("position", banner.position);
      setValue("status", banner.status);
    }
  }, [banner]);

  useEffect(() => {
    if (banner && banner.image) {
      setImagePreview(`${baseUrlImage}${banner?.image}`);
    } else {
      setImagePreview(null);
    }
  }, [banner, selectedImage]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("_method", "PUT");
    if (selectedImage) {
      formData.append("image", selectedImage);
    }
    formData.append("title", data.title);
    formData.append("position", data.position);
    formData.append("status", data.status ? 1 : 0);

    try {
      const response = await axios.post(
        "http://api.ngoaingutinhoc.tech.com/api/banners/" + id,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.success) {
        toast.success("Cập nhật banner thành công");
        navigate("/admin/banners");
      }
    } catch (error) {
      console.error("Error uploading data", error);
      toast.error("Cập nhật banner thất bại");
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
                      src={
                        imagePreview
                          ? imagePreview
                          : `${baseUrl}/images/no-image.png`
                      }
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
                    Tiêu đề
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <input
                      {...register("title", {
                        required: "Tiêu đề không được để trống",
                        maxLength: {
                          value: 255,
                          message: "Tiêu đề không lớn hơn 255 kí tự",
                        },
                        minLength: {
                          value: 3,
                          message: "Tiêu đề không nhỏ hơn 3 kí tự",
                        },
                      })}
                      id="title"
                      placeholder="Title"
                      type="text"
                      className="form-control"
                    />
                    {errors.title && (
                      <small className="form-text text-danger">
                        {errors.title.message}
                      </small>
                    )}
                  </div>
                </div>
                <div className="position-relative row form-group">
                  <label
                    htmlFor="index"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Thứ tự xuất hiện
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <input
                      {...register("position", {
                        required: "Số thứ tự không được bỏ trống",
                        valueAsNumber: true,
                      })}
                      placeholder="Số thứ tự"
                      type="text"
                      className="form-control"
                      width="20px"
                    />
                    {errors.position && (
                      <small className="form-text text-danger">
                        {errors.position.message}
                      </small>
                    )}
                  </div>
                </div>
                <div className="position-relative row form-group d-flex align-items-center">
                  <label
                    htmlFor="status"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Hiển thị
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <input
                      {...register("status", { valueAsNumber: true })}
                      type="checkbox"
                    />
                  </div>
                  {errors.status && (
                    <small className="form-text text-danger">
                      {errors.status.message}
                    </small>
                  )}
                </div>
                <div class="position-relative row form-group mb-1">
                  <div class="col-md-9 col-xl-8 offset-md-2">
                    <NavLink
                      // onClick={() => navigate(-1)}
                      to="/admin/banners"
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
