import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import {
  getClassRooms,
  deleteClassRoom,
} from "../../../services/ClassRoomService";
import { toast } from "react-toastify";
import Paginate from "../../../components/Paginate/Paginate";

export default function ManagerClassRoom() {
  const navigate = useNavigate();
  const [classrooms, setClassrooms] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  useEffect(() => {
    fetchClassrooms();
  }, []);

  const fetchClassrooms = async () => {
    const { success, data } = await getClassRooms();
    if (success) {
      console.log(data);
      setClassrooms(data.data);
      setPageCount(data.last_page);
      navigate(`/admin/classrooms?page=1`);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa bản ghi này?"
    );
    if (confirmDelete) {
      const { success } = await deleteClassRoom(id);
      if (success) {
        const newClassrooms = classrooms.filter((item) => item.id !== id);
        setClassrooms(newClassrooms);
        toast.success("Xóa classroom thành công");
      } else {
        toast.error("Xóa classroom thất bại");
      }
    }
  };

  const handlePageClick = (data) => {
    const currentPage = data.selected + 1;
    fetchClassrooms(currentPage);
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
              ClassRoom
              <div className="page-title-subheading">
                View, create, update, delete and manage.
              </div>
            </div>
          </div>
          <div className="page-title-actions">
            <NavLink
              to="/admin/classrooms/create"
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
                    <th className="text-center">Name</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {classrooms.map((classroom, index) => (
                    <tr key={classroom?.id}>
                      <td className="text-center text-muted">{index + 1}</td>

                      <td className="text-center">{classroom?.name}</td>
                      <td className="text-center">
                        <NavLink
                          to={`${classroom?.id}/edit`}
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
                          data-toggle="tooltip"
                          title="Delete"
                          data-placement="bottom"
                          onClick={() => handleDelete(classroom?.id)}
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
