import React, { useEffect, useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import "./UserDashboard.scss";
import { getRegistrationByUser } from "../../services/RegistrationService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { MyDocument } from "./RegisterInfor";
import { formatPrice } from "../../utils/function";
export default function UserDashboard() {
  const [courses, setCourses] = useState([]);
  const [courseInfo, setCourseInfo] = useState({});
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetchRegistrationByUser();
  }, []);
  console.log("courseInfo", courseInfo);
  const fetchRegistrationByUser = async () => {
    const { success, data } = await getRegistrationByUser();
    if (success) {
      setCourses(data.data);
      console.log(data.data);
    }
  };

  const handleShowPdfInfo = (course) => {
    handleShow();
    setCourseInfo(course);
    // setShowPdfInfo(!showPdfInfo);
  };
  return (
    <div className="UserDashboard-container">
      <h4 className="UserDashboard-title">Khóa học của bạn</h4>
      <div className="UserDashboard-card mt-3">
        {courses?.map((course, index) => (
          <Card
            key={index}
            style={{ width: "100%" }}
            className="card-register-course"
          >
            <Card.Header as="h4" className="d-flex justify-content-between">
              Tên lớp: {course?.schedule?.class?.name}
              <div className="d-flex justify-content-end">
                <Button
                  style={{
                    backgroundColor: "#273272",
                    color: "white",
                    border: "none",
                  }}
                  onClick={() => handleShowPdfInfo(course)}
                >
                  <FontAwesomeIcon
                    icon={faDownload}
                    className="icon-save mr-2"
                    size="sm"
                  />
                  Thẻ thành viên
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              <Card.Title as="h5">
                Môn học: {course?.schedule?.course?.name}
              </Card.Title>
              <Card.Text></Card.Text>
              <Card.Text>
                Học phí (tạm tính):{" "}
                {course?.schedule?.course?.price &&
                  formatPrice(course?.schedule?.course?.price)}
              </Card.Text>
              <Card.Text>
                Lịch học: Thứ {course?.schedule?.day_of_week}(
                {course?.schedule?.start_end_time})
              </Card.Text>
              <Card.Text>
                {" "}
                Địa điểm: {course?.schedule?.classroom?.name}
              </Card.Text>
              <Card.Text>
                {" "}
                Trạng thái:{" "}
                {course?.schedule?.course?.status === 1 ? (
                  <span className="text-success"> Đang hoạt động</span>
                ) : (
                  <span className="text-danger">Đã kết thúc</span>
                )}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
      <Modal show={show} onHide={handleClose} size="lg">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <MyDocument course={courseInfo} />
        </div>
      </Modal>
    </div>
  );
}
