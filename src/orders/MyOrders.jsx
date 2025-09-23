import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Pagetitle from '../components/Pagetitle'
import { useDispatch, useSelector } from 'react-redux'
import { getAllMyOrders, removeErrors } from '../features/order/orderslice'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
import { Link } from 'react-router-dom'
import '../OrderStyles/MyOrders.css'
import { LaunchOutlined } from '@mui/icons-material'
const MyOrders = () => {
    const {orders, loading, error} = useSelector(state=>state.order)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getAllMyOrders());
        if(error){
            toast.error(error, {autoClose:2000})
            dispatch(removeErrors())

        }
    }, [dispatch])

    if(loading){
        return <Loader/>
    }

    if(orders.length==0){
        return(
            <div className="no-orders">
                <p className="no-order-message">No Orders Found</p>
            </div>
        )
    }
  return (
    <>
        
        
        <Navbar/>
        <Pagetitle title='orders' ></Pagetitle>

        <div className='my-orders-container'>
            <h1>My Orders</h1>
            <div className="table-responsive">
                <table className='orders-table'>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Items Count</th>
                            <th>Status</th>
                            <th>Total Price</th>
                            <th>View Order</th>
                        </tr>
                    </thead>

                    <tbody>
                       { orders.map((item)=>(
                            <tr key={item._id}>
                                <td>{item._id}</td>
                                <td>{item.orderItems.length}</td>
                                <td>{item.orderStatus}</td>
                                <td>{item.totalPrice}</td>
                                <td >
                                    <Link to={`/order/${item._id}`} className='order-link'><LaunchOutlined></LaunchOutlined></Link>
                                </td>
                            </tr>

                        ))}
                    </tbody>

                </table>
            </div>

        </div>


        <Footer/>
      
    </>
  )
}

export default MyOrders
