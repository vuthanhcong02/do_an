import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { getClasses, deleteClass } from "../../../services/ClassService";

export default function ManagerClass() {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    const { success, data } = await getClasses();
    if (success) {
      console.log(data);
      setClasses(data.data);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDelete) {
      const { success } = await deleteClass(id);
      if (success) {
        const newClasses = classes.filter((item) => item.id !== id);
        setClasses(newClasses);
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
              Class
              <div className="page-title-subheading">
                View, create, update, delete and manage.
              </div>
            </div>
          </div>
          <div className="page-title-actions">
            <NavLink
              to="/admin/classes/create"
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
                    defaultValue
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
                    <th className="text-center">Khóa học</th>
                    <th className="text-center">Giảng viên phụ trách</th>
                    <th className="text-center">Status</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {classes.map((classroom, index) => (
                    <tr key={classroom?.id}>
                      <td className="text-center text-muted">{index + 1}</td>

                      <td className="text-center">{classroom?.name}</td>
                      <td className="text-center">{classroom?.course?.name}</td>
                      <td className="text-center">
                        {classroom?.teacher?.full_name}
                      </td>
                      <td className="text-center">
                        <span
                          className={`badge badge-${
                            classroom?.status === "active"
                              ? "success"
                              : "danger"
                          }`}
                        >
                          {classroom?.status === "active"
                            ? "Active"
                            : "Inactive"}
                        </span>
                      </td>
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

            <div className="d-block card-footer"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
