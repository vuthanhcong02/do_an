import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { getClassRooms } from "../../../services/ClassRoomService";
import { createExam } from "../../../services/ExamService";
import { toast } from "react-toastify";
export default function CreateExam() {
  const navigate = useNavigate();
  const [classrooms, setClassrooms] = useState([]);
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    fetchClassrooms();
  }, []);

  const fetchClassrooms = async () => {
    const { success, data } = await getClassRooms();
    if (success) {
      setClassrooms(data.data);
    }
  };
  const onSubmit = async (data) => {
    // console.log(data);
    const dataCreate = {
      name: data.name,
      start_at: data.start_at,
      end_at: data.end_at,
      date: data.date,
      deadline_date: data.deadline_date,
      fee: parseInt(data.fee),
      status: 1,
      class_room_id: parseInt(data.class_room_id),
      max_slot: data.max_slot,
      exam_code: data.exam_code,
    };
    console.log(dataCreate);
    const { success } = await createExam(dataCreate);
    if (success) {
      navigate("/admin/exams");
      toast.success("Tạo exam thành công");
    } else {
      toast.error("Tạo exam thất bại");
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
                      {...register("name")}
                      placeholder="Tên kì thi"
                      type="text"
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="position-relative row form-group">
                  <label
                    htmlFor="title"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Mã cuộc thi
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <input
                      placeholder="Mã cuộc thi"
                      type="text"
                      className="form-control"
                      {...register("exam_code")}
                    />
                  </div>
                </div>

                <div className="position-relative row form-group">
                  <label
                    htmlFor="title"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Thời gian bắt đầu
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <input
                      placeholder="Thời gian bắt đầu"
                      type="time"
                      className="form-control"
                      {...register("start_at")}
                    />
                  </div>
                </div>

                <div className="position-relative row form-group">
                  <label
                    htmlFor="title"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Thời gian kết thúc
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <input
                      placeholder="Thời gia kết thúc"
                      type="time"
                      className="form-control"
                      {...register("end_at")}
                    />
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
                      {...register("date")}
                    />
                  </div>
                </div>

                <div className="position-relative row form-group">
                  <label
                    htmlFor="index"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Phòng thi
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <select
                      {...register("class_room_id")}
                      className="form-select"
                    >
                      <option value="">Chọn phòng thi</option>
                      {classrooms.map((classroom) => (
                        <option key={classroom.id} value={classroom.id}>
                          {classroom?.name}
                        </option>
                      ))}
                    </select>
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
                      {...register("deadline_date")}
                    />
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
                      {...register("fee")}
                    />
                  </div>
                </div>

                <div className="position-relative row form-group">
                  <label
                    htmlFor="title"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Số lượng thí sinh tối đa
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <input
                      placeholder="Số lượng thí sinh tối đa"
                      type="text"
                      className="form-control"
                      {...register("max_slot")}
                    />
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
