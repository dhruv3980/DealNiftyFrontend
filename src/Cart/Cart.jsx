import React from "react";
import "../CartStyles/Cart.css";
import Pagetitle from "../components/Pagetitle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Cartitem from "./Cartitem";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const subTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const navigate = useNavigate();

  const tax = subTotal * 0.18;

  const shipping = subTotal > 500 ? 0 : 50;

  const Total = tax + subTotal + shipping;

  function proceedToCheckout() {
    navigate(`/login?redirect=/shipping`);
  }

  if (cartItems.length === 0) {
    return (
      <>
        <Pagetitle title="Your-Cart"></Pagetitle>
        <Navbar></Navbar>
        <div className="empty-cart-container">
          <p className="empty-cart-message"> Your cart is empty</p>

          <Link to="/products" className="viewProducts">
            View Products
          </Link>
        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Pagetitle title="Your Cart"></Pagetitle>
      <Navbar></Navbar>

      <div className="cart-page">
        <div className="cart-items">
          <div className="cart-items-heading">Your Cart</div>

          <div className="cart-table">
            <div className="cart-table-header">
              <div className="header-product">Product</div>

              <div className="header-quantity ">Quantity</div>
              <div className="header-total item-total-heading">Item Total</div>

              <div className="header-action item-total-heading">Actions</div>
            </div>

            {/**cart item */}

            {cartItems &&
              cartItems.map((item) => (
                <Cartitem key={item.product} item={item} />
              ))}
          </div>
        </div>

        {/** Price summary */}

        <div className="price-summary">
          <div className="price-summary-heading">Price Summary</div>

          <div className="summary-item">
            <p className="summary-label">Subtotal: </p>
            <p className="summary-value">{subTotal}/-</p>
          </div>

          <div className="summary-item">
            <p className="summary-label">Tax (18%): </p>
            <p className="summary-value">{tax.toFixed(2)}/-</p>
          </div>

          <div className="summary-item">
            <p className="summary-label">Shipping : </p>
            <p className="summary-value">{shipping}/-</p>
          </div>

          <div className="summary-total">
            <p className="total-label">Total: </p>
            <p className="total-value">{Total.toFixed(2)}/-</p>
          </div>

          <button className="checkout-btn" onClick={proceedToCheckout}>
            Proceed to Checkout
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Cart;
