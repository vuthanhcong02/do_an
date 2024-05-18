import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { createBanner } from "../../../../services/BannerService";
export default function CreateBanner() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [selectedImage, setSelectedImage] = useState(
    "https://picsum.photos/900"
  );

  const handleImageChange = (event) => {
    const image = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };
    setSelectedImage(image);
  };

  const onSubmit = async (data) => {
    console.log(data);
    const res = await createBanner(data);
    if (res.success === true) {
      navigate("/admin/banners");
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
                {/* <div className="position-relative row form-group">
                  <label
                    htmlFor="image"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Hình ảnh
                  </label>
                  <div className="col-md-9 col-xl-8 d-flex flex-lg-column">
                    {selectedImage && (
                      <img
                        src={selectedImage}
                        alt=""
                        style={{ width: 200, height: 200 }}
                      />
                    )}
                  </div>
                  <div
                    className="col-md-9 col-xl-8"
                    style={{ marginTop: 20, marginLeft: 70 }}
                  >
                    <div className="d-flex flex-column align-items-center justify-content-center">
                      <label className="label">
                        <input
                          type="file"
                          onChange={handleImageChange}
                          accept="image/x-png,image/gif,image/jpeg"
                        />
                      </label>
                    </div>
                  </div>
                </div> */}
                <div className="position-relative row form-group">
                  <label
                    htmlFor="title"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Tiêu đề
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <input
                      {...register("title")}
                      id="title"
                      placeholder="Title"
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
                    Thứ tự xuất hiện
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <input
                      {...register("position")}
                      placeholder="Số thứ tự"
                      type="text"
                      className="form-control"
                      width="20px"
                    />
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
                      onClick={() => navigate(-1)}
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
