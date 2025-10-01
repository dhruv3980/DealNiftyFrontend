import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import '../AdminStyles/OrdersList.css'
import Footer from '../components/Footer'
import Pagetitle from '../components/Pagetitle'
import { Link } from 'react-router-dom'
import { Delete,Edit } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { deleteOrder, fetchALLOrders, removeErrors, removemessage, removeSuccess } from '../features/Admin/adminSlice'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
const OrderList = () => {

    const {orders, loading, error, message, success} = useSelector(state=>state.admin)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchALLOrders())

    }, [dispatch])

    function handleDeleteOrder(id){
        const confirm = window.confirm("Are you sure you want to delete this order")
        console.log(confirm)

        if(confirm){
            dispatch(deleteOrder(id))
        }


    }

    useEffect(()=>{
        if(error){
            toast.info(error, {autoClose:2000})
            dispatch(removeErrors())
        }
        if(success){
            toast.info(message, {autoClose:2000})
            dispatch(removeSuccess())
            dispatch(removemessage())
            dispatch(fetchALLOrders())
        }
       
    },[error, dispatch, message, success])

    // console.log(orders)


    if(loading){
        return <Loader/>
    }

    if(orders && orders.length===0){
        return (
            <div className="no-orders-container">
                <p>No Order Found</p>
            </div>
        )

    }

    
  return (
    <div>
        <Navbar/>
        <Pagetitle title="All Orders"/>
        <div className="orderList-container">
            <h1 className="orderList-title">ALL Orders</h1>

            <table className="ordersList-table">
                <thead>
                    <tr>
                        <th>S1 NO</th>
                        <th>Order Id</th>
                        <th>Status</th>
                        <th>Total Price</th>
                        <th>Number Of Items</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                   {orders && orders.map((order, idx)=>(
                    <tr key={order._id}>
                        <td>{idx+1}</td>
                        <td>{order._id}</td>
                        <td className={`order-status ${order.orderStatus.toLowerCase()}`}>{order.orderStatus}</td>
                        <td>{order.totalPrice}</td>
                        <td>{order.orderItems.length}</td>
                        <td>
                            <Link to= {`/admin/order/${order._id}`} className="action-icon edit-icon"><Edit/></Link>

                            <button className="action-btn delete-icon" onClick={()=>handleDeleteOrder(order._id)}><Delete></Delete></button>
                        </td>
                    </tr>))}
                </tbody>
            </table>
        </div>

        <Footer/>
      
    </div>
  )
}

export default OrderList
