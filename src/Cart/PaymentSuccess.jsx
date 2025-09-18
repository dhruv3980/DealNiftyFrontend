import React from "react";
import "../CartStyles/PaymentSuccess.css";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import PageTitle from '../components/Pagetitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  
  const reference = searchParams.get(".reference");
  return (
    
    <>
    <PageTitle title="Payment Success"/>
    <Navbar/>
    <div className="payment-success-container">
      <div className="success-icon">
        <div className="checkmark"></div>
      </div>
      <h1>Order Confirmed</h1>
      <p>
        Your Payment was successful. Reference ID <strong>{reference}</strong>
      </p>

      <Link className="explore-btn" to="/products">
        Explore More Products
      </Link>
    </div>

    <Footer/>
  
  </>
  );
};

export default PaymentSuccess;
