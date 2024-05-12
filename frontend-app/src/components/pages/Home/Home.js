import React from "react";
import "./Home.scss";
import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import NewsItem from "../../NewsItem/NewsItem";
import CourseItem from "../../CourseItem/CourseItem";
import EventItem from "../../EventItem/EventItem";
export default function Home() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  return (
    <>
      <div className="Home-container">
        <div className="Home-slider">
          <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
              {/* <ExampleCarouselImage text="First slide" /> */}
              <img
                className="d-block w-100"
                src="https://picsum.photos/900"
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className=""
                src="https://picsum.photos/900"
                alt="First slide"
              />

              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://picsum.photos/900"
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
        <div className="Home-content">
          <div className="Home-content-courses-and-news">
            <div className="Home-content-courses col-9">
              <div className="Home-content-courses-title">
                <span>Tuyển sinh khóa học</span>
              </div>
              <div className="Home-content-courses-list">
                <CourseItem />
                <CourseItem />
                <CourseItem />
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
