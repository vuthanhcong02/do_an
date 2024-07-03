import React, { useEffect, useState } from "react";
import Paginate from "../../../components/Paginate/Paginate";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
  getNotificationTypes,
  deleteNotificationType,
} from "../../../services/NotificationTypeService";
import { toast } from "react-toastify";
import moment from "moment";

export default function ManagerNotificationType() {
  const { id } = useParams();
  const [notificationTypes, setNotificationTypes] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotificationTypes();
  }, []);

  const fetchNotificationTypes = async (page) => {
    const { success, data } = await getNotificationTypes(page || 1);
    if (success) {
      console.log(data);
      setNotificationTypes(data.data);
      setPageCount(data.last_page);
      //   navigate(`/admin/notification-types?page=${page || 1}`);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bạn có muốn xoá loại thông báo này?");
    if (confirmDelete) {
      const { success } = await deleteNotificationType(id);
      if (success) {
        const newNotificationTypes = notificationTypes.filter(
          (item) => item.id !== id
        );
        setNotificationTypes(newNotificationTypes);
        toast.success("Xoá bản ghi thành công");
      } else {
        toast.error("Xoá bản ghi thất bại");
      }
    }
  };
  const handlePageClick = (data) => {
    const currentPage = data.selected + 1;
    fetchNotificationTypes(currentPage);
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
              Notification Type
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
                    <th className="text-center">Ngày tạo</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {notificationTypes.map((item, index) => (
                    <tr key={index}>
                      <td className="text-center text-muted">{index + 1}</td>

                      <td className="text-center">{item?.name}</td>

                      <td className="text-center">
                        {moment(item?.created_at).format("DD/MM/YYYY")}
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
