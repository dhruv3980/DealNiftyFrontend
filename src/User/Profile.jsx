import React, { useEffect } from "react";
import "../UserStyles/Profile.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import Loader from "../components/Loader";
import { getProfile } from "../features/User/UserSlice";
import Pagetitle from "../components/Pagetitle";

const Profile = () => {

  const dispatch =  useDispatch();


  
    
    const {loading, user, isAuthenticated} = useSelector(state=>state.user)
    console.log(loading, user, isAuthenticated);

    
    



  
    
    
   
  return (
    <>
    <Pagetitle title='Profile'/>
    <div className="profile-container">
      <div className="profile-image">
        <h1 className="profile-heading">My Profile</h1>
        <img src={user?.avatar?.url}   alt="User Profile" />
        <Link to="/profile/update">Edit Profile</Link>
      </div>

      <div className="profile-details">
        <div className="profile-detail">
          <h2>Username:</h2>
          <p>{user.name}</p>
        </div>

        <div className="profile-detail">
          <h2>Email</h2>
          <p>{user.email}</p>
        </div>

        <div className="profile-detail">
          <h2>Joined On:</h2>
          <p>{user.createdAt? String(user.createdAt).slice(0,10):"N/A"}</p>
        </div>
      </div>

      <div className="profile-buttons">
        <Link to="/orders/user">My Orders</Link>
        <Link to='/password/update'>Change Password</Link>
      </div>
    </div>
    </>
  );
};

export default Profile;
