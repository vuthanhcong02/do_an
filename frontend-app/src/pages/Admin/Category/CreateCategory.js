import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { createCategory } from "../../../services/CategoryService";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function CreateCategory() {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const onSubmit = async (dataCategory) => {
    const dataCreate = {
      name: dataCategory.name,
      description: dataCategory.description,
    };
    const { success } = await createCategory(dataCreate);
    if (success) {
      navigate("/admin/categories");
      toast.success("Thêm category thành công");
    } else {
      toast.error("Thêm category thất bại");
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
                    htmlFor="title"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Name
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <input
                      {...register("name")}
                      id="title"
                      placeholder="Name"
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
                    Mô tả
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <input
                      {...register("description")}
                      placeholder="Description"
                      type="text"
                      className="form-control"
                      width="20px"
                    />
                  </div>
                </div>
                <div class="position-relative row form-group mb-1">
                  <div class="col-md-9 col-xl-8 offset-md-2">
                    <NavLink
                      // onClick={() => navigate(-1)}
                      to="/admin/categories"
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
