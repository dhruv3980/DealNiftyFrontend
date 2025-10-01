// import React, { useState } from "react";

// const ContactUs = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // You can handle form submission here, e.g., send data to backend
//     alert("Thank you for contacting DealNifty! We will get back to you soon.");
//     setFormData({ name: "", email: "", message: "" });
//   };

//   return (
//     <div style={{
//       fontFamily: "Arial, sans-serif",
//       color: "#333",
//       padding: "40px",
//       maxWidth: "800px",
//       margin: "0 auto"
//     }}>
//       {/* Header */}
//       <h1 style={{ textAlign: "center", fontSize: "3rem", marginBottom: "20px", color: "#000" }}>
//         Contact DealNifty
//       </h1>

//       {/* Description */}
//       <p style={{ textAlign: "center", fontSize: "1.2rem", marginBottom: "40px" }}>
//         Have questions or feedback? We would love to hear from you! Fill out the form below or reach us via phone or email.
//       </p>

//       {/* Contact Form */}
//       <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
//         <input
//           type="text"
//           name="name"
//           placeholder="Your Name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//           style={{
//             padding: "15px",
//             fontSize: "1rem",
//             borderRadius: "5px",
//             border: "1px solid #ccc"
//           }}
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Your Email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//           style={{
//             padding: "15px",
//             fontSize: "1rem",
//             borderRadius: "5px",
//             border: "1px solid #ccc"
//           }}
//         />
//         <textarea
//           name="message"
//           placeholder="Your Message"
//           value={formData.message}
//           onChange={handleChange}
//           required
//           rows="6"
//           style={{
//             padding: "15px",
//             fontSize: "1rem",
//             borderRadius: "5px",
//             border: "1px solid #ccc",
//             resize: "vertical"
//           }}
//         />
//         <button
//           type="submit"
//           style={{
//             padding: "15px",
//             fontSize: "1.2rem",
//             borderRadius: "5px",
//             border: "none",
//             backgroundColor: "#0c1118d8",
//             color: "#fff",
//             cursor: "pointer",
//             transition: "0.3s"
//           }}
//           onMouseOver={(e) => (e.target.style.backgroundColor = "#031024c2")}
//           onMouseOut={(e) => (e.target.style.backgroundColor = "#021b1fd8")}
//         >
//           Send Message
//         </button>
//       </form>

//       {/* Contact Info */}
//       <div style={{ textAlign: "center", marginTop: "50px" }}>
//         <h2 style={{ color: "#2c0e69d2", marginBottom: "10px" }}>Other Ways to Reach Us</h2>
//         <p>Phone: <a href="tel:9997600889" style={{ color: "#240d3fff", textDecoration: "none" }}>9997600889</a></p>
//         <p>Email: <a href="mailto:rathoreofficial398@gmail.com" style={{ color: "#240d3fff", textDecoration: "none" }}>rathoreofficial398@gmail.com</a></p>
//       </div>

//       {/* Footer Note */}
//       <p style={{ textAlign: "center", marginTop: "40px", fontSize: "0.9rem", color: "#666" }}>
//         &copy; {new Date().getFullYear()} DealNifty. All rights reserved.
//       </p>
//     </div>
//   );
// };

// export default ContactUs;



import React, { useState } from "react";
import { Link } from "react-router-dom";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for contacting DealNifty! We will get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div style={{
      fontFamily: "Arial, sans-serif",
      color: "#333",
      padding: "40px",
      maxWidth: "800px",
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
      <h1 style={{ textAlign: "center", fontSize: "2.5rem", marginBottom: "20px", marginTop: "40px", color: "#000" }}>
        Contact Us
      </h1>

      {/* Description */}
      <p style={{ textAlign: "center", fontSize: "1.2rem", marginBottom: "40px" }}>
        Have questions or feedback? We would love to hear from you! Fill out the form below or reach us via phone or email.
      </p>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{
            padding: "15px",
            fontSize: "1rem",
            borderRadius: "5px",
            border: "1px solid #ccc"
          }}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{
            padding: "15px",
            fontSize: "1rem",
            borderRadius: "5px",
            border: "1px solid #ccc"
          }}
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
          rows="6"
          style={{
            padding: "15px",
            fontSize: "1rem",
            borderRadius: "5px",
            border: "1px solid #ccc",
            resize: "vertical"
          }}
        />
        <button
          type="submit"
          style={{
            padding: "15px",
            fontSize: "1.2rem",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#0c1118d8",
            color: "#fff",
            cursor: "pointer",
            transition: "0.3s"
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#031024c2")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#0c1118d8")}
        >
          Send Message
        </button>
      </form>

      {/* Contact Info */}
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2 style={{ color: "#2c0e69d2", marginBottom: "10px" }}>Other Ways to Reach Us</h2>
        <p>Phone: <a href="tel:9997600889" style={{ color: "#240d3fff", textDecoration: "none" }}>9997600889</a></p>
        <p>Email: <a href="mailto:rathoreofficial398@gmail.com" style={{ color: "#240d3fff", textDecoration: "none" }}>rathoreofficial398@gmail.com</a></p>
      </div>

      {/* Footer Note */}
      <p style={{ textAlign: "center", marginTop: "40px", fontSize: "0.9rem", color: "#666" }}>
        &copy; {new Date().getFullYear()} DealNifty. All rights reserved.
      </p>
    </div>
  );
};

export default ContactUs;

