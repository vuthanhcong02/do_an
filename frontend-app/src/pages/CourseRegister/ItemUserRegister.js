import { faCircleRight, faCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { createRegistration } from "../../services/RegistrationService";
import { userInfo } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";

export default function ItemUserRegister({
  handleContinue,
  schedule,
  handleSetUser,
}) {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [show, setShow] = useState(false);
  const [dataToSubmit, setDataToSubmit] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const handleClose = () => setShow(false);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  useEffect(() => {
    if (user) {
      setValue("full_name", user?.full_name);
      setValue("phone", user?.phone);
      setValue("email", user?.email);
      setValue("address", user?.address);
      setValue("phone", user?.phone);
      setValue("id_card", user?.id_card);
      setValue("gender", user?.gender);
      setValue("object_type", user?.object_type);
      setValue("date_of_birthday", user?.date_of_birthday);
    }
  }, [user]);
  const fetchUserInfo = async () => {
    const { success, data } = await userInfo();
    if (success) {
      setUser(data);
    }
  };
  const onSubmit = (data) => {
    const schedule_id = schedule?.id;
    const total_price = 1000000; ///
    // console.log("total_price: ", total_price);
    const dataCreate = {
      full_name: data.full_name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      gender: parseInt(data.gender),
      date_of_birthday: data.date_of_birthday,
      object_type: data.object_type,
      payment_type: data.payment_type,
      schedule_id: schedule_id,
      total_price: total_price,
    };
    // console.log(dataCreate);
    setDataToSubmit(dataCreate);
    handleSetUser(dataCreate);
    setShow(true);
    // handleContinue("payment_information");
  };

  const handleConfirm = async () => {
    if (dataToSubmit) {
      // console.log(dataToSubmit);
      const { success, data } = await createRegistration(dataToSubmit);
      if (success) {
        if (data.id) {
          handleContinue("payment_information");

          console.log(data);
          // window.location.href = data;
        } else {
          window.location.href = data;
        }
      }
      setShow(false);
    }
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
                      {...register("full_name", { required: true })}
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
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      {...register("object_type", { required: true })}
                    >
                      <option value="" disabled selected>
                        Chọn đối tượng
                      </option>
                      <option value="student">Học sinh/sinh viên</option>
                      <option value="worker">Người đi làm</option>
                      <option value="other">Khác</option>
                    </select>
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
                      <option value="payment_vnpay">Thanh toán VNPAY</option>
                    </select>
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
                    <select
                      className="form-select "
                      {...register("gender", { required: true })}
                    >
                      <option value="" disabled selected>
                        Select your gender
                      </option>
                      <option value={1}>Nam</option>
                      <option value={0}>Nữ</option>
                    </select>
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
                    <Form.Control type="text" placeholder="Mã ưu đãi" />
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
                  Xác nhận
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn hãy xác nhận các thông tin bên dưới là hoàn toàn chính xác ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
