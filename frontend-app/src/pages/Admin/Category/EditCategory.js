import React, { useEffect, useState } from "react";
import { useNavigate, NavLink, useParams } from "react-router-dom";
import {
  updateCategory,
  showCategory,
} from "../../../services/CategoryService";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function EditCategory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    fetchCategory();
  }, []);
  const fetchCategory = async () => {
    const { success, data } = await showCategory(id);
    if (success) {
      setValue("name", data.name);
      setValue("description", data.description);
    }
  };
  const onSubmit = async (dataCategory) => {
    // console.log(dataCategory);
    const dataUpdate = {
      name: dataCategory.name,
      description: dataCategory.description,
    };

    console.log(" data", dataUpdate);
    const res = await axios.put(
      `http://api.ngoaingutinhoc.tech.com/api/categories/${id}`,
      dataUpdate
    );
    // console.log("success", res);
    if (res.data.success) {
      navigate("/admin/categories");
    }

    // const { success } = await updateCategory(id, dataUpdate);
    // if (success) {
    //   navigate("/admin/categories");
    // }
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
                    <button
                      onClick={() => navigate(-1)}
                      class="border-0 btn btn-outline-danger mr-1"
                    >
                      <span class="btn-icon-wrapper pr-1 opacity-8">
                        <i class="fa fa-times fa-w-20"></i>
                      </span>
                      <span>Cancel</span>
                    </button>

                    <button
                      type="submit"
                      class="btn-shadow btn-hover-shine btn btn-primary"
                    >
                      <span class="btn-icon-wrapper pr-2 opacity-8">
                        <i class="fa fa-download fa-w-20"></i>
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
