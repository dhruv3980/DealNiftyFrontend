import React, { useEffect, useState } from 'react'
import "../UserStyles/Form.css"
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Pagetitle from '../components/Pagetitle'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { removeErrors, removeSuccess, updatePassword } from '../features/User/UserSlice'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'

const UpdatePassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        oldPassword:'',
        newPassword:'',
        confirmPassword:''
    })

    const {oldPassword, newPassword, confirmPassword} = formData;

    function handleChange(e){
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }

    function onFormSubmit(e){
        e.preventDefault();

        const myform = new FormData();

        myform.set('oldPassword', oldPassword);
        myform.set('newPassword', newPassword);
        myform.set('confirmPassword', confirmPassword);

        dispatch(updatePassword(myform));


    }

    const {loading, error, success, message}  = useSelector(state=>state.user);

    useEffect(()=>{
        if(error){

            toast.error(error, {autoClose:2000});
            dispatch(removeErrors())

        }

    }, [dispatch, error])

    useEffect(()=>{
        if(success){
            toast.success(message, {autoClose:2000})
            dispatch(removeSuccess());
            navigate('/profile');
        }

    }, [dispatch, success])

    if(loading){
        return(
        <div>
        <Navbar/>
        <Loader/>
        <Footer/>
        </div>
        
        )
    }


  return (
    <>
    <Navbar/>

    <Pagetitle title="update-Password"/>

    <div className='container update-container'>

        <div className="form-content">

            <form  className="form" onSubmit={onFormSubmit}>

                <h2>Update Password</h2>

                <div className="input-group avatar-group">
                    <input type="text" placeholder="Old Password" name='oldPassword' value={oldPassword} onChange={handleChange}/>
                </div>

                <div className="input-group avatar-group">
                    <input type="password" placeholder='New Password' name='newPassword' value={newPassword} onChange={handleChange} />
                </div>
                
                <div className="input-group avatar-group">
                    <input type="password" placeholder='Confirm Password' name='confirmPassword' value={confirmPassword}  onChange={handleChange}/>
                </div>

                <button className='authBtn'> Update Password</button>

            </form>
        </div>
      
    </div>

    <Footer/>
    </>
  )
}

export default UpdatePassword
