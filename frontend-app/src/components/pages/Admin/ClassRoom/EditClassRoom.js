import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getClassRoomById,
  updateClassRoom,
} from "../../../../services/ClassRoomService";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function EditClassRoom() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [classRoom, setClassRoom] = useState(null);
  const { register, handleSubmit, setValue } = useForm();

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
