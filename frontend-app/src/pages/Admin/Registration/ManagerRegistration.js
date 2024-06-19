import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getRegistrations } from "../../../services/RegistrationService";
import moment from "moment";
export default function ManagerRegistration() {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    const { success, data } = await getRegistrations();
    if (success) {
      setRegistrations(data?.data);
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
              Registrations
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
                    <th className="text-center">Họ và tên</th>
                    <th className="text-center">Khóa học</th>
                    <th className="text-center">Lớp</th>
                    <th className="text-center">Ngày đăng kí</th>
                    <th className="text-center">Tổng tiền</th>
                    <th className="text-center">Hình thức thanh toán</th>
                    <th className="text-center">Trạng thái</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {registrations.map((item, index) => (
                    <tr key={index}>
                      <td className="text-center text-muted">{index + 1}</td>
                      <td className="text-center">{item?.user?.full_name}</td>
                      <td className="text-center">
                        {item?.schedule?.course?.name}
                      </td>
                      <td className="text-center">
                        {item?.schedule?.class?.name}
                      </td>
                      <td className="text-center">
                        {moment(item?.created_at).format("DD/MM/YYYY")}
                      </td>
                      <td className="text-center">1.000.000 VND</td>
                      <td className="text-center">{item?.payment_type}</td>

                      <td className="text-center">
                        <span
                          className={`badge badge-${
                            item?.status === "success" ? "success" : "danger"
                          }`}
                        >
                          {item?.status === "pending" ? "Pending" : "Success"}
                        </span>
                      </td>
                      <td className="text-center">
                        <button
                          to={`/${item.id}`}
                          className="btn btn-hover-shine btn-outline-primary border-0 btn-sm"
                        >
                          Details
                        </button>
                        <button
                          to={`${item.id}/edit`}
                          data-toggle="tooltip"
                          title="Edit"
                          data-placement="bottom"
                          className="btn btn-outline-warning border-0 btn-sm"
                        >
                          <span className="btn-icon-wrapper opacity-8">
                            <i className="fa fa-edit fa-w-20" />
                          </span>
                        </button>
                        <button
                          className="btn btn-hover-shine btn-outline-danger border-0 btn-sm"
                          type="submit"
                          data-toggle="tooltip"
                          title="Delete"
                          data-placement="bottom"
                          //   onClick={() => handleDelete(item.id)}
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
            {/* {"{"}
        {"{"}--{" "} */}
            {/* <div className="d-block card-footer">
          {"{"}
          {"{"} $posts-&gt;links('pagination::bootstrap-5') {"}"}
          {"}"}
        </div>{" "}
        --{"}"}
        {"}"} */}
          </div>
        </div>
      </div>
    </div>
  );
}
