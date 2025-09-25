import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Pagetitle from "../components/Pagetitle";
import { Delete, Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";
import "../AdminStyles/ProductsList.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, fetchALLProducts, removeErrors, removeSuccess } from "../features/Admin/adminSlice";
import {toast} from 'react-toastify'
import Loader from '../components/Loader'
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
const ProductList = () => {
  const { products, loading, error, deleteLoading } = useSelector((state) => state.admin);

  const [deletingId, setDeletingId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchALLProducts());
  }, [dispatch]);
  
  useEffect(()=>{
    if(error){
      toast.error(error, {autoClose:2000})  
      dispatch(removeErrors())
    }
  }, [dispatch, error])

  
  if(loading){
    return <Loader/>
  }

  if(!products|| products.length==0){
    return(
      <div className="product-list-container">
      <h1 className="product-list-title">Admin Products</h1>
      <p className="no-admin-products">No Products Found</p>
    </div>

    )
    
  }

  function handleDelete(id){
    const isConfirmed = window.confirm('Are You Sure You Want To Delete This Product')

    if(isConfirmed){
      setDeletingId(id); // mark this product as deleting
      dispatch(deleteProduct({id})).then((action)=>{
        if(action.type==`admin/deleteProduct/fulfilled`){
          toast.success("Product Deleted Successfully", {autoClose:2000})
          dispatch(removeSuccess())
        }else if (action.type === "admin/deleteProduct/rejected") {
          toast.error(action.payload?.message || "Delete failed");
        }
        setDeletingId(null);
      })
    }

  }
  return (
    <div>
      <Navbar />
      <Pagetitle title="ALL Products"></Pagetitle>

      <div className="product-list-container">
        <h1 className="product-list-title">ALL Products</h1>
        <table className="product-table">
          <thead>
            <tr >
              <th>S1 No</th>
              <th>Product Image</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Ratings</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products && products.map((item, idx) => (
             
              <tr key={item._id}>
                <td>{idx+1}</td>
                <td>
                  <img src={item?.images[0]?.url} alt={item.name} className="admin-product-image" />
                </td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.ratings}</td>
                <td>{item.category}</td>
                <td>{item.stock}</td>
                <td>{item.createdAt.toString().slice(0,10)}</td>
                <td>
                  <Link
                    to={`/admin/product/${item._id}`}
                    className="action-icon edit-icon"
                  >
                    <Edit />
                  </Link>
                 <button className="action-icon delete-icon" onClick={()=> handleDelete(item._id)}  disabled={deleteLoading}>{deletingId === item._id ? <CircularProgress size={20} /> : <Delete />}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Footer />
    </div>
  );
};

export default ProductList;
