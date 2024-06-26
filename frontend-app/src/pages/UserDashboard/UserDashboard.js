import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import "./UserDashboard.scss";
import { getRegistrationByUser } from "../../services/RegistrationService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faSave } from "@fortawesome/free-solid-svg-icons";
export default function UserDashboard() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchRegistrationByUser();
  }, []);

  const fetchRegistrationByUser = async () => {
    const { success, data } = await getRegistrationByUser();
    if (success) {
      setCourses(data.data);
      console.log(data.data);
    }
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
                Học phí (tạm tính): {course?.schedule?.course?.price}
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
    </div>
  );
}
