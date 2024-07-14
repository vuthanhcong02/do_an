import React from "react";
import "./ChangePassword.scss";
import { Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { changePassword } from "../../services/AuthService";
import { toast } from "react-toastify";
export default function ChangePassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm();
  const password = watch("password_new");

  const onSubmit = async (data) => {
    // console.log(data);
    const passwordUpdate = {
      password: data.password_new,
    };
    const { success } = await changePassword(passwordUpdate);
    if (success) {
      toast.success("Đổi mật khẩu thành công");
      reset();
    } else {
      toast.error("Đổi mật khẩu thất bại");
    }
  };

  return (
    <div className="ChangePassword-container container">
      <h4 className="ChangePassword-title">Đổi mật khẩu</h4>
      <form className="col-12" onSubmit={handleSubmit(onSubmit)}>
        <Form className="mt-4 " as={Row}>
          <Col sm={12} className="">
            <Form.Group
              as={Row}
              className="mb-3 d-flex justify-content-center"
              controlId="formHorizontalPassword"
            >
              <Form.Label column sm={3}>
                Mật khẩu cũ:
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="password"
                  placeholder="Mật khẩu ban đầu"
                  {...register("password_new", {
                    required: "Mật khẩu mới là bắt buộc",
                    minLength: {
                      value: 6,
                      message: "Mật khẩu phải có ít nhất 6 ký tự",
                    },
                  })}
                />
                {errors.password_new && (
                  <span className="text-danger">
                    {errors.password_new.message}
                  </span>
                )}
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3 d-flex justify-content-center"
              controlId="formHorizontalPassword"
            >
              <Form.Label column sm={3}>
                Mật khẩu mới:
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="password"
                  placeholder="Mật khẩu mới"
                  {...register("password_new", {
                    required: "Mật khẩu mới là bắt buộc",
                    minLength: {
                      value: 6,
                      message: "Mật khẩu phải có ít nhất 6 ký tự",
                    },
                  })}
                />
                {errors.password_new && (
                  <span className="text-danger">
                    {errors.password_new.message}
                  </span>
                )}
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3 d-flex justify-content-center"
              controlId="formHorizontalConfirmPassword"
            >
              <Form.Label column sm={3}>
                Nhập lại mật khẩu mới:
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="password"
                  placeholder="Nhập lại mật khẩu mới"
                  {...register("confirm_password_new", {
                    required: "Nhập lại mật khẩu mới là bắt buộc",
                    minLength: {
                      value: 6,
                      message: "Mật khẩu phải có ít nhất 6 ký tự",
                    },
                    validate: (value) =>
                      value === password || "Mật khẩu không trùng khớp",
                  })}
                />
                {errors.confirm_password_new && (
                  <span className="text-danger">
                    {errors.confirm_password_new.message}
                  </span>
                )}
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
