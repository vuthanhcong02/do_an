import React, { useState, useEffect } from "react";
import "../News/News.scss";
import NewsItem from "../../components/NewsItem/NewsItem";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { getEvents, getEventsByFeatured } from "../../services/EventService";
import NewList from "../../components/NewList/NewList";
import EventList from "../../components/EventItem/EventList";
import Paginate from "../../components/Paginate/Paginate";
import { baseUrlImage } from "../../config";
export default function Event() {
  const [events, setEvents] = useState([]);
  const [eventsFeatured, setEventsFeatured] = useState([]);

  const [pageCount, setPageCount] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    fetchNewsFeatured();
    fetchNews();
  }, []);

  const fetchNewsFeatured = async () => {
    const res = await getEventsByFeatured();
    if (res.success === true) {
      console.log("Featured", res?.data);
      setEventsFeatured(res?.data);
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
      <div className="News-content col-md-8">
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
      <div className="News-content-feature col-md-4">
        <div className="News-content-feature-title">
          <span>Sự kiện khác</span>
        </div>
        <div className="News-content-feature-item">
          {eventsFeatured.map((item, idx) => (
            // <EventList key={idx} event={events} />
            <NavLink
              to={`/events/${item?.slug}`}
              style={{ textDecoration: "none" }}
              className="CourseDetails-more-item row p-2"
              key={item?.id}
            >
              <div className="CourseDetails-more-item-image col-4">
                <img
                  src={`${baseUrlImage}${item?.image}`}
                  alt=""
                  height={90}
                  width={120}
                />
              </div>
              <div className="CourseDetails-more-item-content col-8">
                <span
                  className="CourseDetails-more-item-title text-black"
                  style={{
                    fontSize: "13px",
                    hover: { textDecoration: "underline" },
                  }}
                >
                  {item?.name}
                </span>
              </div>
            </NavLink>
          ))}
          {/* <NewsItem /> */}
        </div>
      </div>
    </div>
  );
}
