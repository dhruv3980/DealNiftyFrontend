import React from 'react'
import '../AdminStyles/UpdateRole.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Pagetitle from '../components/Pagetitle'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useState } from 'react'
import { fetchuser, removeErrors, removeSuccess } from '../features/Admin/adminSlice'
import { changeUserRole } from '../features/Admin/adminSlice'
import { toast } from 'react-toastify'

const UpdatedRole = () => {
    const navigate = useNavigate()

    const {id} = useParams()
   
    const {user, success, loading, error} = useSelector(state=>state.admin)
    const dispatch = useDispatch()

    const [formData, setFormData] = useState({
        name:'',
        email:'',
        role:''
    })

    useEffect(()=>{
        dispatch(fetchuser({id}))
    },[dispatch])

    useEffect(()=>{
        if(user){
            setFormData({
                name:user?.name||"",
                email:user?.email||"",
                role:user?.role||""
            })
        }

    }, [user])

    const {name, email, role} = formData

    function handleformSubmit(e){
        e.preventDefault();

        dispatch(changeUserRole({id, role}))
    }

    useEffect(()=>{
        if(success){
            toast.success("Role changed", {autoClose:2000})
            dispatch(removeSuccess())
            navigate('/admin/users')
        }
        if(error){
            toast.error(error, {autoClose:2000})
            dispatch(removeErrors())
        }
    }, [success, error, dispatch])
  return (

    <div>
        <Navbar/>
        <Pagetitle title='Update User Role'/>
        <div className="page-wrapper">
            <div className="update-user-role-container">
                <h1>Update User Role</h1>

                <form  className="update-user-role-form" onSubmit={handleformSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" readOnly value={name} />
                    </div>

                     <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email"  value={email} readOnly />
                    </div>

                     <div className="form-group">
                        <label htmlFor="role">Role</label>
                        <select name="role" id="role" required value={role} onChange={e=>setFormData({...formData, [e.target.name]:e.target.value})}>
                            <option value="">Select Role</option>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <button className="btn btn-primary" disabled={loading}>{loading? "Updated...": "Update Role"}</button>
                </form>
            </div>
        </div>


        <Footer/>
      
    </div>
  )
}

export default UpdatedRole
