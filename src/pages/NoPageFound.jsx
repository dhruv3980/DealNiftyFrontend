import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px",
          textAlign: "center",
          backgroundColor: "#f5f5f5",
        }}
      >
        <h1 style={{ fontSize: "4rem", marginBottom: "20px", color: "#333" }}>
          404
        </h1>
        <p style={{ fontSize: "1.5rem", marginBottom: "30px", color: "#666" }}>
          Oops! The page you are looking for does not exist.
        </p>
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "15px 30px",
            fontSize: "1.2rem",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#0c1118d8",
            color: "#fff",
            cursor: "pointer",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#031024c2")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#0c1118d8")}
        >
          Go to Home
        </button>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default NotFoundPage;
