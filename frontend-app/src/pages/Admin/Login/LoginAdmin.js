import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./LoginAdmin.scss";
import { login, adminLogin } from "../../../services/AuthService";
import { toast } from "react-toastify";
export default function LoginAdmin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const UserData = {
      email: data?.email,
      password: data?.password,
    };
    const { success, access_token } = await adminLogin(UserData);
    if (success) {
      localStorage.setItem("token", access_token);
      navigate("/admin");
      toast.success("Đăng nhập thành công");
    } else {
      toast.error("Tài khoản hoặc mật khẩu không đúng");
    }
  };
  return (
    <div className="App-login-admin">
      <h4 className="App-login-title">Đăng nhập</h4>
      <p>Vui lòng đăng nhập để tới trang quản trị</p>
      <div className="App-login-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="username">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Nhập tên email"
              {...register("email", { required: true })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Mật khẩu</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Nhập mật khẩu"
              {...register("password", { required: true })}
            />
          </div>
          <div className="btn-login-container">
            <button className="btn-login">Đăng nhập</button>
          </div>
        </form>
      </div>
    </div>
  );
}
