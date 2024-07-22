import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { makeClassRoom } from "../../../services/ClassRoomService";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function CreateClassRoom() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (dataClassRoom) => {
    const dataCreate = {
      name: dataClassRoom.name,
    };
    const { success } = await makeClassRoom(dataCreate);
    if (success) {
      navigate("/admin/classrooms");
      toast.success("Tạo classroom thành công");
    } else {
      toast.error("Tạo classroom thất bại");
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
              ClassRoom
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
                        required: "Tên bắt buộc phải nhập",
                        minLength: {
                          value: 3,
                          message: "Tên phải chứa ít nhất 3 kí tự",
                        },
                        maxLength: {
                          value: 255,
                          message: " Tên không được dài quá 255 kí tự",
                        },
                      })}
                      id="title"
                      placeholder="Name"
                      type="text"
                      className="form-control"
                    />
                    {errors.name && (
                      <span className="text-danger">{errors.name.message}</span>
                    )}
                  </div>
                </div>

                <div class="position-relative row form-group mb-1">
                  <div class="col-md-9 col-xl-8 offset-md-2">
                    <NavLink
                      // onClick={() => navigate(-1)}
                      to="/admin/classrooms"
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
