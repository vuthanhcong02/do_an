import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  getSchedules,
  deleteSchedule,
  getSchedulesByScheduleId,
} from "../../../services/ScheduleService";
import { getSummary } from "../../../utils/function";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { CSVLink } from "react-csv";
import Paginate from "../../../components/Paginate/Paginate";

export default function ManagerSchedule() {
  const [dataExport, setDataExport] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [pageCount, setPageCount] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async (page) => {
    const { success, data } = await getSchedules(page || 1);
    if (success) {
      console.log(data);
      setSchedules(data?.data);
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
  const headers = [
    { label: "Họ và tên", key: "user_name" },
    { label: "Số CCCD", key: "user_id_card" },
    { label: "Giới tính", key: "user_gender" },
    { label: "Ngày sinh", key: "user_date_of_birthday" },
    { label: "Email", key: "user_email" },
    { label: "Số điện thoại", key: "user_phone" },
    { label: "Địa chỉ", key: "user_address" },
    { label: "Ngày đăng kí", key: "date_of_registration" },
  ];
  // const fetchData = async (id) => {
  //   // console.log("schedule", id);
  //   const { success, data } = await getSchedulesByScheduleId(id);
  //   if (success) {
  //     setDataExport(data);
  //   }
  // };

  const handlePageClick = async (data) => {
    const currentPage = data.selected + 1;
    fetchSchedules(currentPage);
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
                        <CSVLink
                          data={dataExport}
                          asyncOnClick={true}
                          headers={headers}
                          filename={`Danh sách học viên lớp ${item.class?.name} ca ${item.day_of_week}(${item.start_end_time}).csv`}
                          onClick={async (event, done) => {
                            const { success, data } =
                              await getSchedulesByScheduleId(item.id);
                            if (success) {
                              setDataExport(data);
                            }
                            done();
                          }}
                        >
                          <button
                            // to={`/${item.id}`}
                            // onClick={() => handleExportStudents(item.id)}
                            className="btn btn-hover-shine btn-outline-primary border-0 btn-sm"
                          >
                            <FontAwesomeIcon
                              icon={faDownload}
                              size="sm"
                              className="mr-2"
                            />
                            Xuất danh sách
                          </button>
                        </CSVLink>

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
