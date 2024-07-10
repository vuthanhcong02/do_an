import React, { useEffect, useState } from "react";
import Paginate from "../../../components/Paginate/Paginate";
import { NavLink, useNavigate } from "react-router-dom";
import { getExams, deleteExam } from "../../../services/ExamService";
import moment from "moment";
import { toast } from "react-toastify";
import { formatPrice } from "../../../utils/function";
export default function ManagerExam() {
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async (page) => {
    const { success, data } = await getExams(page || 1);
    if (success) {
      setExams(data.data);
      setPageCount(data.last_page);
      navigate(`/admin/exams?page=${page || 1}`);
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
      const { success } = await deleteExam(id);
      if (success) {
        const newExams = exams.filter((item) => item.id !== id);
        setExams(newExams);
        toast.success("Xóa exam thành công");
      } else {
        toast.error("Xóa exam thất bại");
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
                    <th className="text-center">Thời gian</th>
                    <th className="text-center">Ngày diễn ra</th>
                    <th className="text-center">Phòng thi</th>
                    <th className="text-center">Lệ phí</th>
                    <th className="text-center">Hạn đăng kí</th>
                    <th className="text-center">Status</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {exams.map((item, index) => (
                    <tr key={index}>
                      <td className="text-center text-muted">{index + 1}</td>
                      <td className="text-center">{item.name}</td>
                      <td className="text-center">
                        {item?.start_at}-{item?.end_at}
                      </td>
                      <td className="text-center">
                        {moment(item?.date).format("DD-MM-YYYY")}
                      </td>
                      <td className="text-center">{item?.classroom?.name}</td>
                      <td className="text-center">
                        {item?.fee && formatPrice(item?.fee)}
                      </td>
                      <td className="text-center">
                        {moment(item?.deadline_date).format("DD-MM-YYYY")}
                      </td>
                      <td className="text-center">
                        {" "}
                        <span
                          className={`badge badge-${
                            item?.status === 1 ? "success" : "danger"
                          }`}
                        >
                          {item?.status === 1 ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="text-center">
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
          </div>
        </div>
      </div>
    </div>
  );
}
