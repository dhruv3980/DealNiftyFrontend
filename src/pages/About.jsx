import React from "react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div style={{
      fontFamily: "Arial, sans-serif",
      color: "#333",
      lineHeight: "1.6",
      padding: "40px",
      maxWidth: "1000px",
      margin: "0 auto",
      position: "relative"
    }}>
      {/* Top-left clickable DealNifty logo */}
      <div style={{ position: "absolute", top: "20px", left: "20px" }}>
        <Link to="/" style={{ textDecoration: "none", fontWeight: "bold", fontSize: "1.5rem", color: "#0c1118d8" }}>
          DealNifty
        </Link>
      </div>

      {/* Header (Centered) */}
      <h1 style={{ textAlign: "center", fontSize: "3rem", marginBottom: "20px", marginTop: "40px", color: "#000" }}>
        About DealNifty
      </h1>
      
      {/* Company Description */}
      <p style={{ fontSize: "1.2rem", textAlign: "center", marginBottom: "40px" }}>
        DealNifty is your ultimate shopping platform, offering a wide range of products at unbeatable prices. 
        We are dedicated to bringing you the best deals, fast delivery, and an enjoyable shopping experience. 
        At DealNifty, we make online shopping easy, reliable, and fun!
      </p>

      {/* Core Features */}
      <div style={{
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
        marginBottom: "40px"
      }}>
        <div style={{ flex: "1 1 250px", margin: "10px", padding: "20px", border: "1px solid #ddd", borderRadius: "10px", textAlign: "center" }}>
          <h2 style={{ color: "#6C5B7B" }}>Wide Range</h2>
          <p>Explore thousands of products across various categories.</p>
        </div>
        <div style={{ flex: "1 1 250px", margin: "10px", padding: "20px", border: "1px solid #ddd", borderRadius: "10px", textAlign: "center" }}>
          <h2 style={{ color: "#6C5B7B" }}>Best Deals</h2>
          <p>We bring you unbeatable prices every day!</p>
        </div>
        <div style={{ flex: "1 1 250px", margin: "10px", padding: "20px", border: "1px solid #ddd", borderRadius: "10px", textAlign: "center" }}>
          <h2 style={{ color: "#6C5B7B" }}>Fast Delivery</h2>
          <p>Quick and reliable delivery to your doorstep.</p>
        </div>
      </div>

      {/* Contact Info */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h2 style={{ color: "#6C5B7B", marginBottom: "10px" }}>Contact Us</h2>
        <p>Phone: <a href="tel:9997600889" style={{ color: "#6C5B7B", textDecoration: "none" }}>9997600889</a></p>
        <p>Email: <a href="mailto:rathoreofficial398@gmail.com" style={{ color: "#6C5B7B", textDecoration: "none" }}>rathoreofficial398@gmail.com</a></p>
      </div>

      {/* Footer Note */}
      <p style={{ textAlign: "center", marginTop: "40px", fontSize: "0.9rem", color: "#666" }}>
        &copy; {new Date().getFullYear()} DealNifty. All rights reserved.
      </p>
    </div>
  );
};

export default AboutUs;
