import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getEvents, deleteEvent } from "../../../services/EventService";
import { baseUrl } from "../../../config";
import { getSummary } from "../../../utils/function";
export default function ManagerEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    const { success, data } = await getEvents();
    if (success) {
      console.log(data);
      setEvents(data.data);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDelete) {
      const { success } = await deleteEvent(id);
      if (success) {
        const newEvents = events.filter((item) => item.id !== id);
        setEvents(newEvents);
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
              Events
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
                    <th className="text-center">Hỉnh ảnh</th>
                    <th className="text-center">Tiêu đề</th>
                    <th className="text-center">Địa điểm</th>
                    <th className="text-center">Ngay diễn ra</th>
                    <th className="text-center">Thời gian</th>
                    <th className="text-center">Status</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((item, index) => (
                    <tr key={index}>
                      <td className="text-center text-muted">{index + 1}</td>
                      <td className="text-center">
                        <img
                          src={`${baseUrl}${item?.image}`}
                          width={100}
                          height={70}
                          alt
                        />
                      </td>
                      <td className="text-center">{item.name}</td>
                      <td className="text-center">{item.location}</td>
                      <td className="text-center">{item.start_date}</td>
                      <td className="text-center">
                        {item.start_time}-{item.end_time}
                      </td>

                      <td className="text-center">
                        {" "}
                        <span
                          className={`badge badge-${
                            item?.status === 1 ? "success" : "danger"
                          }`}
                        >
                          {item?.status === 1 ? "Featured" : "Not Featured"}
                        </span>
                      </td>
                      <td className="text-center">
                        <NavLink
                          to={`/${item.id}`}
                          className="btn btn-hover-shine btn-outline-primary border-0 btn-sm"
                        >
                          Details
                        </NavLink>
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