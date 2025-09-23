import React from "react";
import "../UserStyles/UserDashboard.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutuser, removeSuccess } from "../features/User/UserSlice";
import { toast } from "react-toastify";
import { removeErrors } from "../features/User/UserSlice";
import { useState } from "react";
const UserDashboard = ({ user }) => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [visible, setvisible] = useState(false);
  const {cartItems} = useSelector(state=>state.cart)

  function menuvisible(){
    setvisible(!visible);
  }

  const options = [
    { name: "Orders", function: orders },
    { name: "Account", function: profile },
    {name:`Cart ${cartItems.length}`, function:myCart, isCart:true},
    { name: "Logout", function: logout },
   
  ];

  if (user.role == "admin") {
    options.unshift({ name: "Admin Dashboard", function: adminDetails });
  }

  function orders() {
    menuvisible();
    navigate("/orders/user");
  }

  function profile() {
    menuvisible()
    navigate("/profile");
  }


  function logout() {

    dispatch(logoutuser())
      .unwrap()
      .then(() => {
        toast.success("User Logged Out Successfully", { autoClose: 2000 });
        dispatch(removeSuccess());
        navigate("/login");
        
      })
      .catch((error) => {
        toast.error("Something went wrong while logout", { autoClose: 2000 });

        dispatch(removeErrors());
      });
  }

  function adminDetails(){
    menuvisible()
    navigate('/admin/dashboard')


  }

  function myCart(){
    menuvisible();
    navigate('/cart')

  }

  return (
    <>
    <div className={`overlay ${visible?'show':""}`} onClick={menuvisible}></div>
    <div className="dashboard-container">
      <div className="profile-header">
         <img
          src={user.avatar.url}
          alt="profile avatar"
          className="profile-avatar"

          onClick={menuvisible}
        /> 
        <span className="profile-name">{user.name}</span>
      </div>

      {visible && <div className="menu-options">
        {options.map((item, idx) => (
          <button className={`menu-option-btn ${item.isCart?(cartItems.length>0?'cart-not-empty':''):''}`} onClick={item.function} key={idx}>
            {item.name}
          </button>
        ))}
      </div>}
    </div>

    </>
  );
};


export default UserDashboard;
