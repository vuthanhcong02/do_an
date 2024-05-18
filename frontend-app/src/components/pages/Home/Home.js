import React from "react";
import "./Home.scss";
import { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import NewsItem from "../../NewsItem/NewsItem";
import CourseItem from "../../CourseItem/CourseItem";
import EventItem from "../../EventItem/EventItem";
import { getBannersOrderByPosition } from "../../../services/BannerService";

export default function Home() {
  const [index, setIndex] = useState(0);
  const [banners, setBanners] = useState([]);
  const description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, ";
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    const fetchBanners = async () => {
      const res = await getBannersOrderByPosition();
      if (res.success === true) {
        console.log(res.banners);
        setBanners(res.banners);
      }
    };
    fetchBanners();
  }, []);
  return (
    <>
      <div className="Home-container">
        <div className="Home-slider">
          <Carousel activeIndex={index} onSelect={handleSelect}>
            {banners.map((banner, idx) => (
              <Carousel.Item key={idx}>
                <img
                  className="d-block w-100"
                  src="https://picsum.photos/900" // Sử dụng đường dẫn hình ảnh từ dữ liệu banner
                  alt={`Slide ${idx}`}
                />
                <Carousel.Caption>
                  <h3>{banner.title}</h3>{" "}
                  {/* Thay thế title bằng trường tương ứng trong dữ liệu banner */}
                  <p>{banner.description || description}</p>{" "}
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
        <div className="Home-content">
          <div className="Home-content-courses-and-news">
            <div className="Home-content-courses col-9">
              <div className="Home-content-courses-title">
                <span>Tuyển sinh khóa học</span>
              </div>
              <div className="Home-content-courses-list">
                <CourseItem description={description} />
                <CourseItem description={description} />
                <CourseItem description={description} />
                <div className="Home-content-courses-more">
                  <span>Xem thêm </span>
                </div>
              </div>
            </div>
            <div className="Home-content-news col-3">
              <div className="Home-content-news-title">
                <span>Tin nổi bật</span>
              </div>
              <div className="Home-content-news-list">
                <NewsItem />
                <NewsItem />
                <NewsItem />
                <NewsItem />
                <div className="Home-content-news-more">
                  <span>Xem thêm </span>
                </div>
              </div>
            </div>
          </div>
          <div className="Home-content-events">
            <div className="Home-content-events-title">
              <span>Sự kiện</span>
            </div>
            <div className="Home-content-events-list">
              <EventItem />
              <EventItem />
              <EventItem />
              <EventItem />
              <div className="Home-content-events-more">
                <span>Xem thêm </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
