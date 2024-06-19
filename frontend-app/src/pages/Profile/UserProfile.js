import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import "./Userprofile.scss";
import { userInfo } from "../../services/AuthService";
export default function UserProfile() {
  const [user, setUser] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();
  const navigate = useNavigate();
  const password = watch("password_new");
  const confirmPassword = watch("confirm_password_new");

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    const { success, data } = await userInfo();
    if (success) {
      setUser(data);
    }
  };

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

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="UserProfile-container container">
      <h4 className="UserProfile-title">Thông tin cá nhân</h4>
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
                Số CCCD <span className="text-danger">(*)</span>
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  placeholder="Số CCCD"
                  {...register("id_card", { required: true })}
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
              className="mb-3"
              controlId="formHorizontalPassword"
            >
              <Form.Label column sm={3}>
                Mật khẩu hiện tại
                <span className="text-danger">(*)</span>
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="password"
                  placeholder="Mật khẩu hiện tại"
                  {...register("password_old", {
                    minLength: {
                      value: 6,
                      message: "Mật khẩu phải có ít nhất 8 ký tự",
                    },
                  })}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formHorizontalPassword"
            >
              <Form.Label column sm={3}>
                Mật khẩu mới<span className="text-danger">(*)</span>
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="password"
                  placeholder="Mật khẩu mới"
                  {...register("password_new", {
                    required: true,
                    minLength: {
                      value: 6,
                      message: "Mật khẩu phải có ít nhất 6 ký tự",
                    },
                  })}
                />
                {errors.password && (
                  <span className="text-danger">{errors.password.message}</span>
                )}
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formHorizontalConfirmPassword"
            >
              <Form.Label column sm={3}>
                Nhập lại mật khẩu mới<span className="text-danger">(*)</span>
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="password"
                  placeholder="Nhập lại mật khẩu mới"
                  {...register("confirm_password_new", {
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
                  <option value="1">Nam</option>
                  <option value="0">Nữ</option>
                </select>
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
                  {...register("phone", { required: true })}
                />
              </Col>
            </Form.Group>
          </Col>

          <div className="d-flex justify-content-start align-items-center flex-column">
            <button className="btn_update" type="submit">
              Cập nhật
            </button>
          </div>
        </Form>
      </form>
    </div>
  );
}
