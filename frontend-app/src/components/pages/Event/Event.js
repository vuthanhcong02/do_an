import React, { useState, useEffect } from "react";
import "../News/News.scss";
import NewsItem from "../../NewsItem/NewsItem";
import { Link } from "react-router-dom";
import { getNews, getNewByFeatured } from "../../../services/NewsService";
import { getEvents } from "../../../services/EventService";
import NewList from "../../NewList/NewList";
import EventList from "../../EventItem/EventList";
export default function Event() {
  const [events, setEvents] = useState([]);
  const [newsFeatured, setNewsFeatured] = useState([]);

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
    const fetchNews = async () => {
      const res = await getEvents();
      if (res.success === true) {
        console.log(res.data);
        setEvents(res.data.data);
      }
    };
    fetchNews();
  }, []);
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
              <li class="page-item disabled">
                <Link
                  class="page-link"
                  href="#"
                  tabindex="-1"
                  aria-disabled="true"
                >
                  &#60;
                </Link>
              </li>
              <li class="page-item active">
                <Link class="page-link" href="#">
                  1
                </Link>
              </li>
              <li class="page-item">
                <Link class="page-link" href="#">
                  2
                </Link>
              </li>
              <li class="page-item">
                <Link class="page-link" href="#">
                  3
                </Link>
              </li>
              <li class="page-item">
                <Link class="page-link" href="#">
                  &#62;
                </Link>
              </li>
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
