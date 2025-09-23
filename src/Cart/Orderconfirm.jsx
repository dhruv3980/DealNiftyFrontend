import React from "react";
import "../CartStyles/OrderConfirm.css";
import Pagetitle from "../components/Pagetitle";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import CheckOutPart from "./CheckOutPart";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const Orderconfirm = () => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);

    const subTotal = cartItems.reduce((acc, item)=> acc+item.price*item.quantity, 0)

   const tax = subTotal*0.18;

    const shipping =subTotal>500?0:50;

    const Total = tax+subTotal+shipping;

    const proceedtopayment = ()=>{
        const data = {
            subTotal,
            Tax:tax,
            shippingCharges:shipping,
            Total
        }

        sessionStorage.setItem('order-Item', JSON.stringify(data))

        navigate('/process/payment')
    }

  return (
    <div>
      <Pagetitle title="Order-confirm" />
      <Navbar />
      <CheckOutPart active={1} />

      <div className="conifrm-container">
        <h1 className="confirm-header">Order Confirmation</h1>
        <div className="confirm-table-container">
          <table className="confirm-table">
            <caption>Shipping Details</caption>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Address</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>{user.name}</td>
                <td>{shippingInfo.phoneNumber}</td>
                <td>
                  {shippingInfo.address}, {shippingInfo.city},{" "}
                  {shippingInfo.state}, {shippingInfo.country}-
                  {shippingInfo.pinCode}
                </td>
              </tr>
            </tbody>
          </table>

          <table className="confirm-table cart-table">
            <caption> Cart Items</caption>
            <thead>
            <tr>
              <th>Image</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total Price</th>
            </tr>
            </thead>

            <tbody>
              {cartItems.map((item) => (
                <tr key={item.product}>
                  <td>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="order-product-image "
                    />
                  </td>

                  <td>{item.name}</td>
                  <td>
                    ₹
                    {item.price.toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                    /-
                  </td>

                  <td>{item.quantity}</td>

                  <td>
                    {" "}
                    ₹
                    {(item.price * item.quantity).toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                    /-
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <table className="confirm-table">
            <caption>Order Summary</caption>

            <thead>
              <tr>
                <th>Subtotal</th>
                <th>Shipping Charges</th>
                <th>GST</th>
                <th>Total</th>
              </tr>
            </thead>

            <tbody>
                <tr>
                    <td> ₹{subTotal.toLocaleString("en-IN", {
                        minimumFractionDigits:2, maximumFractionDigits:2})}/-</td>
                    <td>{shipping}</td>
                    <td> ₹ {tax.toLocaleString('en-IN', {
                        minimumFractionDigits:2,
                        maximumFractionDigits:2
                    })}/-</td>
                    <td>₹{Total.toLocaleString("en-IN", {
                        minimumFractionDigits:2, maximumFractionDigits:2})}/-</td>
                </tr>
            </tbody>
          </table>



        </div>

        <button className="proceed-button" onClick={proceedtopayment}>Procees to Payment</button>


      </div>

      <Footer />
    </div>
  );
};

export default Orderconfirm;
