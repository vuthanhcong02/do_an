import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
  getClassRoomById,
  updateClassRoom,
} from "../../../services/ClassRoomService";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

export default function EditClassRoom() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [classRoom, setClassRoom] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetchClassRoom();
  }, []);

  useEffect(() => {
    if (classRoom) {
      setValue("name", classRoom.name);
    }
  }, [classRoom]);
  const fetchClassRoom = async () => {
    const { success, data } = await getClassRoomById(id);
    if (success) {
      setClassRoom(data);
    }
  };
  const onSubmit = async (dataClassRoom) => {
    // console.log(dataCategory);
    const dataUpdate = {
      name: dataClassRoom.name,
    };

    console.log(" data", dataUpdate);
    const res = await axios.put(
      `http://api.ngoaingutinhoc.tech.com/api/classrooms/${id}`,
      dataUpdate
    );
    // console.log("success", res);
    if (res.data.success) {
      navigate("/admin/classrooms");
      toast.success("Cập nhật classroom thành công");
    } else {
      toast.error("Cập nhật classroom thất bại");
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
                        required: "Tên bắt buộc phải nhập!",
                        minLength: {
                          value: 3,
                          message: "Tên phải chứa nhất 3 kí tự",
                        },
                        maxLength: {
                          value: 255,
                          message: "Tên phải dài quá 255 kí tự",
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
