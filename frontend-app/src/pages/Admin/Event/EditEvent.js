import React, { useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import ReactQuill from "react-quill";
import { getEventsById } from "../../../services/EventService";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { baseUrl, baseUrlImage } from "../../../config";
import { toast } from "react-toastify";

export default function EditEvent() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [event, setEvents] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");
  const { register, handleSubmit, setValue } = useForm();

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
    fetchEvents();
  }, []);
  const fetchEvents = async () => {
    const { success, data } = await getEventsById(id);
    if (success) {
      console.log(data);
      setEvents(data);
    }
  };
  useEffect(() => {
    if (event) {
      setValue("image", event.image);
      setValue("name", event.name);
      setValue("location", event.location);
      setValue("start_date", event.start_date);
      setValue("start_time", event.start_time);
      setValue("end_time", event.end_time);
      setValue("slug", event.slug);
      setDescription(event.description);
      setValue("status", event.status ? 1 : 0);
    }
  }, [event]);

  useEffect(() => {
    if (event && event.image) {
      setImagePreview(`${baseUrlImage}${event?.image}`);
    } else {
      setImagePreview(null);
    }
  }, [event, selectedImage]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("_method", "PUT");
    if (selectedImage) {
      formData.append("image", selectedImage);
    }
    formData.append("name", data.name);
    formData.append("location", data.location);
    formData.append("start_date", data.start_date);
    formData.append("start_time", data.start_time);
    formData.append("end_time", data.end_time);
    formData.append("slug", data.slug);
    formData.append("status", data.status ? 1 : 0);

    // console.log(data, content);
    try {
      const response = await axios.post(
        "http://api.ngoaingutinhoc.tech.com/api/events/" + id,

        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.success) {
        navigate("/admin/events");
        toast.success("Cập nhật event này thành công");
      }
    } catch (error) {
      console.error("Error uploading data", error);
      toast.error("Cập nhật event này thất bại");
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
                    Tiêu đề
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <input
                      {...register("name")}
                      placeholder="Name"
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
                    Description
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
                    htmlFor="title"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Location
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <input
                      placeholder="Location"
                      type="text"
                      className="form-control"
                      {...register("location")}
                    />
                  </div>
                </div>

                <div className="position-relative row form-group">
                  <label
                    htmlFor="title"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Start Date
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <input
                      placeholder="Start Date"
                      type="date"
                      className="form-control"
                      {...register("start_date")}
                    />
                  </div>
                </div>

                <div className="position-relative row form-group">
                  <label
                    htmlFor="title"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Start Time
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <input
                      placeholder="Start Date"
                      type="time"
                      className="form-control"
                      {...register("start_time")}
                    />
                  </div>
                </div>

                <div className="position-relative row form-group">
                  <label
                    htmlFor="title"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    End Time
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <input
                      placeholder="End Date"
                      type="time"
                      className="form-control"
                      {...register("end_time")}
                    />
                  </div>
                </div>

                <div className="position-relative row form-group">
                  <label
                    htmlFor="title"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Slug
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <input
                      placeholder="Slug"
                      type="text"
                      className="form-control"
                      {...register("slug")}
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
                    <input {...register("status")} type="checkbox" />
                  </div>
                </div>

                <div className="position-relative row form-group d-flex align-items-center">
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
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
