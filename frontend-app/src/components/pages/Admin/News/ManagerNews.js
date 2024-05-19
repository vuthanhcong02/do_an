import React from "react";
import { NavLink } from "react-router-dom";
export default function ManagerNews() {
  return (
    <div className="app-main__inner">
      <div className="app-page-title">
        <div className="page-title-wrapper">
          <div className="page-title-heading">
            <div className="page-title-icon">
              <i className="pe-7s-ticket icon-gradient bg-mean-fruit" />
            </div>
            <div>
              News
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
                    <th className="text-center">Nội dung</th>
                    <th className="text-center">Tác giả</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-center text-muted">#01</td>
                    <td className="text-center">
                      <img
                        src="assets/images/avatars/7.png"
                        width={50}
                        height={50}
                        alt
                      />
                    </td>
                    <td className="text-center">Image</td>
                    <td className="text-center">Image</td>
                    <td className="text-center">Image</td>
                    <td className="text-center">
                      <a
                        href="./user-show.html"
                        className="btn btn-hover-shine btn-outline-primary border-0 btn-sm"
                      >
                        Details
                      </a>
                      <a
                        href="admin/news/edit"
                        data-toggle="tooltip"
                        title="Edit"
                        data-placement="bottom"
                        className="btn btn-outline-warning border-0 btn-sm"
                      >
                        <span className="btn-icon-wrapper opacity-8">
                          <i className="fa fa-edit fa-w-20" />
                        </span>
                      </a>
                      <form className="d-inline" action method="post">
                        <button
                          className="btn btn-hover-shine btn-outline-danger border-0 btn-sm"
                          type="submit"
                          data-toggle="tooltip"
                          title="Delete"
                          data-placement="bottom"
                          onclick="return confirm('Do you really want to delete this item?')"
                        >
                          <span className="btn-icon-wrapper opacity-8">
                            <i className="fa fa-trash fa-w-20" />
                          </span>
                        </button>
                      </form>
                    </td>
                  </tr>
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
