import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { getExamById, updateExam } from "../../../services/ExamService";
import { getClassRooms } from "../../../services/ClassRoomService";
import axios from "axios";
export default function EditExam() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [classrooms, setClassrooms] = useState([]);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetchExam();
  }, [id]);

  useEffect(() => {
    fetchClassrooms();
  }, []);

  const fetchClassrooms = async () => {
    const { success, data } = await getClassRooms();
    if (success) {
      setClassrooms(data.data);
    }
  };
  const fetchExam = async () => {
    const { success, data } = await getExamById(id);
    if (success) {
      setValue("name", data?.name);
      setValue("date", data?.date);
      setValue("deadline_date", data?.deadline_date);
      setValue("fee", data?.fee);
    }
  };
  const onSubmit = async (data) => {
    console.log(data);
    const dataUpdate = {
      name: data.name,
      date: data.date,
      deadline_date: data.deadline_date,
      fee: parseInt(data.fee),
      class_room_id: parseInt(data.class_room_id),
    };
    try {
      const response = await axios.put(
        "http://api.ngoaingutinhoc.tech.com/api/exams/" + id,
        dataUpdate
      );
      if (response.data.success) {
        navigate("/admin/exams");
        toast.success("Cập nhật axem này thành công");
      }
    } catch (error) {
      console.error("Error uploading data", error);
      toast.error("Cập nhật axem này thất bại");
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
              Exam
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
                    Tên kì thi
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <input
                      {...register("name", {
                        required: "Tên kì thi bắt buộc phải nhap",
                        minLength: {
                          value: 3,
                          message: "Tên kì thi ít nhất 3 kí tự",
                        },
                        maxLength: {
                          value: 255,
                          message: "Tên kì thi không dài quá 255 kí tự",
                        },
                      })}
                      placeholder="Tên kì thi"
                      type="text"
                      className="form-control"
                    />
                    {errors?.name && (
                      <span className="text-danger">
                        {errors?.name?.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="position-relative row form-group">
                  <label
                    htmlFor="title"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Ngày thi
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <input
                      placeholder="Ngày diễn ra"
                      type="date"
                      className="form-control"
                      {...register("date", {
                        required: "Ngày thi bắt buộc phải chọn",
                      })}
                    />
                    {errors?.date && (
                      <span className="text-danger">
                        {errors?.date?.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="position-relative row form-group">
                  <label
                    htmlFor="title"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Hạn đăng kí
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <input
                      placeholder="Hạn đăng kí"
                      type="date"
                      className="form-control"
                      {...register("deadline_date", {
                        required: "Hạm đăng kí bắt buộc phải chọn",
                      })}
                    />
                    {errors?.deadline_date && (
                      <span className="text-danger">
                        {errors?.deadline_date?.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="position-relative row form-group">
                  <label
                    htmlFor="title"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Lệ phí thi
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <input
                      placeholder="Lệ phí thi VND"
                      type="text"
                      className="form-control"
                      {...register("fee", {
                        required: "Lệ phí thi bắt buộc phải nhập",
                      })}
                    />

                    {errors?.fee && (
                      <span className="text-danger">
                        {errors?.fee?.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="position-relative row form-group mb-1">
                  <div className="col-md-9 col-xl-8 offset-md-2">
                    <NavLink
                      // onClick={() => navigate(-1)}
                      to="/admin/exams"
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
