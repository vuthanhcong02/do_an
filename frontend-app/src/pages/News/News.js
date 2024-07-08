import React, { useState, useEffect } from "react";
import "./News.scss";
import NewsItem from "../../components/NewsItem/NewsItem";
import EventItem from "../../components/EventItem/EventList";
import { useNavigate } from "react-router-dom";
import { getNews, getNewByFeatured } from "../../services/NewsService";
import NewList from "../../components/NewList/NewList";
import Paginate from "../../components/Paginate/Paginate";
export default function News() {
  const [news, setNews] = useState([]);
  const [newsFeatured, setNewsFeatured] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNewsFeatured = async () => {
      const res = await getNewByFeatured();
      if (res.success === true) {
        console.log("Featured", res.data);
        setNewsFeatured(res.data);
      }
    };
    fetchNewsFeatured();
  }, []);

  useEffect(() => {
    fetchNews();
  }, []);
  const fetchNews = async (page) => {
    const res = await getNews(page || 1);
    if (res.success === true) {
      console.log(res.data);
      setNews(res.data.data);
      setPageCount(res.data.last_page);
      navigate(`/news?page=${page || 1}`);
    }
  };

  const handlePageClick = (data) => {
    const currentPage = data.selected + 1;
    fetchNews(currentPage);
  };
  return (
    <div className="News-container row">
      <div className="News-content col-md-8">
        <div className="News-content-title">
          <span>Tin tức</span>
        </div>
        <div className="News-content-item">
          {news.map((item, index) => {
            return <NewList key={index} news={item} />;
          })}

          <div className="News-content-pagination mt-3">
            <ul class="pagination justify-content-end">
              <Paginate
                pageCount={pageCount}
                handlePageClick={handlePageClick}
              />
            </ul>
          </div>
        </div>
      </div>
      <div className="News-content-feature col-md-4">
        <div className="News-content-feature-title">
          <span>Nổi bật</span>
        </div>
        <div className="News-content-feature-item">
          {newsFeatured.map((news, idx) => (
            <NewsItem key={idx} news={news} />
          ))}
          {/* <NewsItem /> */}
        </div>
      </div>
    </div>
  );
}
