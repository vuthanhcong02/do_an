import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome as HomeOutlined } from "@fortawesome/free-solid-svg-icons";

export const PageNotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404</h1>
      <h2 style={styles.subtitle}>Page Not Found</h2>
      <p style={styles.text}>
        Oops! The page you're looking for does not exist.
      </p>
      <Button
        type="primary"
        icon={<FontAwesomeIcon icon={HomeOutlined} />}
        onClick={handleGoHome}
        style={styles.button}
        size="large"
      >
        Về trang chủ
      </Button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    textAlign: "center",
  },
  title: {
    fontSize: "6rem",
    margin: 0,
  },
  subtitle: {
    fontSize: "2rem",
    margin: "0.5rem 0",
  },
  text: {
    fontSize: "1rem",
    color: "white",
    marginBottom: "2rem",
  },
  button: {
    fontSize: "1rem",
    padding: "0.5rem 1rem",
    backgroundColor: "#273272",
  },
};
