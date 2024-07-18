import React, { useEffect, useState } from "react";
import Paginate from "../../../components/Paginate/Paginate";
import { NavLink, useNavigate } from "react-router-dom";
import {
  getExamSchedules,
  deleteExamSchedule,
} from "../../../services/ExamScheduleService";
import { getAllRegistrationsByExamSchedule } from "../../../services/ExamRegisterService";
import Table from "react-bootstrap/Table";
import moment from "moment";
import { toast } from "react-toastify";
import { formatPrice } from "../../../utils/function";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { SETTINGS_FOR_EXPORT_EXAM } from "../../../components/Excels/ExportExamRegistration";
import ExcelExport from "export-xlsx";

// const excelExport = new ExcelExport();
// excelExport.downloadExcel(SETTINGS_FOR_EXPORT, data);
export default function ManagerExamSchedule() {
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [allRegistrationsbyExamSchedule, setAllRegistrationsByExamSchedule] =
    useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async (page) => {
    const { success, data } = await getExamSchedules(page || 1);
    if (success) {
      setExams(data.data);
      setPageCount(data.last_page);
      navigate(`/admin/exam-schedules?page=${page || 1}`);
    }
  };
  const handlePageClick = (data) => {
    const currentPage = data.selected + 1;
    fetchExams(currentPage);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa bản ghi này?"
    );
    if (confirmDelete) {
      const { success } = await deleteExamSchedule(id);
      if (success) {
        const newExams = exams.filter((item) => item.id !== id);
        setExams(newExams);
        toast.success("Xóa exam thành công");
      } else {
        toast.error("Xóa exam thất bại");
      }
    }
  };

  const handleShow = async (id) => {
    setShow(true);
    console.log("id", id);
    const { success, data } = await getAllRegistrationsByExamSchedule(id);
    if (success) {
      console.log("allRegistrationsbyExamSchedule", data);
      setAllRegistrationsByExamSchedule(data);
    }
  };

  const transformData = (data) => {
    return data.map((item, index) => ({
      number: index + 1,
      candidateNumber: item.candidate_number,
      fullName: item.user.full_name,
      email: item.user.email,
      phone: item.user.phone,
    }));
  };

  const handleExportExcel = () => {
    const transformedData = transformData(allRegistrationsbyExamSchedule);
    const data = [
      {
        table1: transformedData,
      },
    ];
    const excelExport = new ExcelExport();
    excelExport.downloadExcel(SETTINGS_FOR_EXPORT_EXAM, data);
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
              Exam
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
                    <th className="text-center">Tên</th>
                    <th className="text-center">Ca thi</th>
                    <th className="text-center">Phòng thi</th>
                    <th className="text-center">Số lượng thí sinh tối đa</th>
                    <th className="text-center">Thời gian</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {exams.map((item, index) => (
                    <tr key={index}>
                      <td className="text-center text-muted">{index + 1}</td>
                      <td className="text-center">{item?.exam?.name}</td>

                      <td className="text-center"> {item?.shift}</td>

                      <td className="text-center">{item?.classroom?.name}</td>
                      <td className="text-center">
                        {item?.max_student_per_shift}
                      </td>
                      <td className="text-center">
                        {item?.start_time} - {item?.end_time}
                      </td>
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
            <Modal show={show} onHide={handleClose} size="lg">
              <Modal.Header closeButton>
                <Modal.Title>
                  Danh sách thi: {allRegistrationsbyExamSchedule[0]?.exam?.name}{" "}
                  (Ca thi -{" "}
                  {allRegistrationsbyExamSchedule[0]?.exam_schedule?.shift})
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th className="text-center">Số báo danh</th>
                      <th className="text-center">Họ và tên</th>
                      <th className="text-center">Email</th>
                      <th className="text-center">Số điện thoại</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allRegistrationsbyExamSchedule.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td className="text-center">
                          {item?.candidate_number}
                        </td>
                        <td className="text-center">{item?.user?.full_name}</td>
                        <td className="text-center">{item?.user?.email}</td>
                        <td className="text-center">{item?.user?.phone}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Đóng
                </Button>
                {allRegistrationsbyExamSchedule.length > 0 && (
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
