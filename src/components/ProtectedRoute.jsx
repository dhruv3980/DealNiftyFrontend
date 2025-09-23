import React from "react";
import { useSelector } from "react-redux";
import Loader from "./Loader";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({ element, adminOnly = false }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  // if(loading){
  //       return <Loader/>
  // }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
 

  if (adminOnly && user.role !="admin") {
   
    return <Navigate to='/' />
    
  }
  

  return element;

};

export default ProtectedRoute;
