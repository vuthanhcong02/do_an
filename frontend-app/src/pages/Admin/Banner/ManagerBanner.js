import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getBanners, deleteBanner } from "../../../services/BannerService";
import { baseUrl } from "../../../config";
import { toast } from "react-toastify";
export default function ManagerBanner() {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      const { success, data } = await getBanners();
      if (success) {
        console.log(data);
        setBanners(data.data);
      }
    };
    fetchBanners();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa bản ghi này?"
    );
    if (confirmDelete) {
      const { success, data } = await deleteBanner(id);
      if (success) {
        const newBanners = banners.filter((item) => item.id !== id);
        setBanners(newBanners);
        toast.success("Xóa banner thành công");
      } else {
        toast.error("Xoá banner thất bại");
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
              Banner
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
                    <th className="text-center">Title</th>
                    <th className="text-center">Số thứ xuất hiện</th>
                    <th className="text-center">Trạng thái</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {banners.length > 0 &&
                    banners.map((banner, index) => (
                      <tr key={banner?.id}>
                        <td className="text-center text-muted">{index + 1}</td>
                        <td className="text-center">
                          <img
                            src={`${baseUrl}${banner?.image}`}
                            style={{
                              width: "100px",
                              height: "70px",
                              objectFit: "cover",
                            }}
                          />
                        </td>
                        <td className="text-center">{banner?.title}</td>
                        <td className="text-center">{banner?.position}</td>
                        <td className="text-center">
                          <span
                            className={`badge badge-${
                              banner?.status === 1 ? "success" : "danger"
                            }`}
                          >
                            {banner?.status === 1 ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="text-center">
                          <NavLink
                            to={`${banner?.id}/edit`}
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
                            // onclick="return confirm('Do you really want to delete this item?')"
                            onClick={() => handleDelete(banner?.id)}
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

            <div className="d-block card-footer">
              {/* {"{"}
              {"{"} $posts-&gt;links('pagination::bootstrap-5') {"}"} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
