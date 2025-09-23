import React, { useEffect } from "react";
import "../CartStyles/PaymentSuccess.css";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import PageTitle from '../components/Pagetitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../features/order/orderslice";
import { toast } from "react-toastify";
import {removeSuccess, removeErrors} from '../features/order/orderslice'
import { clearCart } from "../features/Cart/cartSlice";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get(".reference");
  const {cartItems, shippingInfo} = useSelector(state=>state.cart)
  const orderItem = JSON.parse(sessionStorage.getItem('order-Item'))
  const {loading , success, error} = useSelector(state=>state.order)
  
  const dispatch = useDispatch();

  useEffect(()=>{
    const createOrderData = async()=>{
      try{
        if(!orderItem) return
        const orderData = {
          shippingInfo:{
            address:shippingInfo.address,
            city:shippingInfo.city,
            state:shippingInfo.state,
            country:shippingInfo.country,
            pinCode:Number(shippingInfo.pinCode),
            phoneNo:Number(shippingInfo.phoneNumber)


          },
          orderItems:cartItems.map((item)=>({
            name:item.name,
            price:item.price,
            quantity:item.quantity,
            image:item.image,
            product:item.product

            
          })),

          paymentInfo:{
            id:reference,
            status:'success'
          },

          itemPrice:orderItem.subTotal,
          taxPrice:orderItem.Tax,
          shippingPrice:orderItem.shippingCharges,
          totalPrice:orderItem.Total

        }

        // console.log(orderData)

        dispatch(createOrder(orderData))
        sessionStorage.removeItem('order-Item')

       
        

      }catch(error){
        toast.error(error.message ||"Order creation Error", {autoClose:2000})

      }

    }

    createOrderData()
   

     
   
  }, [])

  useEffect(()=>{
    if(success){
      toast.success('Order Placed', {autoClose:2000})
      dispatch(clearCart())
      dispatch(removeSuccess())
    }
  }, [dispatch, success])

  
  useEffect(()=>{
    if(error){
      toast.error(error, {autoClose:2000})
      dispatch(removeErrors())
    }
  }, [dispatch, error])

  return (
    
    <>
    <PageTitle title="Payment Status"/>
    <Navbar/>
    <div className="payment-success-container">
      <div className="success-icon">
        <div className="checkmark"></div>
      </div>
      <h1>Order Confirmed</h1>
      <p>
        Your Payment was successful. Reference ID <strong>{reference}</strong>
      </p>

      <Link className="explore-btn" to="/orders/user">
        View Orders
      </Link>
    </div>

    <Footer/>
  
  </>
  );
};

export default PaymentSuccess;
