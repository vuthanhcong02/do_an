import React from "react";
import "./Register.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleLeft, faCircleRight } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { registerUser } from "../../services/AuthService";
import { toast } from "react-toastify";
export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();
  const navigate = useNavigate();
  const password = watch("password");
  const email = watch("email");

  const onSubmit = async (dataUser) => {
    const UserData = {
      full_name: dataUser?.full_name,
      email: dataUser?.email,
      password: dataUser?.password,
      confirm_password: dataUser?.confirm_password,
      gender: parseInt(dataUser?.gender),
      object_type: dataUser?.object_type,
      phone: dataUser?.phone,
      address: dataUser?.address,
      date_of_birthday: dataUser?.date_of_birthday,
      id_card: dataUser?.id_card,
    };

    console.log(UserData);

    try {
      const response = await registerUser(UserData);

      if (response.success) {
        toast.success(
          "Đăng ký tài khoản thành công. Vui lòng kiểm tra email để xác nhận!"
        );
        reset();
      } else {
        toast.error("Đăng ký thất bại!");
      }
    } catch (error) {
      console.error("An error occurred during registration:", error);
    }
  };

  return (
    <div className="App-register">
      <h4 className="App-register-title">Đăng ký</h4>
      <div className="App-register-form">
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
                    {...register("full_name", {
                      required: "Họ và tên là bắt buộc",
                      minLength: {
                        value: 3,
                        message: "Họ và tên phải có ít nhất 3 ký tự",
                      },
                    })}
                  />
                  {errors.full_name && (
                    <span className="text-danger">
                      {errors.full_name.message}
                    </span>
                  )}
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formHorizontalPassword"
              >
                <Form.Label column sm={3}>
                  Số CCCD <span className="text-danger">(*)</span>
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="text"
                    placeholder="Số CCCD"
                    {...register("id_card", {
                      required: "Số CCCD là bắt buộc",
                      pattern: {
                        value: /^[0-9]{9,12}$/,
                        message: "Số CCCD không hợp lệ",
                      },
                    })}
                  />
                  {errors.id_card && (
                    <span className="text-danger">
                      {errors.id_card.message}
                    </span>
                  )}
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
                    {...register("address", {
                      required: "Địa chỉ là bắt buộc",
                    })}
                  />
                  {errors.address && (
                    <span className="text-danger">
                      {errors.address.message}
                    </span>
                  )}
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
                    {...register("object_type", {
                      required: "Đối tượng là bắt buộc",
                    })}
                  >
                    <option value="" disabled selected>
                      Chọn đối tượng
                    </option>
                    <option value="student">Học sinh/sinh viên</option>
                    <option value="worker">Người đi làm</option>
                    <option value="other">Khác</option>
                  </select>
                  {errors.object_type && (
                    <span className="text-danger">
                      {errors.object_type.message}
                    </span>
                  )}
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formHorizontalPassword"
              >
                <Form.Label column sm={3}>
                  Mật khẩu <span className="text-danger">(*)</span>
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="password"
                    placeholder="Mật khẩu"
                    {...register("password", {
                      required: true,
                      minLength: {
                        value: 6,
                        message: "Mật khẩu phải có ít nhất 6 ký tự",
                      },
                    })}
                  />
                  {errors.password && (
                    <span className="text-danger">
                      {errors.password.message}
                    </span>
                  )}
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formHorizontalConfirmPassword"
              >
                <Form.Label column sm={3}>
                  Nhập lại mật khẩu <span className="text-danger">(*)</span>
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="password"
                    placeholder="Nhập lại mật khẩu"
                    {...register("confirm_password", {
                      required: true,
                      validate: (value) =>
                        value === password || "Mật khẩu không khớp",
                    })}
                  />
                  {errors.confirm_password && (
                    <span className="text-danger">
                      {errors.confirm_password.message}
                    </span>
                  )}
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
                    {...register("email", {
                      required: "Email là bắt buộc",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Email không hợp lệ",
                      },
                      maxLength: {
                        value: 30,
                        message: "Email tối đa 30 ký tự",
                      },
                    })}
                  />
                  {errors.email && (
                    <span className="text-danger">{errors.email.message}</span>
                  )}
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
                    {...register("date_of_birthday", {
                      required: "Ngày sinh là bắt buộc",
                    })}
                  />
                  {errors.date_of_birthday && (
                    <span className="text-danger">
                      {errors.date_of_birthday.message}
                    </span>
                  )}
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
                    {...register("gender", {
                      required: "Giới tính là bắt buộc",
                    })}
                  >
                    <option value="" disabled selected>
                      Select your gender
                    </option>
                    <option value="1">Nam</option>
                    <option value="0">Nữ</option>
                  </select>
                  {errors.gender && (
                    <span className="text-danger">{errors.gender.message}</span>
                  )}
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formHorizontalPassword"
              >
                <Form.Label column sm={3}>
                  Số điện thoại <span className="text-danger">(*)</span>
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="text"
                    placeholder="Số điện thoại"
                    {...register("phone", {
                      required: "Số điện thoại là bắt buộc",
                      pattern: {
                        value: /^[0-9]{10,11}$/,
                        message: "Số điện thoại không hợp lệ",
                      },
                    })}
                  />
                  {errors.phone && (
                    <span className="text-danger">{errors.phone.message}</span>
                  )}
                </Col>
              </Form.Group>
            </Col>

            <div className="d-flex justify-content-center align-items-center flex-column">
              <button className="btn_register" type="submit">
                Đăng ký
              </button>
              <div className="d-flex justify-content-center align-items-center mt-3">
                <span className="mr-2">Bạn đã có tài khoản?</span>
                <NavLink to="/login" className="text-primary">
                  Đăng nhập
                </NavLink>
              </div>
            </div>
          </Form>
        </form>
      </div>
    </div>
  );
}
