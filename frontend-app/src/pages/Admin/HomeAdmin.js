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
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
export default function HomeAdmin() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
    }
  }, [token, navigate]);
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
                      10
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
                    Tổng số bài tin tức
                  </Card.Header>
                  <Card.Body className="d-flex justify-content-center text-white p-3">
                    <Card.Text
                      style={{
                        fontSize: "30px",
                        fontWeight: "bold",
                        marginRight: "10px",
                      }}
                    >
                      10
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
                    Tổng số bài sự kiện
                  </Card.Header>
                  <Card.Body className="d-flex justify-content-center text-white p-3">
                    <Card.Text
                      style={{
                        fontSize: "30px",
                        fontWeight: "bold",
                        marginRight: "10px",
                      }}
                    >
                      10
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
                      10
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
                      10
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
                      10
                    </Card.Text>

                    <Card.Text style={{ fontSize: "30px", fontWeight: "bold" }}>
                      <FontAwesomeIcon icon={faSackDollar} />
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
                      10
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
                      10
                    </Card.Text>

                    <Card.Text style={{ fontSize: "30px", fontWeight: "bold" }}>
                      <FontAwesomeIcon icon={faSackDollar} />
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
                      10
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
                      10
                    </Card.Text>

                    <Card.Text style={{ fontSize: "30px", fontWeight: "bold" }}>
                      <FontAwesomeIcon icon={faMoneyBill} />
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
                      10
                    </Card.Text>

                    <Card.Text style={{ fontSize: "30px", fontWeight: "bold" }}>
                      <FontAwesomeIcon icon={faMoneyBill} />
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
