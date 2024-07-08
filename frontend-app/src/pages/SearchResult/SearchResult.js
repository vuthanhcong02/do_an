import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { getBanners } from "../../services/BannerService";
import { Carousel } from "react-bootstrap";
import { baseUrlImage } from "../../config";
import "./SearchResult.scss";
import axios from "axios";
import CourseItem from "../../components/CourseItem/CourseItem";
import NewsItem from "../../components/NewsItem/NewsItem";
import EventList from "../../components/EventItem/EventList";
export default function SearchResult() {
  const [index, setIndex] = useState(0);
  const [banners, setBanners] = useState([]);

  const [results, setResults] = useState({ courses: [], news: [], events: [] });
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    const { success, data } = await getBanners();
    if (success) {
      setBanners(data.data);
    }
  };

  useEffect(() => {
    fetchResults();
  }, [query]);

  const fetchResults = async () => {
    const res = await axios.get(
      `http://api.ngoaingutinhoc.tech.com/api/search?query=${query}`
    );
    setResults(res.data);
  };

  console.log(results);
  return (
    <div className="Search-container">
      <div className="Search-page-slider">
        <Carousel activeIndex={index} onSelect={handleSelect}>
          {banners.map((banner, idx) => (
            <Carousel.Item key={idx}>
              <img
                className="d-block w-100"
                src={`${baseUrlImage}${banner.image}`}
                alt={`Slide ${idx}`}
              />
              <Carousel.Caption>
                <h3>{banner.title}</h3> <p>{banner.description || null}</p>{" "}
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
      <div className="Search-page-content">
        <div className="Search-content-title">
          <span>Kết quả tìm kiếm cho từ khóa : {query}</span>
        </div>
        <div className="Search-content-list">
          {results.courses.length > 0 ||
          results.news.length > 0 ||
          results.events.length > 0 ? (
            <div className="search-results">
              {results.courses.length > 0 &&
                results.courses.map((course) => <CourseItem course={course} />)}

              {results.news.length > 0 &&
                results.news.map((news) => <NewsItem news={news} />)}

              {results.events.length > 0 &&
                results.events.map((event) => <EventList event={event} />)}
            </div>
          ) : (
            <div className="no-results">
              {query.trim() && <p>Không có kết quả tìm kiếm phù hợp.</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
