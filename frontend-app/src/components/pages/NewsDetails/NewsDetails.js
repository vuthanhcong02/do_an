import React, { useEffect, useState } from "react";
import CourseItem from "../../CourseItem/CourseItem";
import { Link, NavLink, useParams } from "react-router-dom";
import { getNewsById, getNewByFeatured } from "../../../services/NewsService";
import { baseUrl } from "../../../config";
export default function NewsDetails() {
  const { id } = useParams();
  const [news, setNews] = useState([]);
  const [newsDetails, setNewsDetails] = useState({});
  //   console.log(course);

  useEffect(() => {
    fetchNewsDetails();
  }, [id]);

  const fetchNewsDetails = async () => {
    const { success, data } = await getNewsById(id);
    if (success) {
      setNewsDetails(data);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    const { success, data } = await getNewByFeatured();
    if (success) {
      setNews(data);
    }
  };
  return (
    <div className="CourseDetails-container">
      <div className="CourseDetails-content col-8">
        <div className="CourseDetails-content-title">
          <span>Tin tức</span>
        </div>
        <div className="CourseDetails-content-item p-3">
          <h4 className="CourseDetails-content-item-title">
            {newsDetails.title}
          </h4>
          <p className="CourseDetails-content-item-description">
            {newsDetails.sub_description}
          </p>
          <img
            src={`${baseUrl}${newsDetails.image}`}
            alt=""
            style={{
              width: "100%",
              height: "400px",
              objectFit: "fill",
              marginTop: "20px",
            }}
          />
          <div
            className="CourseDetails-content-item-content"
            dangerouslySetInnerHTML={{
              __html: newsDetails.content,
            }}
          />
        </div>
      </div>
      <div className="CourseDetails-more col-4">
        <div className="CourseDetails-more-title">
          <span>Các tin tức khác</span>
        </div>
        {news.map((item, index) => (
          <NavLink
            to={`/news/${item?.id}`}
            style={{ textDecoration: "none" }}
            className="CourseDetails-more-item row"
            key={item?.id}
          >
            <div className="CourseDetails-more-item-image col-5">
              <img src={`${baseUrl}${item?.image}`} alt="" />
            </div>
            <div className="CourseDetails-more-item-content col-7">
              <span className="CourseDetails-more-item-title">
                {item?.title}
              </span>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
