import React, { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import {
  getEventsById,
  getEventsByFeatured,
  getEvents,
} from "../../services/EventService";
import { baseUrlImage } from "../../config";
export default function EventDetails() {
  const { id } = useParams();
  const [eventOther, setEventOther] = useState([]);
  const [eventDetails, setEventDetails] = useState({});
  //   console.log(course);

  useEffect(() => {
    fetchNewsDetails();
    fetchEvents();
  }, [id]);

  const fetchNewsDetails = async () => {
    const { success, data } = await getEventsById(id);
    if (success) {
      setEventDetails(data);
    }
  };

  const fetchEvents = async () => {
    const { success, data } = await getEvents();
    if (success) {
      const dataOther = data.data.filter((item) => item.id !== parseInt(id));
      setEventOther(dataOther);
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
            src={`${baseUrlImage}${eventDetails.image}`}
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
        {eventOther.map((item, index) => (
          <NavLink
            to={`/events/${item?.id}`}
            style={{ textDecoration: "none" }}
            className="CourseDetails-more-item row"
            key={item?.id}
          >
            <div className="CourseDetails-more-item-image col-5">
              <img src={`${baseUrlImage}${item?.image}`} alt="" />
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
