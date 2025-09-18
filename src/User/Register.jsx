import React from "react";
import "../UserStyles/Form.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import img from "../images/4.jpg";
import { toast } from "react-toastify";
import {useDispatch, useSelector} from "react-redux"
import { register, removeErrors, removeSuccess } from "../features/User/UserSlice";
import { useEffect } from "react";
import Loader from "../components/Loader";
import Pagetitle from "../components/Pagetitle";


const Register = () => {
  const navigate = useNavigate();
  const {isAuthenticated} = useSelector(state=>state.user)

  useEffect(()=>{
    if(isAuthenticated){
      navigate('/')
    }

  }, [isAuthenticated])
  const dispatch = useDispatch()
  

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [avatar, setavatar] = useState("");
  const [avatarPreview, setavatarpreviw] = useState(img);

  const { name, email, password } = user;

  const {success, loading, error} = useSelector(state=>state.user)

  function registerDataChange(e) {
    
    if (e.target.name == "avatar") {
      // const reader = new FileReader();

      // reader.onload=()=>{
      //   if(reader.readyState==2){
      //     setavatarpreviw(reader.result);
      //     setavatar(reader.result)
      //   }
      // }

      //  reader.readAsDataURL(e.target.files[0])

      const file = e.target.files[0];
      setavatar(file); // store raw file for backend
      setavatarpreviw(URL.createObjectURL(file)); // preview via object URL


  
     } 
     else {
      setUser({ ...user, [e.target.name]: e.target.value });
     }
  }

  function registerUser(e) {
    e.preventDefault();

    
    if (!name || !email || !password) {
      toast.error("Please fill out all the details", {
        position: "top-right",
        autoClose: 2000,
      });

      return;
    }

    const myForm = new FormData();
    myForm.set('name', name);
    myForm.set('email', email);
    myForm.set('password', password);
    myForm.set('avatar', avatar)

    
    dispatch(register(myForm))

  }

  useEffect(()=>{
    if(error){
      toast.error(error,
        {
          position:'top-center',
          autoClose:3000
        }
      )
      dispatch(removeErrors())
    }

  }, [dispatch, error])

  useEffect(()=>{
    if(success){
      toast.success("Register User Successfully",{autoClose:2000})

      navigate('/login')
    }
    dispatch(removeSuccess())
   
  }, [dispatch, success])

  
  


  return (
    <>
    <Pagetitle title="Register"></Pagetitle>
    {loading? <div style={{display:'flex', justifyContent:"center", top:"10px"}}><Loader/></div>:""}
    <div className="form-container container">

      <div className="form-content">
        <form className="form" onSubmit={registerUser} encType="multipart/form-data">
          <h2>Sign Up</h2>

          <div className="input-group">
            <input
              type="text"
              placeholder="Username"
              name="name"
              value={name}
              onChange={registerDataChange}
            />
          </div>

          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={registerDataChange}
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Password..."
              name="password"
              value={password}
              onChange={registerDataChange}
            />
          </div>

          <div className="input-group avatar-group">
            <input
              type="file"
              name="avatar"
              className="file-input"
              accept="image/*"
              onChange={registerDataChange}
            />

            <img src={avatarPreview} alt="Avatar Preview" className="avatar" />
          </div>

          <button className="authBtn" disabled={loading?true:false}>{loading?"Signing up" :"Sign Up"}</button>

          <p className="form-links">
            Already Have an account <Link to="/login" >Sign In Here</Link>
          </p>
        </form>
      </div>
    </div>

    </>
  );
};

export default Register;
