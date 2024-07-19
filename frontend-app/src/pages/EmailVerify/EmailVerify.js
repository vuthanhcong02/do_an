import React from "react";
import "./EmailVerify.scss";
import { saveToken } from "../../services/AuthService";
import { useParams } from "react-router-dom";
import axios from "axios";
export default function EmailVerify() {
  const { token } = useParams();
  const handleVerifyEmail = async () => {
    const response = await axios.get(
      `http://api.ngoaingutinhoc.tech.com/api/auth/verify-email/${token}`
    );
    const { access_token, expires_in, success } = response.data;
    if (response && response.data) {
      if (success) {
        saveToken(access_token, expires_in);
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } else {
        setTimeout(() => {
          window.location.href = "/page-not-found";
        }, 1000);
      }
    }
  };
  return (
    <div className="email-verify-container container-fluid">
      <div className="email-verify-title">
        <p>Vui lòng bấm nút bên dưới để xác nhận email của bạn</p>
        <button
          type="button-verify-email"
          onClick={() => handleVerifyEmail()}
          style={styles.button}
        >
          Xác thực
        </button>
      </div>
    </div>
  );
}
const styles = {
  button: {
    fontSize: "1rem",
    padding: "0.5rem 1rem",
    backgroundColor: "#273272",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: "#b4c9df",
      color: "#273272",
    },
  },
};
