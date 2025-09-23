import React, { useEffect } from "react";
import "../OrderStyles/OrderDetails.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageTitle from "../components/Pagetitle";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getorderDetails, removeErrors } from "../features/order/orderslice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";


const OrderDetails = () => {
    const {orderid} = useParams();

    const {order, loading, error} = useSelector(state=>state.order)

    const {
        shippingInfo={},
        orderItems=[],
        paymentInfo={},
        orderStatus,
        totalPrice,
        taxPrice,
        shippingPrice,
        itemPrice,
        paidAt

    }=order||{}




    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getorderDetails(orderid))

        if(error){
            toast.error(error, {autoClose:2000})
            dispatch(removeErrors())
        }
    }, [dispatch, orderid])

    if(loading) return <Loader/>


    

 
    const paymentStatus = paymentInfo?.status==="success"?'Paid':"Not Paid"
    const finalOrderStatus = paymentStatus==='Not Paid'?'Cancelled':orderStatus

    const orderStatusClass=finalOrderStatus==='Delivered'?'status-tag delivered':`status-tag ${finalOrderStatus.toLowerCase()}`

    const paymentstatusClass=`pay-tag ${paymentStatus=='Paid'?'paid':'not-paid'}`
  return ( 

    <div>
      <PageTitle title={`order-${orderid}`}></PageTitle>
      <Navbar></Navbar>

      <div className="order-box">
        {/**order items table */}
        <div className="table-block">
          <h2 className="table-title">Order Items</h2>
          <table className="table-main">
            <thead>
              <tr>
                <th className="head-cell">Image</th>
                <th className="head-cell">Name</th>
                <th className="head-cell">Quantity</th>
                
                <th className="head-cell">Price</th>
              </tr>
            </thead>

            <tbody>
              {orderItems.map((item)=><tr className="table-row">
                <td className="table-cell">
                  <img src={item.image} alt={item.name} className='item-img' />
                </td>
                <td className="table-cell">{item.name}</td>
                <td className="table-cell">{item.quantity}</td>
                <td className="table-cell">{item.price.toFixed(2)}/-</td>
              </tr>)}
            </tbody>
          </table>
        </div>

        {/*Shipping Info Table */}
        <div className="table-block">
          <h2 className="table-title">Shipping Info</h2>
          <table className="table-main">
            <tbody>
              <tr className="table-row">
                <th className="table-cell">Address</th>
                <td className="table-cell">{shippingInfo.address}, {shippingInfo.city}, {shippingInfo.state}, {shippingInfo.country}-{shippingInfo.pinCode}</td>
              </tr>

              <tr className="table-row">
                <th className="table-cell">Phone</th>
                <td className="table-cell">{shippingInfo.phoneNo}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/**Order Summary */}
        <div className="table-block">
          <h2 className="table-title">Order Summary</h2>
          <table className="table-main">
            <tbody>
              <tr className="table-row">
                <th className="table-cell">Order Status</th>
                <td className="table-cell">
                  <span className={orderStatusClass}>{finalOrderStatus}</span>
                </td>
              </tr>

              <tr className="table-row">
                <th className="table-cell">Payment</th>
                <td className="table-cell">
                  <span className={paymentstatusClass}>{paymentStatus}</span>
                </td>
              </tr>

              {paidAt && <tr className="table-row">
                <th className="table-cell">Paid At</th>
                <td className="table-cell">{new Date(paidAt).toLocaleString()}</td>
              </tr>}

              <tr className="table-row">
                <th className="table-cell">Items Price</th>
                <td className="table-cell">{itemPrice?.toFixed(2)}/-</td>
              </tr>

              <tr className="table-row">
                <th className="table-cell">Tax Price</th>
                <td className="table-cell">{taxPrice?.toFixed(2)}/-</td>
              </tr>

              <tr className="table-row">
                <th className="table-cell">Shipping Price</th>
                <td className="table-cell">{shippingPrice?.toFixed(2)}/-</td>
              </tr>

              <tr className="table-row">
                <th className="table-cell">Total Price</th>
                <td className="table-cell">{totalPrice?.toFixed(2)}/-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OrderDetails;
