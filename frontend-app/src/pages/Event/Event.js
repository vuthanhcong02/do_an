import React, { useState, useEffect } from "react";
import "../News/News.scss";
import NewsItem from "../../components/NewsItem/NewsItem";
import { Link, useNavigate } from "react-router-dom";
import { getNews, getNewByFeatured } from "../../services/NewsService";
import { getEvents } from "../../services/EventService";
import NewList from "../../components/NewList/NewList";
import EventList from "../../components/EventItem/EventList";
import Paginate from "../../components/Paginate/Paginate";
export default function Event() {
  const [events, setEvents] = useState([]);
  const [newsFeatured, setNewsFeatured] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    fetchNewsFeatured();
    fetchNews();
  }, []);

  const fetchNewsFeatured = async () => {
    const res = await getNewByFeatured();
    if (res.success === true) {
      console.log("Featured", res?.data);
      setNewsFeatured(res?.data);
    }
  };

  const fetchNews = async (page) => {
    const res = await getEvents(page || 1);
    if (res.success === true) {
      console.log(res?.data);
      setEvents(res?.data?.data);
      setPageCount(res?.data?.last_page);
      navigate(`/events?page=${page || 1}`);
    }
  };

  const handlePageClick = (data) => {
    const currentPage = data.selected + 1;
    fetchNews(currentPage);
  };
  return (
    <div className="News-container row">
      <div className="News-content col-md-9">
        <div className="News-content-title">
          <span>Sự kiện</span>
        </div>
        <div className="News-content-item">
          {/* <EventItem /> */}
          {events?.map((item, index) => {
            return <EventList key={index} event={item} />;
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
      <div className="News-content-feature col-md-3">
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
