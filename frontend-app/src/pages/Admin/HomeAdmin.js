import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function HomeAdmin() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
    }
  }, [token, navigate]);
  return (
    <>
      <div>Dashboard</div>
    </>
  );
}
