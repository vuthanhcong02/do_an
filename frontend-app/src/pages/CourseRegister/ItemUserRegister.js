import { faCircleRight, faCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";

export default function ItemUserRegister({ handleContinue, schedule }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // handleContinue("payment_information");
  };
  return (
    <div className="ItemUserRegister-container p-3">
      <div className="ItemUserRegister-content">
        <div className="ItemUserRegister-content-title">
          <span>Thông tin học viên đăng kí lớp: {schedule?.class?.name}</span>
        </div>

        <div className="ItemUserRegister-content-description row">
          <form className="col-12" onSubmit={handleSubmit(onSubmit)}>
            <Form className="mt-4" as={Row}>
              <Col sm={6}>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formHorizontalEmail"
                >
                  <Form.Label column sm={3}>
                    Họ và tên <span className="text-danger">(*)</span>
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      placeholder="Họ và tên"
                      {...register("name", { required: true })}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formHorizontalPassword"
                >
                  <Form.Label column sm={3}>
                    Số điện thoại <span className="text-danger">(*)</span>
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      placeholder="Số điện thoại"
                      {...register("phone", { required: true })}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formHorizontalPassword"
                >
                  <Form.Label column sm={3}>
                    Địa chỉ <span className="text-danger">(*)</span>
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      placeholder="Địa chỉ"
                      {...register("address", { required: true })}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formHorizontalPassword"
                >
                  <Form.Label column sm={3}>
                    Đối tượng <span className="text-danger">(*)</span>
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Select
                      aria-label="Default select example"
                      {...register("object_type", { required: true })}
                    >
                      <option>Chọn đối tượng</option>
                      <option value="1">Học sinh/sinh viên</option>
                      <option value="2">Người đi làm</option>
                      <option value="3">Khác</option>
                    </Form.Select>
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3 mt-4"
                  controlId="formHorizontalPassword"
                >
                  <Form.Label column sm={3}></Form.Label>
                  <Col sm={8}>
                    Học phí:{" "}
                    <span className="text-danger fw-bold">
                      {schedule?.course?.price}
                    </span>
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formHorizontalPassword"
                >
                  <Form.Label column sm={3}>
                    Hình thức thanh toán<span className="text-danger">(*)</span>
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Select aria-label="Default select example">
                      <option>Chọn hình thức thanh toán</option>
                      <option value="1">Thanh toán trực tiếp</option>
                      <option value="2">Thanh toán VNPAY</option>
                    </Form.Select>
                  </Col>
                </Form.Group>
              </Col>

              <Col sm={6}>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formHorizontalPassword"
                >
                  <Form.Label column sm={3}>
                    Email <span className="text-danger">(*)</span>
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      {...register("email", { required: true })}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formHorizontalPassword"
                >
                  <Form.Label column sm={3}>
                    Ngày sinh <span className="text-danger">(*)</span>
                  </Form.Label>
                  <Col sm={8}>
                    <input
                      className="form-control"
                      type="date"
                      placeholder="Ngày sinh"
                      {...register("date_of_birthday", { required: true })}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formHorizontalPassword"
                >
                  <Form.Label column sm={3}>
                    Giới tính <span className="text-danger">(*)</span>
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Select
                      aria-label="Default select example"
                      {...register("gender", { required: true })}
                    >
                      <option>Chọn giới tính</option>
                      <option value={1}>Nam</option>
                      <option value={0}>Nữ</option>
                      <option value={2}>Khác</option>
                    </Form.Select>
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formHorizontalPassword"
                >
                  <Form.Label column sm={3}>
                    Mã ưu đãi (nếu có)
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      placeholder="Mã ưu đãi"
                      {...register("note")}
                    />
                  </Col>
                </Form.Group>
              </Col>
              <div className="ItemUserRegister-note mt-4">
                <ul className=" list-unstyled">
                  <span className="text-danger">Lưu ý: </span>
                  <li className="ml-4 ">
                    <span className="text-danger">
                      - Vui lòng điền đầy đủ và chính xác thông tin. (Các thông
                      tin có gắn dấu * bắt buộc phải nhập)
                    </span>
                    <br />
                    <span className="text-danger">
                      - Nếu bạn chọn thanh toán trực tiếp,Bạn có thể đến địa chỉ
                      sau :
                    </span>
                    <br />
                    <ul className="list-unstyled">
                      <li className="ml-3">
                        Địa điểm: 175 Tây Sơn, Đống Đa, Hà Nội
                      </li>
                      <li className="ml-3">Lịch làm việc:</li>
                      <li className="ml-4">- Thứ 2 đến Thứ 6 hằng tuần:</li>

                      <li className="ml-5">+ Sáng: từ 7g30 đến 11g30</li>
                      <li className="ml-5">+ Chiều: tự 13g00 đến 17g00</li>
                      <li className="ml-4">- Thứ 7 và Chủ nhật hằng tuần:</li>
                      <li className="ml-5">+ Sáng: tự 7g30 đến 11g30</li>
                      <li className="ml-5">+ Chiều: tự 13g00 đến 17g00</li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div className="ItemUserRegister-button">
                <button
                  className="btn_cancel_register"
                  style={{ width: "150px", height: "40px" }}
                  onClick={() => {
                    handleContinue("course_information");
                  }}
                >
                  <FontAwesomeIcon
                    icon={faCircleLeft}
                    style={{ marginRight: "5px" }}
                  />
                  Quay lại
                </button>
                <button
                  className="btn_continue_register"
                  style={{ width: "150px", height: "40px" }}
                  type="submit"
                >
                  Tiếp tục
                  <FontAwesomeIcon
                    icon={faCircleRight}
                    style={{ marginLeft: "5px" }}
                  />
                </button>
              </div>
            </Form>
          </form>
        </div>
      </div>
    </div>
  );
}
