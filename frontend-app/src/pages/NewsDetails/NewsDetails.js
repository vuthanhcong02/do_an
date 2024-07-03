import React, { useEffect, useState } from "react";
import CourseItem from "../../components/CourseItem/CourseItem";
import { Link, NavLink, useParams } from "react-router-dom";
import {
  getNewsById,
  getNewByFeatured,
  getNews,
} from "../../services/NewsService";
import { baseUrl, baseUrlImage } from "../../config";
import "./NewsDetails.scss";
export default function NewsDetails() {
  const { id } = useParams();
  const [newsDetails, setNewsDetails] = useState({});
  const [newsOther, setNewsOther] = useState([]);
  //   console.log(course);

  useEffect(() => {
    fetchNewsDetails();
    fetchNews();
  }, [id]);

  const fetchNewsDetails = async () => {
    const { success, data } = await getNewsById(id);
    if (success) {
      setNewsDetails(data);
    }
  };

  const fetchNews = async () => {
    const { success, data } = await getNews();
    if (success) {
      const dataOther = data.data.filter((item) => item.id !== parseInt(id));
      setNewsOther(dataOther);
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
            src={`${baseUrlImage}${newsDetails.image}`}
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
        {newsOther.map((item, index) => (
          <NavLink
            to={`/news/${item?.id}`}
            style={{ textDecoration: "none" }}
            className="CourseDetails-more-item row"
            key={item?.id}
          >
            <div className="CourseDetails-more-item-image col-5">
              <img src={`${baseUrlImage}${item?.image}`} alt="" />
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
