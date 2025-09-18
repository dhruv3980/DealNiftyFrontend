import React, { useEffect, useState } from "react";
import "../pageStyles/ProductDetails.css";
import Pagetitle from "../components/Pagetitle";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {getProductDetail,removeErrors,} from "../features/products/Product.Slice";
import Loader from "../components/Loader";
import { ContactSupport } from "@mui/icons-material";
import { toast } from "react-toastify";
import  { removemessage, removeSuccess, Additemtocart,removeError }  from '../features/Cart/cartSlice'

const ProductDetails = () => {
  const [userRating, setUserRating] = useState(0);
  const { product, loading, error } = useSelector((state) => state.product);

  const {loading:cartLoading, error:cartError, success, message, cartItems} = useSelector(state=>state.cart);
  console.log(cartItems)

  const [quantity, setquantity] = useState(1);

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getProductDetail(id));

    return () => {
      dispatch(removeErrors());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 2000,
      });
      dispatch(removeErrors());
    }

    if(cartError){
      toast.error(cartError, {autoClose:2000})
      dispatch(removeError());
    }

    
  }, [dispatch, error, cartError]);

  useEffect(()=>{
    if(success){
      toast.success(message, {autoClose:2000})
      dispatch(removemessage());

      dispatch(removeSuccess());
    }
  }, [dispatch, success, message])

  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  const handleRatingChange = (newRating) => {
    setUserRating(newRating);
  };

  if (error || !product) {
    return (
      <>
        <Pagetitle title="Product Detalis" />
        <Navbar />
        <Footer />
      </>
    );
  }

  function handlechangequantitydecrease() {
    if (quantity <= 1) {
      toast.error("qunatity cannot be less than one", { autoClose: 2000 });
      return;
    }
    setquantity((prev) => prev - 1);
  }

  function handlechangequantityincrease() {
    if (quantity >= product.stock) {
      toast.error("quantity cannot be increase as the available quantity", {
        autoClose: 2000,
      });
      return;
    }
    setquantity((prev) => prev + 1);
  }

  function addItemToCart(){
   
    dispatch(Additemtocart({id,quantity}));

  }



  return (
    <>
      <Pagetitle title={`${product.name}-Details`} />
      <Navbar />

      <div className="product-details-container">
        <div className="product-detail-container">
          <div className="product-image-container">
            <img
              src={product.images[0].url}
              alt="product-title"
              className="product-detail-image"
            />
          </div>

          <div className="product-info">
            <h2>{product.name}</h2>
            <p className="product-description">{product.description}</p>

            <p className="product-price">price:{product.price}</p>

            <div className="product-rating">
              <Rating value={product.ratings} disabled={true} />
              <span className="productCardSpan">
                ({product.numOfReviews}{" "}
                {product.numOfReviews > 1 ? "Reviews" : "Review"})
              </span>
            </div>

            <div className="stock-status">
              <span className={product.stock > 0 ? `in-stock` : `out-of-stock`}>
                {product.stock > 0
                  ? `In Stock (${product.stock} available)`
                  : `Out of Stock`}
              </span>
            </div>

            {product.stock > 0 && (
              <div className="quantity-controls">
                <span className="quantity-label">Quantity</span>
                <button
                  className="quantity-button"
                  onClick={handlechangequantitydecrease}
                >
                  -
                </button>
                <input
                  type="text"
                  value={quantity}
                  className="quantity-value"
                  readOnly
                />
                <button
                  className="quantity-button"
                  onClick={handlechangequantityincrease}
                >
                  +
                </button>
              </div>
            )}

            <button className="add-to-cart-btn" onClick={addItemToCart} disabled={cartLoading}>{cartLoading?'Adding':'Add To Cart'}</button>

            <form className="review-form">
              <h3>Write a Review</h3>
              <Rating
                value={0}
                disabled={false}
                onRatingChange={handleRatingChange}
              />

              <textarea
                name=""
                placeholder="Write your review here.."
                className="review-input"
              ></textarea>
              <button className="submit-review-btn">Submit Review</button>
            </form>
          </div>
        </div>
      </div>

      <div className="reviews-container">
        <h3>Customer Reviews</h3>
        {product.reviews && product.reviews.length > 0 ? (
          <div className="reviews-section">
            {product.reviews.map((review, idx) => (
              <div className="review-item">
                <div className="review-header">
                  <Rating value={review.rating} disabled={true} />
                </div>

                <p className="review-comment">{review.comment}</p>
                <p className="review-name">{review.name}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-reviews">
            {" "}
            No reviews yet. Be the first to review this product!
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default ProductDetails;
