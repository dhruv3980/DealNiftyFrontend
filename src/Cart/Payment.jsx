import React from "react";
import Pagetitle from "../components/Pagetitle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CheckOutPart from "./CheckOutPart";
import "../CartStyles/Payment.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
const link = import.meta.env.VITE_API_URL;
import { toast } from "react-toastify";

const Payment = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const shippingInfo = useSelector((state) => state.cart);

  const orderItem = JSON.parse(sessionStorage.getItem("order-Item"));

  const completePayment = async (amount) => {
    try {
      const { data } = await axios.get(`${link}/getkey`, {
        withCredentials: true,
      });

      const key = data.data.key;

      const { data: orderData } = await axios.post(
        `${link}/payment/process`,
        { amount },
        { withCredentials: true }
      );

      const order = orderData.order;

      // Open Razorpay Checkout
      const options = {
        key, // Replace with your Razorpay key_id
        amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "DealNifty",
        description: "Ecommerce Transaction",
        order_id: order.id, // This is the order_id created in the backend
        handler: async function (response) {
          const { data } = await axios.post(`${link}/payment/verification`, {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          });
          console.log(data);

          if (data.success) {
            navigate(`/paymentSuccess?.reference=${data.reference}`);
          } else {
            alert("Payment verification failed");
          }
        }, // Your success URL
        prefill: {
          name: user.user.name,
          email: user.user.email,
          contact: shippingInfo.phoneNumber,
        },
        theme: {
          color: "#aa0a5fd7",
        },
      };

      const rzp = new Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error(error.message, { autoClose: 2000 });
    }
  };

  return (
    <div>
      <Pagetitle title="Payment Processing"></Pagetitle>
      <Navbar></Navbar>
      <CheckOutPart active={2}></CheckOutPart>

      <div className="payment-container">
        <Link to="/order/confirm" className="payment-go-back">
          Go Back
        </Link>

        <button
          className="payment-btn"
          onClick={(e) => completePayment(orderItem.Total)}
        >
          Pay{" "}
          {orderItem.Total.toLocaleString("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
          /-
        </button>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default Payment;
