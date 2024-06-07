import React, { useEffect, useState } from "react";
import CourseItem from "../../components/CourseItem/CourseItem";
import { Link, NavLink, useParams } from "react-router-dom";
import { getNewsById, getNewByFeatured } from "../../services/NewsService";
import {
  getEventsById,
  getEventsByFeatured,
} from "../../services/EventService";
import { baseUrl } from "../../config";
export default function EventDetails() {
  const { id } = useParams();
  const [events, setEvents] = useState([]);
  const [eventDetails, setEventDetails] = useState({});
  //   console.log(course);

  useEffect(() => {
    fetchNewsDetails();
  }, [id]);

  const fetchNewsDetails = async () => {
    const { success, data } = await getEventsById(id);
    if (success) {
      setEventDetails(data);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    const { success, data } = await getEventsByFeatured();
    if (success) {
      setEvents(data);
    }
  };
  return (
    <div className="CourseDetails-container">
      <div className="CourseDetails-content col-8">
        <div className="CourseDetails-content-title">
          <span>Sự kiện</span>
        </div>
        <div className="CourseDetails-content-item p-3">
          <h4 className="CourseDetails-content-item-title">
            {eventDetails?.name}
          </h4>
          <p className="CourseDetails-content-item-description">
            {eventDetails?.location}
          </p>
          <img
            src={`${baseUrl}${eventDetails.image}`}
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
              __html: eventDetails?.description,
            }}
          />
        </div>
      </div>
      <div className="CourseDetails-more col-4">
        <div className="CourseDetails-more-title">
          <span>Các sự kiện khác</span>
        </div>
        {events.map((item, index) => (
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
                {item?.name}
              </span>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
