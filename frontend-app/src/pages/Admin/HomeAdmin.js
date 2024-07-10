import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faCalendarPlus,
  faHourglassHalf,
  faMessage,
  faMoneyBill,
  faNewspaper,
  faSackDollar,
  faTicket,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import {
  getCountContacts,
  getCountCourses,
  getCountEvents,
  getCountExams,
  getCountNews,
  getCountRegistrationsWithStatusPending,
  getCountRegistrationsWithStatusSuccess,
  getTotalPriceRegistrationsWithStatusSuccess,
  getCountExamRegistrationsWithStatusSuccess,
  getCountExamRegistrationsWithStatusPending,
  getTotalFeeExamRegistrationsWithStatusSuccess,
} from "../../services/DashboardService";
import { formatPrice } from "../../utils/function";
export default function HomeAdmin() {
  const navigate = useNavigate();
  const [countCourse, setCountCourse] = React.useState(0);
  const [countNews, setCountNews] = React.useState(0);
  const [countEvent, setCountEvent] = React.useState(0);
  const [countExam, setCountExam] = React.useState(0);
  const [countContact, setCountContact] = React.useState(0);
  const [countRegistrationSuccess, setCountRegistrationSuccess] =
    React.useState(0);
  const [countRegistrationPending, setCountRegistrationPending] =
    React.useState(0);
  const [totalPriceRegistration, setTotalPriceRegistration] = React.useState(0);
  const [countExamRegistrationSuccess, setCountExamRegistrationSuccess] =
    React.useState(0);
  const [countExamRegistrationPending, setCountExamRegistrationPending] =
    React.useState(0);
  const [totalFeeExamRegistration, setTotalFeeExamRegistration] =
    React.useState(0);

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    fetchCountCourse();
    fetchCountNews();
    fetchCountEvent();
    fetchCountExam();
    fetchCountContact();
    fetchCountRegistrationSuccess();
    fetchCountRegistrationPending();
    fetchTotalPrice();
    fetchCountExamRegistrationSuccess();
    fetchCountExamRegistrationPending();
    fetchTotalFeeExamRegistration();
  }, []);

  const fetchCountCourse = async () => {
    const { success, data } = await getCountCourses();
    if (success) {
      setCountCourse(data);
    }
  };

  const fetchCountNews = async () => {
    const { success, data } = await getCountNews();
    if (success) {
      setCountNews(data);
    }
  };

  const fetchCountEvent = async () => {
    const { success, data } = await getCountEvents();
    if (success) {
      setCountEvent(data);
    }
  };

  const fetchCountExam = async () => {
    const { success, data } = await getCountExams();
    if (success) {
      setCountExam(data);
    }
  };

  const fetchCountContact = async () => {
    const { success, data } = await getCountContacts();
    if (success) {
      setCountContact(data);
    }
  };

  const fetchCountRegistrationSuccess = async () => {
    const { success, data } = await getCountRegistrationsWithStatusSuccess();
    if (success) {
      setCountRegistrationSuccess(data);
    }
  };

  const fetchCountRegistrationPending = async () => {
    const { success, data } = await getCountRegistrationsWithStatusPending();
    if (success) {
      setCountRegistrationPending(data);
    }
  };

  const fetchTotalPrice = async () => {
    const { success, data } =
      await getTotalPriceRegistrationsWithStatusSuccess();
    if (success) {
      setTotalPriceRegistration(data);
    }
  };

  const fetchCountExamRegistrationSuccess = async () => {
    const { success, data } =
      await getCountExamRegistrationsWithStatusSuccess();
    if (success) {
      setCountExamRegistrationSuccess(data);
    }
  };

  const fetchCountExamRegistrationPending = async () => {
    const { success, data } =
      await getCountExamRegistrationsWithStatusPending();
    if (success) {
      setCountExamRegistrationPending(data);
    }
  };

  const fetchTotalFeeExamRegistration = async () => {
    const { success, data } =
      await getTotalFeeExamRegistrationsWithStatusSuccess();
    if (success) {
      setTotalFeeExamRegistration(data);
    }
  };

  return (
    <>
      <div className="app-main__inner">
        <div className="app-page-title">
          <div className="page-title-wrapper">
            <div className="page-title-heading">
              <div className="page-title-icon">
                <i className="pe-7s-ticket icon-gradient bg-mean-fruit" />
              </div>
              <div>Dashboard</div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive d-flex row align-items-center justify-content-start">
              <div className="col-md-3">
                <Card
                  bg="secondary"
                  key={"secondary"}
                  className="mb-2"
                  style={{ height: "12rem" }}
                >
                  <Card.Header className="d-flex justify-content-center text-white">
                    Tổng số khóa học
                  </Card.Header>
                  <Card.Body className="d-flex justify-content-center text-white p-3">
                    <Card.Text
                      style={{
                        fontSize: "30px",
                        fontWeight: "bold",
                        marginRight: "10px",
                      }}
                    >
                      {countCourse}
                    </Card.Text>

                    <Card.Text style={{ fontSize: "30px", fontWeight: "bold" }}>
                      <FontAwesomeIcon icon={faBook} />
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-md-3">
                <Card
                  bg="info"
                  key={"info"}
                  className="mb-2"
                  style={{ height: "12rem" }}
                >
                  <Card.Header className="d-flex justify-content-center text-white">
                    Tổng số bài viết tin tức
                  </Card.Header>
                  <Card.Body className="d-flex justify-content-center text-white p-3">
                    <Card.Text
                      style={{
                        fontSize: "30px",
                        fontWeight: "bold",
                        marginRight: "10px",
                      }}
                    >
                      {countNews}
                    </Card.Text>

                    <Card.Text style={{ fontSize: "30px", fontWeight: "bold" }}>
                      <FontAwesomeIcon icon={faNewspaper} />
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>

              <div className="col-md-3">
                <Card
                  bg="danger"
                  key={"danger"}
                  className="mb-2"
                  style={{ height: "12rem" }}
                >
                  <Card.Header className="d-flex justify-content-center text-white">
                    Tổng số bài viết sự kiện
                  </Card.Header>
                  <Card.Body className="d-flex justify-content-center text-white p-3">
                    <Card.Text
                      style={{
                        fontSize: "30px",
                        fontWeight: "bold",
                        marginRight: "10px",
                      }}
                    >
                      {countEvent}
                    </Card.Text>

                    <Card.Text style={{ fontSize: "30px", fontWeight: "bold" }}>
                      <FontAwesomeIcon icon={faCalendarPlus} />
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-md-3">
                <Card
                  bg="info"
                  key={"info"}
                  className="mb-2"
                  style={{ height: "12rem" }}
                >
                  <Card.Header className="d-flex justify-content-center text-white">
                    Tổng số cuộc thi
                  </Card.Header>
                  <Card.Body className="d-flex justify-content-center text-white p-3">
                    <Card.Text
                      style={{
                        fontSize: "30px",
                        fontWeight: "bold",
                        marginRight: "10px",
                      }}
                    >
                      {countExam}
                    </Card.Text>

                    <Card.Text style={{ fontSize: "30px", fontWeight: "bold" }}>
                      <FontAwesomeIcon icon={faTrophy} />
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>

              <div className="col-md-3 mt-5">
                <Card
                  bg="info"
                  key={"info"}
                  className="mb-2"
                  style={{ height: "12rem" }}
                >
                  <Card.Header className="d-flex justify-content-center text-white">
                    Tổng số liên hệ
                  </Card.Header>
                  <Card.Body className="d-flex justify-content-center text-white p-3">
                    <Card.Text
                      style={{
                        fontSize: "30px",
                        fontWeight: "bold",
                        marginRight: "10px",
                      }}
                    >
                      {countContact}
                    </Card.Text>

                    <Card.Text style={{ fontSize: "30px", fontWeight: "bold" }}>
                      <FontAwesomeIcon icon={faMessage} />
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>

              <div className="col-md-3 mt-5">
                <Card
                  bg="success"
                  key={"success"}
                  className="mb-2"
                  style={{ height: "12rem" }}
                >
                  <Card.Header className="d-flex justify-content-center text-white">
                    Lượt đăng kí khóa học thành công( Đã thanh toán)
                  </Card.Header>
                  <Card.Body className="d-flex justify-content-center text-white p-3">
                    <Card.Text
                      style={{
                        fontSize: "30px",
                        fontWeight: "bold",
                        marginRight: "10px",
                      }}
                    >
                      {countRegistrationSuccess}
                    </Card.Text>

                    <Card.Text style={{ fontSize: "30px", fontWeight: "bold" }}>
                      <FontAwesomeIcon icon={faTicket} />
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-md-3 mt-5">
                <Card
                  bg="warning"
                  key={"warning"}
                  className="mb-2"
                  style={{ height: "12rem" }}
                >
                  <Card.Header className="d-flex justify-content-center text-white">
                    Lượt đăng kí khóa học chờ thanh toán
                  </Card.Header>
                  <Card.Body className="d-flex justify-content-center text-white p-3">
                    <Card.Text
                      style={{
                        fontSize: "30px",
                        fontWeight: "bold",
                        marginRight: "10px",
                      }}
                    >
                      {countRegistrationPending}
                    </Card.Text>

                    <Card.Text style={{ fontSize: "30px", fontWeight: "bold" }}>
                      <FontAwesomeIcon icon={faHourglassHalf} />
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-md-3 mt-5">
                <Card
                  bg="success"
                  key={"success"}
                  className="mb-2"
                  style={{ height: "12rem" }}
                >
                  <Card.Header className="d-flex justify-content-center text-white">
                    Lượt đăng kí thi thành công( Đã thanh toán)
                  </Card.Header>
                  <Card.Body className="d-flex justify-content-center text-white p-3">
                    <Card.Text
                      style={{
                        fontSize: "30px",
                        fontWeight: "bold",
                        marginRight: "10px",
                      }}
                    >
                      {countRegistrationSuccess}
                    </Card.Text>

                    <Card.Text style={{ fontSize: "30px", fontWeight: "bold" }}>
                      <FontAwesomeIcon icon={faTicket} />
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>

              <div className="col-md-3 mt-5">
                <Card
                  bg="warning"
                  key={"warning"}
                  className="mb-2"
                  style={{ height: "12rem" }}
                >
                  <Card.Header className="d-flex justify-content-center text-white">
                    Lượt đăng kí thi chờ thanh toán
                  </Card.Header>
                  <Card.Body className="d-flex justify-content-center text-white p-3">
                    <Card.Text
                      style={{
                        fontSize: "30px",
                        fontWeight: "bold",
                        marginRight: "10px",
                      }}
                    >
                      {countRegistrationPending}
                    </Card.Text>

                    <Card.Text style={{ fontSize: "30px", fontWeight: "bold" }}>
                      <FontAwesomeIcon icon={faHourglassHalf} />
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-md-3 mt-5">
                <Card
                  bg="dark"
                  key={"dark"}
                  className="mb-2"
                  style={{ height: "12rem" }}
                >
                  <Card.Header className="d-flex justify-content-center text-white">
                    Tổng doanh thu đăng kí học
                  </Card.Header>
                  <Card.Body className="d-flex justify-content-center text-white p-3">
                    <Card.Text
                      style={{
                        fontSize: "30px",
                        fontWeight: "bold",
                        marginRight: "10px",
                      }}
                    >
                      {totalPriceRegistration &&
                        formatPrice(totalPriceRegistration)}
                    </Card.Text>

                    <Card.Text style={{ fontSize: "30px", fontWeight: "bold" }}>
                      <FontAwesomeIcon icon={faSackDollar} />
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-md-3 mt-5">
                <Card
                  bg="dark"
                  key={"dark"}
                  className="mb-2"
                  style={{ height: "12rem" }}
                >
                  <Card.Header className="d-flex justify-content-center text-white">
                    Tổng doanh thu đăng kí thi
                  </Card.Header>
                  <Card.Body className="d-flex justify-content-center text-white p-3">
                    <Card.Text
                      style={{
                        fontSize: "30px",
                        fontWeight: "bold",
                        marginRight: "10px",
                      }}
                    >
                      {totalFeeExamRegistration &&
                        formatPrice(totalFeeExamRegistration)}
                    </Card.Text>

                    <Card.Text style={{ fontSize: "30px", fontWeight: "bold" }}>
                      <FontAwesomeIcon icon={faSackDollar} />
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
