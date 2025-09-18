import React, { useEffect, useState } from 'react';
import '../UserStyles/Form.css'
import { useDispatch, useSelector } from 'react-redux';
import { changePassword, removeSuccess } from '../features/User/UserSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { removeErrors } from '../features/products/Product.Slice';
import {toast} from 'react-toastify'
import Loader from '../components/Loader';


const Resetpassword = () => {
    const [newpassword, setnewpassword] = useState('');
    const[confirmPassword, setconfirmPassword] = useState('');
    const [Show, setShow] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {loading,success,error, message } = useSelector(state=>state.user)
    console.log(success, loading, error, message)
    const {token} = useParams();
    useEffect(()=>{
        dispatch(removeSuccess());
        dispatch(removeErrors());
    }, [dispatch])

    function handleSubmit(e){
        e.preventDefault();
        console.log('calll;;')
        dispatch(changePassword({password:newpassword, confirmPassword, token}))

        


    }

    useEffect(()=>{
        if(success){
            toast.success(message, {autoClose:2000})
            dispatch(removeSuccess());
            navigate('/login');

        }

    }, [dispatch, success, message, navigate])

    useEffect(()=>{
        if(error){
            toast.error(error, {autoClose:2000});
            dispatch(removeErrors());
        }

    }, [dispatch,error])

    if(loading){
        return <Loader/>
    }

  return (
    <div className='form-container container'>
        <div className="form-content">
            <form type="Submit" className="form" onSubmit={handleSubmit}>
                <h2>Update Password</h2>
                <div className="input-group">
                    <input type="password" placeholder='Enter your new password' value={newpassword} onChange={(e)=>setnewpassword(e.target.value)}  />
                </div>

                <div className="input-group">
                    <input type="password" name="confirmPassword"  placeholder='Enter your confirm password'  value={confirmPassword} onChange={(e)=> setconfirmPassword(e.target.value)}/>
                </div>

                <button className='authBtn'>Reset password</button>

            </form>
        </div>
    </div>
  )
}

export default Resetpassword
