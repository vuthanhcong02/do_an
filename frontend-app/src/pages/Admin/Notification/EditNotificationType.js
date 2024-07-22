import React, { useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import {
  getNotificationTypeById,
  updateNotificationType,
} from "../../../services/NotificationTypeService";
import { toast } from "react-toastify";
import axios from "axios";

export default function EditNotificationType() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [notificationType, setNotificationType] = useState({});
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetchNotificationTypeById();
  }, []);

  const fetchNotificationTypeById = async () => {
    const { success, data } = await getNotificationTypeById(id);
    if (success) {
      setNotificationType(data);
    }
  };

  useEffect(() => {
    setValue("name", notificationType.name);
  }, [notificationType]);

  const onSubmit = async (data) => {
    // console.log(data, content);

    const dataUpdate = {
      name: data.name,
    };

    console.log(" data", dataUpdate);
    const res = await axios.put(
      `http://api.ngoaingutinhoc.tech.com/api/notification-types/${id}`,
      dataUpdate
    );
    // console.log("success", res);
    if (res.data.success) {
      navigate("/admin/notifications/types");
      toast.success("Cập nhật bản ghi thành công");
    } else {
      toast.error("Cập nhật bản ghi thất bại");
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
                    htmlFor="title"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Tên
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <input
                      {...register("name", {
                        required: "Tên loại thông báo là bắt buộc phải nhập",
                        maxLength: {
                          value: 255,
                          message: "Tên loại thông báo tối đa 255 kí tự",
                        },
                        minLength: {
                          value: 3,
                          message: "Tên loại thông báo phải ít nhất 3 kí tự",
                        },
                      })}
                      id="title"
                      placeholder="Name"
                      type="text"
                      className="form-control"
                    />
                    {errors.name && (
                      <p className="text-danger">{errors.name.message}</p>
                    )}
                  </div>
                </div>

                <div class="position-relative row form-group mb-1">
                  <div class="col-md-9 col-xl-8 offset-md-2">
                    <NavLink
                      // onClick={() => navigate(-1)}
                      to="/admin/notifications/types"
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
