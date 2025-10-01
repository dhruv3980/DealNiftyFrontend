import React, { useEffect, useState } from "react";
import "../AdminStyles/ReviewsList.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Pagetitle from "../components/Pagetitle";
import { Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteReviews,
  fetchALLProducts,
  fetchProductReviews,
  removeErrors,
  removemessage,
  removeSuccess,
} from "../features/Admin/adminSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
const ReviewsList = () => {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null)
  const { products, loading, success, error, reviews, message } = useSelector(
    (state) => state.admin
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchALLProducts());
  }, [dispatch]);

  function handleViewReviews(id){

    setSelectedProduct(id);

   

    dispatch(fetchProductReviews(id));

    

  }

  function handleDeleteReview(productid, reviewid){
    const confirm = window.confirm("Are you sure you want to delete the review?")

    if(confirm){
      dispatch(deleteReviews({productid, reviewid}));

    }
    
  }


  useEffect(() => {
    if (success) {
      dispatch(removeSuccess());
    }
    if (error) {
      toast.error(error, { autoClose: 2000 });
      dispatch(removeErrors());
    }

    if(message){
      toast.success(message, {autoClose:2000});
      
      dispatch(removemessage())
      navigate('/admin/products');
    }
  }, [error, success, message, selectedProduct]);


  
 


  if (loading) {
    return <Loader />;
  }

  if(!products || products.length==0){
    return(
      <div className="reviews-list-container">
        <h1 className="reviews-list-title">
          Admin Reviews
        </h1>
        <p>No Product Found</p>
      </div>
    ) 
  }
  console.log(reviews, products);
  return (
    <div>
      <Navbar />
      <Pagetitle title="All Reviews" />

      <div className="reviews-list-container">
        <h1 className="reviews-list-title">All Products</h1>

        <table className="reviews-table">
          <thead>
            <tr>
              <th>S1 NO</th>
              <th>Product Name</th>
              <th>Product Image</th>
              <th>Number Of Reviews</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products &&
              products.map((product, idx) => (
                <tr key={product._id}>
                  <td>{idx+1}</td>
                  <td>{product.name}</td>
                  <td>
                    <img src={product.images[0]?.url} alt={product.name} className="product-image" />
                  </td>
                  <td>{product.reviews.length}</td>
                  <td>
                    {product.numOfReviews>0 && <button className="action-btn view-btn" onClick={()=>handleViewReviews(product._id)} >
                      View Reviews
                    </button>}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

       {reviews && reviews.length>0 && (<div className="reviews-details">
          <h2>Reviews for Product</h2>
          <table className="reviews-table">
            <thead>
              <tr>
                <th>S1 No</th>
                <th>Reviewer Name</th>
                <th>Rating</th>
                <th>Comment</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {reviews && reviews.map((review, idx)=><tr key={review._id}>
                <td>{idx+1}</td>
                <td>{review.name}</td>
                <td>{review.rating}</td>
                <td>{review.comment}</td>
                <td>
                  <button className="action-btn delete-btn" onClick={()=>handleDeleteReview(selectedProduct, review._id)}>
                    <Delete />
                  </button>
                </td>
              </tr>)}
            </tbody>
          </table>
        </div>)}
      </div>

      <Footer />
    </div>
  );
};

export default ReviewsList;
