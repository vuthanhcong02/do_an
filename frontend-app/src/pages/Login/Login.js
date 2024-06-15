import React from "react";
import "./Login.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "../../services/AuthService";
export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const UserData = {
      email: data?.email,
      password: data?.password,
    };
    const { success, data: user, access_token } = await login(UserData);
    if (success) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", access_token);
      window.location.href = "/";
    }
  };
  return (
    <div className="App-login">
      <h4 className="App-login-title">Login</h4>
      <p>Please login to continue</p>
      <div className="App-login-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="username">Email</label>
            <input
              type="email"
              className="form-control"
              id="username"
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
            <button className="btn-login">Login</button>
            <div className="d-flex justify-content-center align-items-center mt-3">
              <span className="mr-2">Don't have an account? </span>
              <NavLink to="/register" className="text-primary">
                Register
              </NavLink>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
