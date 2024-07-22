import React, { useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import ReactQuill from "react-quill";
import { getNewsBySlug } from "../../../services/NewsService";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { baseUrl, baseUrlImage } from "../../../config";
import { toast } from "react-toastify";

export default function EditNews() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [news, setNews] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [content, setContent] = useState("");
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
    fetchNews();
  }, []);
  const fetchNews = async () => {
    const { success, data } = await getNewsBySlug(slug);
    if (success) {
      console.log(data);
      setNews(data);
    }
  };
  useEffect(() => {
    if (news) {
      setValue("id", news.id);
      setValue("image", news.image);
      setValue("title", news.title);
      setValue("description", news.description);
      setValue("slug", news.slug);
      setContent(news.content);
      setValue("featured", news.featured ? 1 : 0);
    }
  }, [news]);

  useEffect(() => {
    if (news && news.image) {
      setImagePreview(`${baseUrlImage}${news?.image}`);
    } else {
      setImagePreview(null);
    }
  }, [news, selectedImage]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    console.log("id", data.id);
    formData.append("_method", "PUT");
    formData.append("id", data.id);
    if (selectedImage) {
      formData.append("image", selectedImage);
    }
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("slug", data.slug);
    formData.append("content", content);
    formData.append("featured", data.featured ? 1 : 0);

    // console.log(data, content);
    try {
      const response = await axios.post(
        "http://api.ngoaingutinhoc.tech.com/api/news/" + data.id,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.success) {
        navigate("/admin/news");
        toast.success("Cập nhật news thành công");
      }
    } catch (error) {
      console.error("Error uploading data", error);
      toast.error("Cập nhật news thất bại");
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
                    htmlFor="title"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Tiêu đề
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <input
                      {...register("title", {
                        required: "Tiêu đề bắt buộc phải nhập!",
                        minLength: {
                          value: 3,
                          message: "Tiêu đề tối thiểu 3 kí tự",
                        },
                        maxLength: {
                          value: 255,
                          message: "Tiêu đề tối đa 255 kí tự",
                        },
                      })}
                      placeholder="Title"
                      type="text"
                      className="form-control"
                    />

                    {errors.title && (
                      <span className="text-danger">
                        {errors.title.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="position-relative row form-group">
                  <label
                    htmlFor="title"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Mô tả
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <input
                      placeholder="Description"
                      type="text"
                      className="form-control"
                      {...register("description", {
                        required: "Mô tả bắt buộc phải điền!",
                        minLength: {
                          value: 3,
                          message: "Mô tả tối thiểu 3 kí tự",
                        },
                        maxLength: {
                          value: 255,
                          message: "Mô tả tối đa 255 kí tự",
                        },
                      })}
                    />

                    {errors.description && (
                      <span className="text-danger">
                        {errors.description.message}
                      </span>
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
                        setContent(e);
                      }}
                      value={content}
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
                      {...register("featured")}
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
                      to="/admin/news"
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
