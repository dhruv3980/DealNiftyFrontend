import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import Pagetitle from "../components/Pagetitle";
import { useDispatch, useSelector } from "react-redux";
import {toast} from 'react-toastify'
import Loader from '../components/Loader'
import { removeErrors, removeSuccess, sendtoken } from "../features/User/UserSlice";
const SendToken = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const {loading , success, error, message} = useSelector(state=>state.user);

  function handleSubmit(e) {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("email", email);

    dispatch(sendtoken(myForm));
  }

  useEffect(()=>{
    if(success){
      toast.success("successfully send email", {autoClose:2000});
      dispatch(removeSuccess());
    }


  }, [success])

  useEffect(()=>{
    if(error){
      toast.error(error, {autoClose:2000})
      dispatch(removeErrors());
    }

  },[error])

  if(loading){
    return <Loader/>
  }
  return (
    <div>
      <Pagetitle title="forgot passowrd"></Pagetitle>

      <Navbar />

      <div className="container forgot-container">
        <div className="form-content email-group">
          <form className="form" onSubmit={handleSubmit}>
            <h2>Forgot Password</h2>
            <div className="input-group">
              <input
                type="email"
                placeholder="Enter your registered email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button className="authBtn">Send</button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SendToken;
