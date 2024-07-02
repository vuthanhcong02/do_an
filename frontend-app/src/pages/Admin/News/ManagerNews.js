import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getNews, deleteNews } from "../../../services/NewsService";
import { baseUrl, baseUrlImage } from "../../../config";
import { getSummary } from "../../../utils/function";
import { toast } from "react-toastify";
import Paginate from "../../../components/Paginate/Paginate";
export default function ManagerNews() {
  const [news, setNews] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async (page) => {
    const { success, data } = await getNews(page || 1);
    if (success) {
      console.log(data);
      setNews(data.data);
      setPageCount(data.last_page);
      navigate(`/admin/news?page=${page || 1}`);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa bản ghi này?"
    );
    if (confirmDelete) {
      const { success } = await deleteNews(id);
      if (success) {
        const newNews = news.filter((item) => item.id !== id);
        setNews(newNews);
        toast.succes("Xóa news thành công");
      } else {
        toast.error("Xóa news thất bại");
      }
    }
  };

  const handlePageClick = (data) => {
    const currentPage = data.selected + 1;
    fetchNews(currentPage);
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
                    <th className="text-center">Tiêu đề</th>
                    <th className="text-center">Nội dung</th>
                    <th className="text-center">Featured</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {news.map((item, index) => (
                    <tr key={index}>
                      <td className="text-center text-muted">{index + 1}</td>
                      <td className="text-center">
                        <img
                          src={`${baseUrlImage}${item?.image}`}
                          alt=""
                          width={100}
                          height={70}
                        />
                      </td>
                      <td className="text-center">{item.title}</td>
                      <td
                        className="text-center"
                        dangerouslySetInnerHTML={{
                          __html: getSummary(item.content),
                        }}
                      />
                      <td className="text-center">
                        {" "}
                        <span
                          className={`badge badge-${
                            item?.featured === 1 ? "success" : "danger"
                          }`}
                        >
                          {item?.featured === 1 ? "Featured" : "Not Featured"}
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
