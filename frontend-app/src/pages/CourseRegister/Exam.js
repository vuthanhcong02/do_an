import React, { useEffect, useState } from "react";
import Paginate from "../../components/Paginate/Paginate";
import { NavLink, useNavigate } from "react-router-dom";
import { getExamActive } from "../../services/ExamService";
import { userInfo } from "../../services/AuthService";
import "./Exam.scss";
import { toast } from "react-toastify";
import moment from "moment";
import Table from "react-bootstrap/esm/Table";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { createExamRegister } from "../../services/ExamRegisterService";
import { formatPrice } from "../../utils/function";
export default function Exam() {
  const navigate = useNavigate();
  const [examsActive, setExamsActive] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [show, setShow] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleClose = () => setShow(false);
  const handleShow = (data) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Bạn cần đăng nhập để đăng kí thi");
      return;
    }
    // setDataToSubmit(data);
    console.log(data);
    setShow(true);
    setValue("exam_id", data?.id);
    setValue("name_information", data?.name);
    setValue("total_fee_information", formatPrice(data?.fee));
    setValue("fee", data?.fee);
    setValue("time_information", data?.start_at + " - " + data?.end_at);
    setValue("date_information", moment(data?.date).format("DD-MM-YYYY"));
    setValue("classroom_information", data?.classroom?.name);
    setValue("fee_information", formatPrice(data?.fee));
    fetchUserInfo();
  };

  const fetchUserInfo = async () => {
    const { success, data } = await userInfo();
    if (success) {
      console.log(data?.id);
      setValue("user_id", data?.id);
      setValue("full_name", data?.full_name);
      setValue("email", data?.email);
      setValue("phone", data?.phone);
      setValue("id_card", data?.id_card);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async (page) => {
    const { success, data } = await getExamActive(page || 1);
    if (success) {
      setExamsActive(data.data);
      setPageCount(data.last_page);
      navigate(`/exams?page=${page || 1}`);
    }
  };
  const handlePageClick = (data) => {
    const currentPage = data.selected + 1;
    fetchExams(currentPage);
  };

  const onSubmit = async (dataSubmit) => {
    const confirmRegister = window.confirm(
      "Bạn có chắc chắc các thông tin bên dưới là đúng?"
    );
    if (confirmRegister) {
      const dataCreate = {
        exam_id: parseInt(dataSubmit.exam_id),
        user_id: parseInt(dataSubmit.user_id),
        payment_type: dataSubmit.payment_type,
        total_fee: parseInt(dataSubmit.total_fee_information),
      };
      const { success, data } = await createExamRegister(dataCreate);
      if (success) {
        if (data.id) {
          handleClose();
          navigate(`/user/my-exams`);
          toast.success("Đăng kí thi thành công");
        } else {
          console.log(data);
          localStorage.setItem("paymentSuccess", "true");
          window.location.href = data;
        }
      } else {
        handleClose();
        toast.error("Đăng kí thi thất bại");
      }
    }
  };

  return (
    <div className="Exam-container">
      <div className="Exam-content">
        <div className="Exam-content-title">
          <span>Lịch thi</span>
        </div>
        <div className="Exam-content-item">
          <div className="Exam-content-schedule p-4 mt-4">
            <Table bordered>
              <thead className="exam_header">
                <tr>
                  <th>Tên</th>
                  <th>Thời gian thi</th>
                  <th>Ngày thi</th>
                  <th>Địa điểm</th>
                  <th>Hạn đăng kí</th>
                  <th>Lệ phí thi</th>
                </tr>
              </thead>
              <tbody>
                {examsActive.map((item, index) => (
                  <tr key={index}>
                    <td>{item?.name}</td>
                    <td>
                      {item?.start_at}-{item?.end_at}
                    </td>
                    <td>{moment(item?.date).format("DD-MM-YYYY")}</td>
                    <td>{item?.classroom?.name}</td>
                    <td>{moment(item?.deadline_date).format("DD-MM-YYYY")}</td>
                    <td>
                      {item?.fee} <span>Lưu</span>
                    </td>
                    <td className="text-center">
                      <NavLink
                      // to={token ? `/exams/${item?.id}/register` : "/login"}
                      >
                        <button
                          className="btn_register_course"
                          onClick={() => handleShow(item)}
                        >
                          Đăng kí
                        </button>
                      </NavLink>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
              size="lg"
            >
              <Modal.Header closeButton>
                <Modal.Title className="d-flex justify-content-center text-center">
                  Đăng kí lịch thi
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="container-fluid d-flex justify-content-between align-items-start">
                  <div>
                    <Form.Group
                      as={Row}
                      className="mb-2"
                      controlId="formPlaintextEmail"
                    >
                      <Form.Label column sm="5">
                        Tên :
                      </Form.Label>
                      <Col sm="7">
                        <Form.Control
                          plaintext
                          readOnly
                          {...register("name_information")}
                          defaultValue="email@example.com"
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group
                      as={Row}
                      className="mb-2"
                      controlId="formPlaintextEmail"
                    >
                      <Form.Label column sm="5">
                        Thời gian thi :
                      </Form.Label>
                      <Col sm="7">
                        <Form.Control
                          plaintext
                          readOnly
                          {...register("time_information")}
                          defaultValue="email@example.com"
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group
                      as={Row}
                      className="mb-2"
                      controlId="formPlaintextEmail"
                    >
                      <Form.Label column sm="5">
                        Ngày thi :
                      </Form.Label>
                      <Col sm="7">
                        <Form.Control
                          plaintext
                          readOnly
                          {...register("date_information")}
                          defaultValue="email@example.com"
                        />
                      </Col>
                    </Form.Group>
                  </div>
                  <div>
                    <Form.Group
                      as={Row}
                      className="mb-2"
                      controlId="formPlaintextEmail"
                    >
                      <Form.Label column sm="5">
                        Phòng thi :
                      </Form.Label>
                      <Col sm="7">
                        <Form.Control
                          plaintext
                          readOnly
                          {...register("classroom_information")}
                          defaultValue="email@example.com"
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group
                      as={Row}
                      className="mb-2"
                      controlId="formPlaintextEmail"
                    >
                      <Form.Label column sm="5">
                        Lệ phí :
                      </Form.Label>
                      <Col sm="7">
                        <Form.Control
                          plaintext
                          readOnly
                          {...register("fee_information")}
                          defaultValue="email@example.com"
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group
                      as={Row}
                      className="mb-2"
                      controlId="formPlaintextEmail"
                    >
                      <Form.Label column sm="5">
                        Tổng lệ phí :
                      </Form.Label>
                      <Col sm="7">
                        <Form.Control
                          plaintext
                          readOnly
                          {...register("total_fee_information")}
                          defaultValue="email@example.com"
                        />
                      </Col>
                    </Form.Group>
                  </div>
                </div>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="row mt-3 container-fluid"
                >
                  <input type="hidden" {...register("exam_id")} />
                  <input type="hidden" {...register("user_id")} />
                  <input type="hidden" {...register("fee")} />
                  <Col sm={6}>
                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="formHorizontalEmail"
                    >
                      <Form.Label column sm={4}>
                        Họ và tên:
                      </Form.Label>
                      <Col sm={8}>
                        <Form.Control
                          type="text"
                          placeholder="Họ và tên"
                          {...register("full_name")}
                          readOnly
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="formHorizontalPassword"
                    >
                      <Form.Label column sm={4}>
                        Số CCCD:
                      </Form.Label>
                      <Col sm={8}>
                        <Form.Control
                          type="text"
                          placeholder="Số CCCD"
                          {...register("id_card")}
                          readOnly
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="formHorizontalPassword"
                    >
                      <Form.Label column sm={4}>
                        Email:
                      </Form.Label>
                      <Col sm={8}>
                        <Form.Control
                          type="email"
                          placeholder="Email"
                          {...register("email", { required: true })}
                          readOnly
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="formHorizontalPassword"
                    >
                      <Form.Label column sm={4}>
                        Số điện thoại:
                      </Form.Label>
                      <Col sm={8}>
                        <Form.Control
                          type="text"
                          placeholder="Số điện thoại"
                          {...register("phone")}
                          readOnly
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col sm={12}>
                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="formHorizontalPassword"
                    >
                      <Form.Label column sm={4}>
                        Hình thức thanh toán
                        <span className="text-danger">(*)</span>
                      </Form.Label>
                      <Col sm={8}>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          {...register("payment_type", { required: true })}
                        >
                          <option value="" disabled selected>
                            Chọn hình thức thanh toán
                          </option>
                          <option value="payment_direct">
                            Thanh toán trực tiếp
                          </option>
                          <option value="payment_vnpay">
                            Thanh toán VNPAY
                          </option>
                        </select>
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col sm={12}>
                    <Modal.Footer>
                      <Button
                        style={{
                          background: "white",
                          color: "#273272",
                          border: "1px solid #273272",
                        }}
                        onClick={handleClose}
                      >
                        Đóng
                      </Button>
                      <Button
                        style={{
                          background: "#273272",
                          color: "white",
                          border: "1px solid #273272",
                        }}
                        type="submit"
                      >
                        Đăng ký
                      </Button>
                    </Modal.Footer>
                  </Col>
                </form>
              </Modal.Body>
            </Modal>
            <div className="Exam-content-pagination mt-3">
              <ul class="pagination justify-content-end">
                <Paginate
                  pageCount={pageCount}
                  handlePageClick={handlePageClick}
                />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
