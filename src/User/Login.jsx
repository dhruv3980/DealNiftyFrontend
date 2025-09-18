import React, { useEffect, useState } from 'react'
import '../UserStyles/Form.css'
import Loader from "../components/Loader"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import {useSelector, useDispatch} from "react-redux"
import { login, removeErrors, removeSuccess } from '../features/User/UserSlice';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Pagetitle from '../components/Pagetitle';
const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {user, loading, success, error, isAuthenticated} = useSelector(state=>state.user);

  const location = useLocation();
  const redirect = new URLSearchParams(location.search).get('redirect')||'/'

  function handleSubmit(e){
   e.preventDefault();
   if(!email || !password){
    toast.error("⚠️ Please fill all the necessary details!", {autoClose:2000})
   }

    dispatch(login({email, password}));

  } 

  useEffect(()=>{
    if(error){
      toast.error(error, {autoClose:2000})
      dispatch(removeErrors());
    }

  }, [dispatch, error])

  useEffect(()=>{
    if(success){
      toast.success("Logged in Successfully", {autoClose:2000});
      
     

      dispatch(removeSuccess())
      
    }
  }, [dispatch, success])

  useEffect(()=>{
    if(isAuthenticated){
      navigate(redirect)
    }
  }, [isAuthenticated])

 

 if(loading){
  return <Loader/>
 }

  return (
    <>
    <Pagetitle title='login'></Pagetitle>

    <Navbar/>
    <div className="form-container  container">
      <div className="form-content">
        <form  className="form" onSubmit={handleSubmit}>

          <h2>👋 Welcome, Sign In</h2>
          <div className="input-group">

            <input type="email" placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)} />
          </div>
          <div className="input-group">
            <input type="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} />
          </div>


          <button className='authBtn'>Sign In</button>

          <p className="form-links">Forgot Your Password? <Link to="/password/forgot">Reset Here</Link></p>

          <p className="form-links">Dont have an account? <Link to='/register'>Sign Up here</Link></p>

        </form>
      </div>

    </div>

    <Footer/>
    </>
  )
}

export default Login

