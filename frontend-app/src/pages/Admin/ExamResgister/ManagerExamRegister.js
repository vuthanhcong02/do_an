import React, { useEffect, useState } from "react";
import Paginate from "../../../components/Paginate/Paginate";
import { NavLink, useNavigate } from "react-router-dom";
import {
  deleteExamRegister,
  getExamRegisters,
} from "../../../services/ExamRegisterService";
import { toast } from "react-toastify";
import axios from "axios";

export default function ManagerExamRegister() {
  const navigate = useNavigate();
  const [examRegister, setExamRegister] = useState([]);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    fetchExamRegisters();
  }, []);

  const fetchExamRegisters = async (page) => {
    const { success, data } = await getExamRegisters(page || 1);
    if (success) {
      setExamRegister(data.data);
      setPageCount(data.last_page);
      navigate(`/admin/exams/registrations?page=${page || 1}`);
    }
  };
  const handlePageClick = (data) => {
    const currentPage = data.selected + 1;
    fetchExamRegisters(currentPage);
  };

  const handleUpdate = async (id, newStatus) => {
    console.log(id, newStatus);
    try {
      const response = await axios.put(
        `http://api.ngoaingutinhoc.tech.com/api/exam-registers/${id}`,
        {
          status: newStatus,
        }
      );
      if (response.data.success) {
        window.location.href = "/admin/exams/registrations";
        toast.success("Cập nhật trạng thái thành công");
      } else {
        toast.error("Cập nhật trạng thái thất bại");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(" có chắc chắn muốn xóa bản ghi này?");
    if (confirmDelete) {
      const { success } = await deleteExamRegister(id);
      if (success) {
        const newExamRegister = examRegister.filter((item) => item.id !== id);
        setExamRegister(newExamRegister);
        toast.success("Xoa thanh cong");
      } else {
        toast.error("Xoa that bai");
      }
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
              Exam Register
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
                    <th className="text-center">Lịch thi</th>
                    <th className="text-center">Người đăng kí</th>
                    <th className="text-center">Ngày diễn ra</th>
                    <th className="text-center">Hình thức thanh toán</th>
                    <th className="text-center">Status</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {examRegister.map((item, index) => (
                    <tr key={index}>
                      <td className="text-center text-muted">{index + 1}</td>

                      <td className="text-center">{item?.exam?.name}</td>
                      <td className="text-center">{item?.user?.full_name}</td>
                      <td className="text-center">{item?.exam?.date}</td>
                      <td className="text-center">{item?.payment_type}</td>
                      <td className="text-center">
                        <select
                          value={item?.status}
                          className={`form-control-sm badge ${
                            item.status === "success"
                              ? "badge-success"
                              : "badge-danger"
                          }`}
                          onChange={(e) =>
                            handleUpdate(item.id, e.target.value)
                          }
                        >
                          <option value="pending">Đang xử lí</option>
                          <option value="success">Thành công</option>
                        </select>
                      </td>
                      <td className="text-center">
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
          </div>
        </div>
      </div>
    </div>
  );
}
