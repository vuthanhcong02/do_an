import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { deleteUser, getUsers } from "../../../services/UserService";
import { baseUrlImage } from "../../../config";
import { toast } from "react-toastify";

export default function ManagerStudent() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { success, data } = await getUsers();
    if (success) {
      setUsers(data.data);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa bản ghi này?"
    );
    if (confirmDelete) {
      const { success, data } = await deleteUser(id);
      if (success) {
        const newUsers = users.filter((item) => item.id !== id);
        setUsers(newUsers);
        toast.success("Xóa bản ghi thành công");
      } else {
        toast.error("Xoá bản ghi thất bại");
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
              News
              <div className="page-title-subheading">
                View, create, update, delete and manage.
              </div>
            </div>
          </div>
          <div className="page-title-actions">
            <NavLink to="create">
              <button className="btn-shadow btn-hover-shine mr-3 btn btn-primary">
                <span className="btn-icon-wrapper pr-2 opacity-7">
                  <i className="fa fa-plus fa-w-20" />
                </span>
                Create
              </button>
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
                    <th className="text-center">Hình ảnh</th>
                    <th className="text-center">Họ và tên</th>
                    <th className="text-center">Email</th>
                    <th className="text-center">Giới tính</th>
                    <th className="text-center">Địa chỉ</th>
                    <th className="text-center">Số điện thoại</th>
                    <th className="text-center">Ngày sinh</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr>
                      <td className="text-center text-muted">{index + 1}</td>
                      <td className="text-center">
                        <img
                          src={
                            user?.avatar
                              ? `${baseUrlImage}${user.avatar}`
                              : "/_default-user.png"
                          }
                          width="50"
                          height="50"
                          alt=""
                        />
                      </td>
                      <td className="text-center">{user?.full_name}</td>
                      <td className="text-center">{user?.email}</td>
                      <td className="text-center">
                        {user?.gender ? "Nam" : "Nữ"}
                      </td>
                      <td className="text-center">{user?.address}</td>
                      <td className="text-center">{user?.phone}</td>
                      <td className="text-center">{user?.date_of_birthday}</td>
                      <td className="text-center">
                        <NavLink>
                          <button
                            // to={`/${item.id}`}
                            className="btn btn-hover-shine btn-outline-primary border-0 btn-sm"
                          >
                            Details
                          </button>
                        </NavLink>
                        <NavLink
                          to={`${user.id}/edit`}
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
                          onClick={() => handleDelete(user.id)}
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
