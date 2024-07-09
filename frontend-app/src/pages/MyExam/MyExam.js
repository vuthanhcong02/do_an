import React, { useEffect, useState } from "react";
import { Button, Modal, NavLink, Table } from "react-bootstrap";
import { getExamRegisterByUserId } from "../../services/ExamRegisterService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { ExamRegisterInfor } from "./ExamRegisterInfor";
export default function MyExam() {
  const [exams, setExams] = useState([]);
  const [examInformation, setExamInformation] = useState({});
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetchExamByUserId();
  }, []);

  const fetchExamByUserId = async () => {
    const { success, data } = await getExamRegisterByUserId();
    if (success) {
      console.log(data?.data);
      setExams(data?.data);
    }
  };

  const handleShowPdfInfo = (data) => {
    handleShow();
    setExamInformation(data);
  };
  return (
    <div className="UserDashboard-container">
      <h4 className="UserDashboard-title">Lịch thi của bạn</h4>
      <div className="UserDashboard-card mt-3">
        <Table bordered>
          <thead className="exam_header">
            <tr>
              <th>Tên</th>
              <th>Số báo danh</th>
              <th>Thời gian thi</th>
              <th>Ngày thi</th>
              <th>Địa điểm</th>
            </tr>
          </thead>
          <tbody>
            {exams?.map((item, index) => (
              <tr key={index}>
                <td>{item?.exam?.name}</td>
                <td>{item?.registration_number}</td>
                <td>
                  {item?.exam?.start_at} - {item?.exam?.end_at}
                </td>
                <td>{item?.exam?.date}</td>
                <td>{item?.exam?.classroom?.name}</td>
                <td className="text-center">
                  <Button
                    style={{
                      backgroundColor: "#273272",
                      color: "white",
                      border: "none",
                    }}
                    onClick={() => handleShowPdfInfo(item)}
                  >
                    <FontAwesomeIcon
                      icon={faDownload}
                      className="icon-save mr-2"
                      size="sm"
                    />
                    Thẻ dự thi
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      {/* <Modal show={show} onHide={handleClose} size="lg">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <MyDocument course={courseInfo} />
      </div>
    </Modal> */}
      <Modal show={show} onHide={handleClose} size="lg">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ExamRegisterInfor exam={examInformation} />
        </div>
      </Modal>
    </div>
  );
}