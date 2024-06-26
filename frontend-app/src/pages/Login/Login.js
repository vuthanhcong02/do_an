import React from "react";
import "./Login.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login, loginWithSocial } from "../../services/AuthService";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLogin } from "@react-oauth/google";

export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    // const UserData = {
    //   email: data?.email,
    //   phone: data?.phone,
    //   identity_card: data?.identity_card,
    //   password: data?.password,
    // };

    let UserData = {
      password: data?.password,
    };

    if (/^\d+$/.test(data.identifier)) {
      if (data.identifier.length === 10) {
        UserData.phone = data.identifier;
        console.log(UserData);
      } else {
        UserData.id_card = data.identifier;
        console.log(UserData);
      }
    } else if (/\S+@\S+\.\S+/.test(data.identifier)) {
      UserData.email = data.identifier;
    } else {
      toast.error(
        "Vui lòng nhập đúng định dạng email, số điện thoại hoặc số CCCD"
      );
      return;
    }

    const { success, data: user, access_token } = await login(UserData);
    if (success) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", access_token);

      window.location.href = "/";
    } else {
      toast.error("Tài khoản hoặc mật khẩu không chính xác!");
    }
  };

  const onLoginSuccess = async (resp) => {
    console.log(resp);
    let decoded = jwtDecode(resp?.credential);
    console.log(decoded);
    // setIsLoading(true);
    await handleLoginWithGoogle(decoded);
    // setIsLoading(false);
  };

  const handleLoginWithGoogle = async (data) => {
    const { success, data: user, access_token } = await loginWithSocial(data);
    if (success) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", access_token);
      // toast.success("Đăng nhập thành công");
      window.location.href = "/";
      // navigate("/");
    } else {
      toast.error("Tài khoản hoặc mật này không chính xác!");
    }
  };
  return (
    <div className="App-login">
      <h4 className="App-login-title">Login</h4>
      <p>Please login to continue</p>
      <div className="App-login-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="username">Tài khoản</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Nhập tên email hoặc số điện thoại hoặc số CCCD"
              {...register("identifier", { required: true })}
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
            <div className="or">or</div>
            <GoogleLogin
              type="standard"
              text="Login with Google"
              onSuccess={onLoginSuccess}
              onError={() => {
                toast.error("Đăng nhập thất bại");
              }}
              useOneTap
            />
            {/* <button onClick={() => login()}>Sign in with Google 🚀</button>; */}
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
