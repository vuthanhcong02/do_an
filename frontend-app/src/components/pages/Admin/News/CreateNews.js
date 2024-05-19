import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
export default function CreateNews() {
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
              <form method="post" encType="multipart/form-data" action="">
                <div className="position-relative row form-group">
                  <label
                    htmlFor="image"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Hình ảnh
                  </label>
                  <div className="col-md-9 col-xl-8 d-flex flex-lg-column">
                    <img
                      src={selectedImage}
                      alt="Generic placeholder image"
                      className="img-fluid"
                      style={{
                        width: "300px",
                        height: "180px",
                        objectFit: "fill",
                      }}
                    />
                  </div>
                  <div
                    className="col-md-9 col-xl-8"
                    style={{ marginTop: "20px", marginLeft: "115px" }}
                  >
                    <div className="d-flex flex-column align-items-center justify-content-center">
                      <label className="label">
                        <input
                          type="file"
                          onChange={handleImageChange}
                          name="image"
                          accept="image/x-png,image/gif,image/jpeg"
                        />
                        <span>Chọn hình ảnh</span>
                      </label>
                    </div>
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
                      name="title"
                      id="title"
                      placeholder="Title"
                      type="text"
                      className="form-control"
                      value=""
                    />
                  </div>
                </div>

                <div className="position-relative row form-group">
                  <label
                    htmlFor="title"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Description
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <input
                      placeholder="Description"
                      type="text"
                      className="form-control"
                      value=""
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
                  <div className="col-md-9 col-xl-8">
                    <textarea
                      name="content"
                      id="content"
                      placeholder="Content"
                      type="text"
                      className="form-control"
                      value=""
                    ></textarea>
                  </div>
                </div>

                <div className="position-relative row form-group">
                  <label
                    htmlFor="price"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Tác giả
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <select
                      name="user_id"
                      id="user_id"
                      className="form-control"
                    >
                      <option value="">-- Tác giả --</option>
                    </select>
                  </div>
                </div>

                <div className="position-relative row form-group mb-1">
                  <div className="col-md-9 col-xl-8 offset-md-2">
                    <NavLink
                      onClick={() => navigate(-1)}
                      className="border-0 btn btn-outline-danger mr-1"
                    >
                      <span className="btn-icon-wrapper pr-1 opacity-8">
                        <i className="fa fa-times fa-w-20"></i>
                      </span>
                      <span>Cancel</span>
                    </NavLink>

                    <button
                      type="submit"
                      className="btn-shadow btn-hover-shine btn btn-primary"
                    >
                      <span className="btn-icon-wrapper pr-2 opacity-8">
                        <i className="fa fa-download fa-w-20"></i>
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
