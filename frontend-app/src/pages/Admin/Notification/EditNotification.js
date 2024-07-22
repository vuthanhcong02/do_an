import React, { useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { getNotificationTypes } from "../../../services/NotificationTypeService";
import { getNotificationById } from "../../../services/NotificationService";
import { toast } from "react-toastify";
import axios from "axios";
export default function EditNotification() {
  const { slug } = useParams();
  const [notificationTypes, setNotificationTypes] = useState([]);
  const [notification, setNotification] = useState({});
  const [content, setContent] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const fetchNotificationTypes = async () => {
    const { success, data } = await getNotificationTypes();
    if (success) {
      setNotificationTypes(data.data);
    }
  };

  useEffect(() => {
    fetchNotificationTypes();
  }, []);

  const fetchNotificationById = async () => {
    const { success, data } = await getNotificationById(slug);
    if (success) {
      console.log(data);
      setNotification(data);
      setContent(data.content);
    }
  };

  useEffect(() => {
    fetchNotificationById();
  }, []);

  useEffect(() => {
    setValue("title", notification.title);
    setValue("notificationTypeId", notification.notification_type_id);
  }, [notification]);
  const onSubmit = async (data) => {
    // console.log(data, content);
    const dataUpdate = {
      title: data.title,
      content: content,
      notification_type_id: data.notificationTypeId,
    };
    try {
      const res = await axios.put(
        `http://api.ngoaingutinhoc.tech.com/api/notifications/${notification?.id}`,
        dataUpdate
      );
      // console.log("success", res);
      if (res.data.success) {
        navigate("/admin/notifications");
        toast.success("Cập nhật bản ghi thành công");
      } else {
        toast.error("Cập nhật bản ghi thất bại");
      }
    } catch (error) {
      toast.error("Cập nhật bản ghi thất bại");
    }
    //   }
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
              Notification
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
                    htmlFor="title"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Tiêu đề
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <input
                      {...register("title", {
                        required: "Tiêu đề là bắt buộc nhập!",
                        minLength: {
                          value: 3,
                          message: "Tiêu đề phải ít nhất 3 kí tự",
                        },
                        maxLength: {
                          value: 255,
                          message: "Tiêu đề không được quá 255 kí tự",
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

                <div className="position-relative row form-group">
                  <label
                    htmlFor="index"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Loại thông báo
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <select
                      {...register("notificationTypeId", {
                        required: "Loại thông báo bắt buộc phải chọn!",
                      })}
                      className="form-select"
                    >
                      <option value="">Chọn loại thông báo</option>
                      {notificationTypes.map((item) => (
                        <option key={item?.id} value={item?.id}>
                          {item?.name}
                        </option>
                      ))}
                    </select>
                    {errors.notificationTypeId && (
                      <span className="text-danger">
                        {errors.notificationTypeId.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="position-relative row form-group mb-1">
                  <div className="col-md-9 col-xl-8 offset-md-2">
                    <NavLink
                      // onClick={() => navigate(-1)}
                      to="/admin/notifications"
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
