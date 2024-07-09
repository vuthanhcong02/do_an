import React, { useEffect, useState } from "react";
import "./CourseRegister.scss";
import { Tab, Tabs } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faDollarSign,
} from "@fortawesome/free-solid-svg-icons";
import { faIdCard } from "@fortawesome/free-regular-svg-icons";
import ItemCourseRegister from "./ItemCourseRegister";
import ItemUserRegister from "./ItemUserRegister";
import ItemPaymentRegister from "./ItemPaymentRegister";
import { getCourseBySlug } from "../../services/CourseService";
import { getScheduleById } from "../../services/ScheduleService";
export default function CourseRegister() {
  const { slug, schedule_id } = useParams();
  const [course, setCourse] = useState({});
  const [schedule, setSchedule] = useState({});
  const [activeTab, setActiveTab] = useState("course_information");
  const [disabledTabs, setDisabledTabs] = useState({
    course_information: false,
    profile_information: true,
    payment_information: true,
  });
  const [user, setUser] = useState({});

  console.log("course: ", course);
  const handleSetUser = (data) => {
    setUser(data);
  };
  useEffect(() => {
    fetchCourse(slug, schedule_id);
    fetchSchedule();
  }, [slug, schedule_id]);
  const fetchCourse = async () => {
    const { success, data } = await getCourseBySlug(slug);
    if (success) {
      console.log(data);
      setCourse(data);
    }
  };
  const fetchSchedule = async () => {
    const { success, data } = await getScheduleById(schedule_id);
    if (success) {
      setSchedule(data);
    }
  };

  const handleContinue = (key) => {
    setActiveTab(key);
    setDisabledTabs((prevState) => ({
      ...prevState,
      [key]: false,
    }));
  };
  return (
    <div className="CourseRegister_container">
      <div className="CourseRegister_content">
        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab
            eventKey="course_information"
            title={
              <>
                <FontAwesomeIcon icon={faCalendarDays} />
                <span className="p-3">Thông tin khóa học</span>
              </>
            }
            disabled={disabledTabs.course_information}
          >
            <ItemCourseRegister
              course={course}
              schedule={schedule}
              handleContinue={handleContinue}
            />
          </Tab>
          <Tab
            eventKey="profile_information"
            title={
              <>
                <FontAwesomeIcon icon={faIdCard} />
                <span className="p-3">Thông tin học viên</span>
              </>
            }
            disabled={disabledTabs.profile_information}
          >
            <ItemUserRegister
              handleContinue={handleContinue}
              schedule={schedule}
              handleSetUser={handleSetUser}
            />
          </Tab>
          <Tab
            eventKey="payment_information"
            title={
              <>
                <FontAwesomeIcon icon={faDollarSign} />
                <span className="p-3">Thông tin thanh toán</span>
              </>
            }
            disabled={disabledTabs.payment_information}
          >
            <ItemPaymentRegister
              course={course}
              schedule={schedule}
              user={user}
            />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
