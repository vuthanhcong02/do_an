import React from "react";
import "./Home.scss";
import { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import NewsItem from "../../components/NewsItem/NewsItem";
import CourseItem from "../../components/CourseItem/CourseItem";
import EventItem from "../../components/EventItem/EventList";
import { getBannersOrderByPosition } from "../../services/BannerService";
import { getSummary } from "../../utils/function";
import { getNewsOrderById, getNewByFeatured } from "../../services/NewsService";
import { getCourseOrderById } from "../../services/CourseService";
import { getEventsByFeatured } from "../../services/EventService";
import { baseUrl, baseUrlImage } from "../../config";
import NewList from "../../components/NewList/NewList";
import EventList from "../../components/EventItem/EventList";
import { NavLink } from "react-router-dom";
export default function Home() {
  const [index, setIndex] = useState(0);
  const [banners, setBanners] = useState([]);
  const [newsFeatured, setNewsFeatured] = useState([]);
  const [courses, setCourses] = useState([]);
  const [events, setEvents] = useState([]);
  const [newses, setNews] = useState([]);
  console.log("Newses", newsFeatured);
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    const res = await getBannersOrderByPosition();
    if (res.success === true) {
      console.log(res.data);
      setBanners(res.data);
    }
  };

  useEffect(() => {
    fetchNewsFeatured();
  }, []);

  const fetchNewsFeatured = async () => {
    const res = await getNewByFeatured();
    if (res.success === true) {
      console.log(res.data);
      setNewsFeatured(res.data);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    const res = await getNewsOrderById();
    if (res.success === true) {
      console.log(res.data);
      setNews(res.data);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const res = await getCourseOrderById();
    if (res.success === true) {
      console.log("Courses", res.data);
      setCourses(res.data);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const res = await getEventsByFeatured();
    if (res.success === true) {
      console.log("Events", res.data);
      setEvents(res.data);
    }
  };
  return (
    <>
      <div className="Home-container">
        <div className="Home-slider">
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
        <div className="Home-content">
          <div className="Home-content-courses-and-news">
            <div className="Home-content-courses col-8">
              <div className="Home-content-courses-title">
                <span>Khóa học</span>
              </div>
              <div className="Home-content-courses-list">
                {courses.map((course, idx) => (
                  <CourseItem key={idx} course={course} />
                ))}
                <div className="Home-content-courses-more">
                  <span>
                    <NavLink to="/english-courses">Xem thêm </NavLink>
                  </span>
                </div>
              </div>
            </div>
            <div className="Home-content-news col-4">
              <div className="Home-content-news-title">
                <span>Tin nổi bật</span>
              </div>
              <div className="Home-content-news-list">
                {newsFeatured.map((item, idx) => (
                  <NewsItem key={idx} news={item} />
                ))}
                <div className="Home-content-news-more">
                  <span>
                    <NavLink to="/news">Xem thêm</NavLink>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="Home-content-events">
            <div className="Home-content-events-title">
              <span>Sự kiện</span>
            </div>
            <div className="Home-content-events-list">
              {events.map((event, idx) => (
                <EventList key={idx} event={event} />
              ))}
              <div className="Home-content-events-more">
                <span>
                  <NavLink to="/events">Xem thêm</NavLink>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
