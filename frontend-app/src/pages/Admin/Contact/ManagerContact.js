import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getSummary } from "../../../utils/function";
import { getContacts, deleteContact } from "../../../services/ContactService";
import { toast } from "react-toastify";
export default function ManagerContact() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const { success, data } = await getContacts();
    if (success) {
      console.log(data);
      setContacts(data?.data);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa bản ghi này?"
    );
    if (confirmDelete) {
      const { success } = await deleteContact(id);
      if (success) {
        const newContact = contacts.filter((item) => item.id !== id);
        setContacts(newContact);
        toast.success("Xóa contact thành công");
      } else {
        toast.error("Xóa contact thất bại");
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
              Contact
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
                    <th className="text-center">Tên</th>
                    <th className="text-center">Email</th>
                    <th className="text-center">Số điện thoại</th>
                    <th className="text-center">Nội dung</th>
                    <th className="text-center">Trạng thái</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((item, index) => (
                    <tr key={index}>
                      <td className="text-center text-muted">{index + 1}</td>
                      <td className="text-center">{item?.name}</td>
                      <td className="text-center">{item?.email}</td>
                      <td className="text-center">{item?.phone}</td>
                      <td className="text-center">
                        {item?.message && getSummary(item?.message)}
                      </td>
                      <td className="text-center">
                        <span
                          className={`badge badge-${
                            item?.is_read === 1 ? "success" : "danger"
                          }`}
                        >
                          {item?.is_read === 1 ? "Đã xử lý" : "Chưa xử lý"}
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
