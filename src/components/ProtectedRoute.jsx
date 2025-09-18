import React from 'react'
import { useSelector } from 'react-redux'
import Loader from './Loader'
import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const ProtectedRoute = ({element}) => {
    const {loading, isAuthenticated} = useSelector(state=>state.user)

    
   
    if(loading){
          return <Loader/>
    }

  

    if (!isAuthenticated ) {
      return <Navigate to="/login" replace />;
    }
  return (
    element
  )
}

export default ProtectedRoute

