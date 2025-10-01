import React from "react";
import "../AdminStyles/UsersList.css";
import Navbar from "../components/Navbar";
import Pagetitle from "../components/Pagetitle";
import Footer from "../components/Footer";
import { Delete, Edit } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteUser, fetchALLUsers, removeErrors, removeSuccess, removemessage } from "../features/Admin/adminSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
const UserList = () => {
  const {loading, error, users, success, message} = useSelector(state=>state.admin)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        dispatch(fetchALLUsers());
    }, [dispatch])


    useEffect(() => {
  // Fetch users initially
  dispatch(fetchALLUsers());

  // Handle errors & success messages
}, [dispatch, success, message, error]);

useEffect(() => {
  if (error) {
    toast.error(error, { autoClose: 2000 });
    dispatch(removeErrors());
  }

  if (success || message) {
    // Refresh user list after delete/update
    dispatch(fetchALLUsers());

    if (message) {
      toast.info(message, { autoClose: 2000 });
      dispatch(removemessage());
    }

    dispatch(removeSuccess());
  }
}, [error, success, message, dispatch]);


   

    if(loading){
        return <Loader/>
    }
   


    function handleDelete(id){
      const confirm = window.confirm("Are You sure you want to delete this user")
      // console.log(confirm)
      
      if(confirm){
        
        dispatch(deleteUser({id}))
      }
    }


  return (
    <div>
      <Navbar />
      <Pagetitle title="ALL Users" />
      <div className="usersList-container">
        <h1 className="usersList-title">All Users</h1>
        <div className="usersList-table-container">
          <table className="usersList-table">
            <thead>
              <tr>
                <th>S1 No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {
                users &&
                users.map((user, idx)=>(
                <tr key={user._id}>
                    <td>{idx+1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td>    
                        <Link to={`/admin/user/${user._id}` }className='action-icon edit-icon'><Edit/></Link>
                        <button className="action-icon delete-icon" onClick={()=>handleDelete(user._id)}><Delete/></button>
                    </td>
                </tr>
                ))
              }

            </tbody>

          </table>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserList;
