import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  Additemtocart,
  removeItemFromCart,
  removemessage,
  removeSuccess,
} from "../features/Cart/cartSlice";

const Cartitem = ({ item }) => {
  const dispatch = useDispatch();
  const { loading, cartItems, success, error, message } = useSelector(
    (state) => state.cart
  );
  const [quantity1, setquantity] = useState(item.quantity);

  function handlequantitydecrease() {
    if (quantity1 <= 1) {
      toast.error("quantity cannot be less than one", {
        autoClose: 2000,
        position: "top-center",
      });
      return;
    }
    setquantity((prev) => prev - 1);
  }
  function handleQuantityIncrease() {
    if (quantity1 >= item.stock) {
      toast.error("qunatity cannot be increased", {
        autoClose: 2000,
        position: "top-center",
      });

      return;
    }

    setquantity((prev) => prev + 1);
  }

  function updateQuantity() {
    if (quantity1 == item.quantity) {
      toast.info("No changes in quantity to update", {
        autoClose: 2000,
        position: "top-center",
      });
      return;
    }
    dispatch(Additemtocart({ id: item.product, quantity: quantity1 }));
  }

  useEffect(() => {
    if (success) {
      toast.success(message, {
        autoClose: 2000,
        position: "top-center",
        toastId: "cart-update",
      });
      dispatch(removemessage());
      dispatch(removeSuccess());
    }
  }, [dispatch, success, message]);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        autoClose: 2000,
        position: "top-center",
        toastId: "cart-error",
      });
      dispatch(removeError());
    }
  }, [dispatch, error]);

  function removeitem() {
    if (loading) return;

    dispatch(removeItemFromCart(item.product));
    toast.success("item removed from cart", {
      autoClose: 2000,
      position: "top-center",
    });
  }

  return (
    <div>
      <div className="cart-item">
        <div className="item-info">
          <img src={item.image} alt="Product Image" className="item-image" />

          <div className="item-details">
            <h3 className="item-name">{item.name}</h3>
            <p className="item-price">
              <strong>Price: </strong>
              {item.price.toFixed(2)}/-
            </p>

            <p className="item-quantity">
              <strong>Quantity: </strong>
              {item.stock}
            </p>
          </div>
        </div>

        <div className="quantity-controls">
          <button
            className="quantity-button decrease-btn"
            onClick={handlequantitydecrease}
          >
            -
          </button>

          <input
            type="Number"
            value={quantity1}
            className="quantity-input"
            readOnly
            min="1"
          />

          <button
            className="quantity-button increase-btn"
            onClick={handleQuantityIncrease}
          >
            +
          </button>
        </div>

        <div className="item-total">
          <span className="item-total-price">{item.price * quantity1}/</span>
        </div>

        <div className="item-actions">
          <button
            className="update-item-btn"
            onClick={updateQuantity}
            disabled={loading || quantity1 == item.quantity}
          >
            Update
          </button>

          <button
            className="remove-item-btn"
            onClick={removeitem}
            disabled={loading}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cartitem;
