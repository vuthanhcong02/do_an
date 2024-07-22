import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { getExamScheduleById } from "../../../services/ExamScheduleService";
import { getExams } from "../../../services/ExamService";
import { getClassRooms } from "../../../services/ClassRoomService";
import axios from "axios";
export default function EditExamSchedule() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [classrooms, setClassrooms] = useState([]);
  const [exams, setExams] = useState([]);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetchExams();
    fetchExamSchedule();
  }, [id]);

  useEffect(() => {
    fetchClassrooms();
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
  const fetchExamSchedule = async () => {
    const { success, data } = await getExamScheduleById(id);
    if (success) {
      setValue("exam_id", data?.exam_id);
      setValue("start_time", data?.start_time);
      setValue("end_time", data?.end_time);
      setValue("shift", data?.shift);
      setValue("class_room_id", data?.class_room_id);
      setValue("max_student_per_shift", data?.max_student_per_shift);
    }
  };
  const onSubmit = async (data) => {
    console.log(data);
    const dataUpdate = {
      start_time: data.start_time,
      end_time: data.end_time,
      shift: data.shift,
      fee: parseInt(data.fee),
      class_room_id: parseInt(data.class_room_id),
      max_student_per_shift: parseInt(data.max_student_per_shift),
      exam_id: parseInt(data.exam_id),
    };
    try {
      const response = await axios.put(
        "http://api.ngoaingutinhoc.tech.com/api/exam-schedules/" + id,
        dataUpdate
      );
      if (response.data.success) {
        navigate("/admin/exam-schedules");
        toast.success("Cập nhật ca thi này thành công");
      }
    } catch (error) {
      console.error("Error uploading data", error);
      toast.error("Cập nhật ca thi này thất bại");
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
                    <select
                      {...register("exam_id", {
                        required: "Lịch thi bắt buộc phải chọn!",
                      })}
                      className="form-select"
                    >
                      <option value="">Chọn lịch thi</option>
                      {exams.map((exam) => (
                        <option key={exam.id} value={exam.id}>
                          {exam?.name}
                        </option>
                      ))}
                    </select>
                    {errors?.exam_id && (
                      <p className="text-danger">{errors?.exam_id?.message}</p>
                    )}
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
                      {...register("shift", {
                        required: "Ca thi bắt buộc phải nhập!",
                      })}
                      placeholder="Ca thi"
                      type="text"
                      className="form-control"
                    />
                    {errors?.shift && (
                      <span className="text-danger">
                        {errors?.shift?.message}
                      </span>
                    )}
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
                      {...register("start_time", {
                        required: "Thời gian bắt đầu bắt buộc phải chọn!",
                      })}
                    />
                    {errors?.start_time && (
                      <span className="text-danger">
                        {errors?.start_time?.message}
                      </span>
                    )}
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
                      {...register("end_time", {
                        required: "Thời gian kết thúc bắt buộc phải chọn!",
                      })}
                    />
                    {errors?.end_time && (
                      <span className="text-danger">
                        {errors?.end_time?.message}
                      </span>
                    )}
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
                      {...register("class_room_id", {
                        required: "Phòng thi bắt buộc phải chọn!",
                      })}
                      className="form-select"
                    >
                      <option value="">Chọn phòng thi</option>
                      {classrooms.map((classroom) => (
                        <option key={classroom.id} value={classroom.id}>
                          {classroom?.name}
                        </option>
                      ))}
                    </select>
                    {errors?.class_room_id && (
                      <p className="text-danger">
                        {errors?.class_room_id?.message}
                      </p>
                    )}
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
                      {...register("max_student_per_shift", {
                        required: "Số lần thi bắt buộc phải điền!",
                        valueAsNumber: true,
                      })}
                    />
                    {errors?.max_student_per_shift && (
                      <span className="text-danger">
                        {errors?.max_student_per_shift?.message}
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
