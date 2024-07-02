import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getCourses, deleteCourse } from "../../../services/CourseService";
import moment from "moment";
import { baseUrl, baseUrlImage } from "../../../config";
import { toast } from "react-toastify";
import Paginate from "../../../components/Paginate/Paginate";
export default function ManagerCourse() {
  const [courses, setCourses] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async (page) => {
    const { success, data } = await getCourses(page || 1);
    if (success) {
      setCourses(data.data);
      setPageCount(data.last_page);
      navigate(`/admin/courses?page=${page || 1}`);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa bản ghi này?"
    );
    if (confirmDelete) {
      const { success, data } = await deleteCourse(id);
      if (success) {
        const newCourses = courses.filter((item) => item.id !== id);
        setCourses(newCourses);
        toast.success("Xóa course thành công");
      } else {
        toast.error("Xóa course thất bại");
      }
    }
  };

  const handlePageClick = async (data) => {
    const currentPage = data.selected + 1;
    fetchCourses(currentPage);
  };
  return (
    <div>
      <div className="app-main__inner">
        <div className="app-page-title">
          <div className="page-title-wrapper">
            <div className="page-title-heading">
              <div className="page-title-icon">
                <i className="pe-7s-ticket icon-gradient bg-mean-fruit" />
              </div>
              <div>
                Course
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
                      <th className="text-center">Hỉnh ảnh</th>
                      <th className="">Tên khóa học</th>
                      <th className="text-center">Subject</th>
                      <th className="text-center">Ngày bắt đầu</th>
                      <th className="text-center">Status</th>
                      <th className="text-center">Featured</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((course, index) => (
                      <tr>
                        <td className="text-center text-muted">{index + 1}</td>
                        <td className="text-center">
                          <img
                            src={`${baseUrlImage}${course?.image}`}
                            style={{
                              width: 100,
                              height: 70,
                              objectFit: "cover",
                            }}
                            alt=""
                          />
                        </td>
                        <td>{course?.name}</td>
                        <td className="text-center">
                          {course?.category?.name}
                        </td>
                        <td className="text-center">
                          {moment(course?.created_at).format("DD/MM/YYYY")}
                        </td>
                        <td className="text-center">
                          <span
                            className={`badge badge-${
                              course?.status === 1 ? "success" : "danger"
                            }`}
                          >
                            {course?.status === 1 ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="text-center">
                          <span
                            className={`badge badge-${
                              course?.featured === 1 ? "success" : "danger"
                            }`}
                          >
                            {course?.featured === 1 ? "YES" : "NO"}
                          </span>
                        </td>

                        <td className="text-center">
                          {/* <NavLink
                            to="show"
                            className="btn btn-hover-shine btn-outline-primary border-0 btn-sm"
                          >
                            Details
                          </NavLink> */}
                          <NavLink
                            to={`${course?.id}/edit`}
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
                            onClick={() => handleDelete(course?.id)}
                            className="btn btn-hover-shine btn-outline-danger border-0 btn-sm"
                            data-toggle="tooltip"
                            title="Delete"
                            data-placement="bottom"
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
      ;
    </div>
  );
}
