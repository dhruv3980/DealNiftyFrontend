import React, { useEffect, useState } from 'react'
import '../AdminStyles/UpdateOrder.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Pagetitle from '../components/Pagetitle'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { getorderDetails } from '../features/order/orderslice'
import { toast } from 'react-toastify'
import { removeErrors, removeSuccess, updateOrderStatus } from '../features/Admin/adminSlice'
const UpdateOrder = () => {
  const [status, setStatus] = useState('')
  const {orderid}=useParams()

  const {order, loading:orderloading} = useSelector(state=> state.order)

  const {loading:statusloading, error, success} = useSelector(state=>state.admin)

  const loading = orderloading||statusloading

  const dispatch = useDispatch()

  useEffect(()=>{
    
      dispatch(getorderDetails(orderid))

    
  }, [dispatch, orderid])


  const sstatus = order?.paymentInfo?.status === 'success' ? "Paid" : "Not Paid";

  const finalstatus=sstatus==="Not Paid"? 'Cancelled':order.orderStatus

  const orderItems=order?.orderItems||[]


function handleSubmit(){
  if(!status){
    toast.info("Please Select the Status", {autoClose:2000})
    return;
  }

  dispatch(updateOrderStatus({id:orderid, status}));




}

useEffect(()=>{
  if(success){
    toast.success('Order status Updated', {autoClose:2000})
    dispatch(getorderDetails(orderid));
    dispatch(removeSuccess());

    
  }
  if(error){
    toast.error(error, {autoClose:2000})
    dispatch(removeErrors())
  }
}, [dispatch, success, error, orderid])

   if(loading){
    return <Loader/>
  }
  

 

  return (
    <div>
      <Navbar></Navbar>
      <Pagetitle title="Update Order"/>

      <div className="order-container">
        <h1 className="order-title">Update Order</h1>

        <div className="order-details">
          <h2>Oder Information:</h2>
          <p><strong>Order ID : </strong>{order?._id}</p>
          <p><strong>Shipping Address : </strong>{order?.shippingInfo?.address}</p>
          <p><strong>Phone No : </strong>{order?.shippingInfo?.phoneNo}</p>
          <p><strong>Order Status : </strong>{finalstatus}</p>
          <p><strong>Payment Status : </strong>{sstatus}</p>
          <p><strong>Total Price : </strong>{order?.totalPrice}</p>

        </div>

        <div className="order-items">
          <h2>Order Items</h2>
        
        <table className='order-table'>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>

          <tbody>
            {order && orderItems.map((item, idx)=>
             
             <tr key={idx}>
              <td><img src={item.image} alt="Product Image"  className='order-item-image'/></td>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
            </tr>
              )
            }
          </tbody>
        </table>
        </div>

        <div className="order-status">
          <h2 className="Update-Status"> Update Status</h2>
            <select value={status}
              onChange={(e)=>setStatus(e.target.value)} 
              disabled={order.orderStatus==="Delivered"}
              className='status-select'>
              <option value="">Select a status</option>
              <option value="Shipped">Shipped</option>
              <option value="On The Way">On The Way</option>

              <option value="Delivered">Delivered</option>
            </select>

            <button className="update-button" onClick={handleSubmit} disabled={loading || !status || finalstatus=="Delivered"}>Update Status</button>
         
        </div>

      </div>
     <Footer/>
        
      
    </div>
  )
}

export default UpdateOrder
