import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { getClassRooms } from "../../../services/ClassRoomService";
import { getExams } from "../../../services/ExamService";
import { toast } from "react-toastify";
import { createExamSchedule } from "../../../services/ExamScheduleService";
export default function CreateExamSchedule() {
  const navigate = useNavigate();
  const [classrooms, setClassrooms] = useState([]);
  const [exams, setExams] = useState([]);
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    fetchClassrooms();
    fetchExams();
  }, []);

  const fetchExams = async () => {
    const { success, data } = await getExams();
    if (success) {
      setExams(data.data);
    }
  };

  const fetchClassrooms = async () => {
    const { success, data } = await getClassRooms();
    if (success) {
      setClassrooms(data.data);
    }
  };
  const onSubmit = async (data) => {
    // console.log(data);
    const dataCreate = {
      start_time: data.start_time,
      end_time: data.end_time,
      shift: data.shift,
      exam_id: parseInt(data.exam_id),
      class_room_id: parseInt(data.class_room_id),
      max_student_per_shift: parseInt(data.max_student_per_shift),
    };
    console.log(dataCreate);
    const { success } = await createExamSchedule(dataCreate);
    if (success) {
      navigate("/admin/exam-schedules");
      toast.success("Tạo ca thi thành công");
    } else {
      toast.error("Tạo ca thi thất bại");
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
                    htmlFor="index"
                    className="col-md-3 text-md-right col-form-label"
                  >
                    Lịch thi
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <select {...register("exam_id")} className="form-select">
                      <option value="">Chọn lịch thi</option>
                      {exams.map((exam) => (
                        <option key={exam.id} value={exam.id}>
                          {exam?.name}
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
                    Ca thi
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <input
                      {...register("shift")}
                      placeholder="Ca thi"
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
                    Thời gian bắt đầu
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <input
                      placeholder="Thời gian bắt đầu"
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
                    Thời gian kết thúc
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <input
                      placeholder="Thời gia kết thúc"
                      type="time"
                      className="form-control"
                      {...register("end_time")}
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
                    Số lượng thí sinh tối đa từng ca
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <input
                      placeholder="Số lượng thí sinh tối đa"
                      type="text"
                      className="form-control"
                      {...register("max_student_per_shift")}
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
