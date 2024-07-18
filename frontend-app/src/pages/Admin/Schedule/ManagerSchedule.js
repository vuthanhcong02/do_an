import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  getSchedules,
  deleteSchedule,
  getSchedulesByScheduleId,
} from "../../../services/ScheduleService";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";

import { toast } from "react-toastify";
import Paginate from "../../../components/Paginate/Paginate";
import moment from "moment";
import { SETTINGS_FOR_EXPORT_COURSE } from "../../../components/Excels/ExportCourseRegistration";
import ExcelExport from "export-xlsx";
import Button from "react-bootstrap/esm/Button";
import "./ManagerSchedule.scss";
export default function ManagerSchedule() {
  const [getAllStudentBySchedule, setGetAllStudentBySchedule] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async (page) => {
    const { success, data } = await getSchedules(page || 1);
    if (success) {
      console.log(data);
      setSchedules(data?.data);
      setPageCount(data?.last_page);
      navigate(`/admin/schedules?page=${page || 1}`);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa bản ghi này?"
    );
    if (confirmDelete) {
      const { success } = await deleteSchedule(id);
      if (success) {
        const newSchedule = schedules.filter((item) => item.id !== id);
        setSchedules(newSchedule);
        toast.success("Xóa schedule thành công");
      } else {
        toast.error("Xóa schedule thất bại");
      }
    }
  };

  const handleShow = async (id) => {
    setShow(true);
    console.log("id", id);
    const { success, data } = await getSchedulesByScheduleId(id);
    if (success) {
      // console.log("allRegistrationsbyExamSchedule", data);
      setGetAllStudentBySchedule(data);
    }
  };

  console.log("getAllStudentBySchedule", getAllStudentBySchedule);
  const transformData = (data) => {
    return data.map((item, index) => {
      return {
        number: index + 1,
        fullName: item.user_name,
        identityNumber: item.user_id_card,
        gender: item.user_gender === 1 ? "Nam" : "Nữ",
        dateOfBirth: moment(item.user_date_of_birthday).format("DD/MM/YYYY"),
        email: item.user_email,
        phone: item.user_phone,
        address: item.user_address,
        dateOfRegistration: moment(item.date_of_registration).format(
          "HH:mm DD/MM/YYYY"
        ),
      };
    });
  };
  const handlePageClick = async (data) => {
    const currentPage = data.selected + 1;
    fetchSchedules(currentPage);
  };

  const handleExportExcel = () => {
    const transformedData = transformData(getAllStudentBySchedule);
    const data = [
      {
        table1: transformedData,
      },
    ];
    const excelExport = new ExcelExport();
    excelExport.downloadExcel(SETTINGS_FOR_EXPORT_COURSE, data);
    setShow(false);
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
              Schedule
              <div className="page-title-subheading">
                View, create, update, delete and manage.
              </div>
            </div>
          </div>
          <div className="page-title-actions">
            <NavLink
              to="create"
              className="btn-shadow btn-hover-shine mr-3 btn btn-primary"
            >
              <span className="btn-icon-wrapper pr-2 opacity-7">
                <i className="fa fa-plus fa-w-20" />
              </span>
              Create
            </NavLink>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="main-card mb-3 card">
            <div className="card-header">
              <form>
                <div className="input-group">
                  <input
                    type="search"
                    name="search"
                    id="search"
                    placeholder="Search everything"
                    className="form-control"
                  />
                  <span className="input-group-append">
                    <button type="submit" className="btn btn-primary">
                      <i className="fa fa-search" />
                      &nbsp; Search
                    </button>
                  </span>
                </div>
              </form>
              <div className="btn-actions-pane-right">
                <div role="group" className="btn-group-sm btn-group">
                  <button className="btn btn-focus">This week</button>
                  <button className="active btn btn-focus">Anytime</button>
                </div>
              </div>
            </div>
            <div className="table-responsive">
              <table className="align-middle mb-0 table table-borderless table-striped table-hover">
                <thead>
                  <tr>
                    <th className="text-center">ID</th>
                    <th className="">Khóa học</th>
                    <th className="">Lớp</th>
                    <th className="">Phòng học</th>
                    <th className="">Ngày học</th>
                    <th className="">Người phụ trách</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {schedules.map((item, index) => (
                    <tr key={index}>
                      <td className="text-center text-muted">{index + 1}</td>
                      <td className="">{item.course?.name}</td>
                      <td className="">{item.class?.name}</td>
                      <td className="">{item.classroom?.name}</td>
                      <td className="">
                        Thứ {item?.day_of_week} ({item?.start_end_time})
                      </td>
                      <td className="">{item.teacher?.full_name}</td>

                      <td className="text-center">
                        <button
                          className="btn btn-hover-shine btn-outline-primary border-0 btn-sm"
                          onClick={() => handleShow(item.id)}
                        >
                          <span className="btn-icon-wrapper opacity-8">
                            <i className="fa fa-eye fa-w-20 mr-2" />
                            Xem danh sách
                          </span>
                        </button>
                        <NavLink
                          to={`${item.id}/edit`}
                          data-toggle="tooltip"
                          title="Edit"
                          data-placement="bottom"
                          className="btn btn-outline-warning border-0 btn-sm"
                        >
                          <span className="btn-icon-wrapper opacity-8">
                            <i className="fa fa-edit fa-w-20" />
                          </span>
                        </NavLink>
                        <button
                          className="btn btn-hover-shine btn-outline-danger border-0 btn-sm"
                          type="submit"
                          data-toggle="tooltip"
                          title="Delete"
                          data-placement="bottom"
                          onClick={() => handleDelete(item.id)}
                        >
                          <span className="btn-icon-wrapper opacity-8">
                            <i className="fa fa-trash fa-w-20" />
                          </span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="d-flex justify-content-end card-footer">
              <Paginate
                pageCount={pageCount}
                handlePageClick={handlePageClick}
              />
            </div>
            <Modal
              show={show}
              onHide={handleClose}
              size="lg"
              scrollable
              style={{
                maxHeight: "calc(100vh - 210px)",
                overflow: "auto",
              }}
            >
              <Modal.Header closeButton>
                <Modal.Title>
                  Danh sách học viên lớp:{" "}
                  {getAllStudentBySchedule[0]?.class_name} (Thứ{" "}
                  {getAllStudentBySchedule[0]?.day_of_week} [
                  {getAllStudentBySchedule[0]?.start_end_time}])
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th className="text-center">Họ và tên</th>
                      <th className="text-center">Giới tính</th>
                      <th className="text-center">Ngày sinh</th>
                      <th className="text-center">Số CCCD</th>
                      <th className="text-center">Email</th>
                      <th className="text-center">Số điện thoại</th>
                      <th className="text-center">Địa chỉ</th>
                      <th className="text-center">Ngày đăng kí</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getAllStudentBySchedule.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td className="text-center">{item?.user_name}</td>
                        <td className="text-center">
                          {item?.user_gender === 1 ? "Nam" : "Nữ"}
                        </td>
                        <td className="text-center">
                          {moment(item?.user_date_of_birthday).format(
                            "DD-MM-YYYY"
                          )}
                        </td>
                        <td className="text-center">{item?.user_id_card}</td>
                        <td className="text-center">{item?.user_email}</td>
                        <td className="text-center">{item?.user_phone}</td>
                        <td className="text-center">{item?.user_address}</td>
                        <td className="text-center">
                          {moment(item?.date_of_registration).format(
                            "HH:mm - DD-MM-YYYY"
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Đóng
                </Button>
                {getAllStudentBySchedule.length > 0 && (
                  <Button variant="primary" onClick={handleExportExcel}>
                    Xuất file
                  </Button>
                )}
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}
