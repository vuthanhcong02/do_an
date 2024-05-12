import React from "react";
import "./News.scss";
import NewsItem from "../../NewsItem/NewsItem";
import EventItem from "../../EventItem/EventItem";
import { Link } from "react-router-dom";
export default function News() {
  const news = [1, 2, 3, 4, 5, 6];
  return (
    <div className="News-container row">
      <div className="News-content col-md-9">
        <div className="News-content-title">
          <span>Tin tức sự kiện</span>
        </div>
        <div className="News-content-item">
          <EventItem />
          <EventItem />
          <EventItem />
          <EventItem />
          <EventItem />
          <EventItem />
          <EventItem />
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
          <NewsItem />
          <NewsItem />
          <NewsItem />
          <NewsItem />
        </div>
      </div>
    </div>
  );
}
