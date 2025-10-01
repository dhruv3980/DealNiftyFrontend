import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Products from "./pages/Products";
import Register from "./User/Register";
import Login from "./User/Login";
import { useSelector, useDispatch } from "react-redux";
import UserDashboard from "./User/UserDashboard";
import Profile from "./User/Profile";
import { useEffect } from "react";
import { getProfile, removeSuccess } from "./features/User/UserSlice";
import ProtectedRoute from "./components/ProtectedRoute";
import UpdateProfile from "./pages/UpdateProfile";
import UpdatePassword from "./User/UpdatePassword";
import SendToken from "./User/SendToken";
import Resetpassword from "./User/Resetpassword";
import Cart from "./Cart/Cart";
import Shipping from "./Cart/Shipping";
import Orderconfirm from "./Cart/Orderconfirm";
import Payment from "./Cart/Payment";
import PaymentSuccess from "./Cart/PaymentSuccess";
import MyOrders from './orders/MyOrders'
import OrderDetails from "./orders/OrderDetails";
import  Dashboard  from "./Admin/Dashboard";
import ProductList from "./Admin/ProductList";
import CreateProduct from "./Admin/CreateProduct";
import UpdateProduct from './Admin/UpdateProduct'
import UserList from "./Admin/UserList";
import UpdatedRole from "./Admin/UpdatedRole";
import OrderList from "./Admin/OrderList";
import UpdateOrder from './Admin/UpdateOrder'
import ReviewsList from "./Admin/ReviewsList";
import AboutUs from "./pages/About";
import ContactUs from "./pages/Contact";
import NoPageFound from './pages/NoPageFound'
function App() {
  const { user, isAuthenticated, success } = useSelector((state) => state.user);

  const dispatch = useDispatch();


  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getProfile());
    }

    //dispatch(getProfile())

    
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    dispatch(removeSuccess());
  }, [dispatch, success]);

  


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />

          <Route path="/products" element={<Products />} />



          <Route path='/about-us' element={<AboutUs/>}/>

          <Route path='/contact-us' element={<ContactUs/>}/>

          <Route path="/register" element={<Register />} />

          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={<ProtectedRoute element={<Profile />} />}
          />

          <Route
            path="/profile/update"
            element={<ProtectedRoute element={<UpdateProfile />} />}
          />

          <Route
            path="/password/update"
            element={<ProtectedRoute element={<UpdatePassword />} />}
          />

          <Route path="/password/forgot" element={<SendToken />}></Route>

          <Route path="/reset/:token" element={<Resetpassword />} />

          <Route path="/cart" element={<Cart />} />

          <Route
            path="/shipping"
            element={<ProtectedRoute element={<Shipping />} />}
          />

          <Route
            path="/order/confirm"
            element={<ProtectedRoute element={<Orderconfirm />} />}
          />

          <Route
            path="/process/payment"
            element={<ProtectedRoute element={<Payment />} />}
          />

          <Route path="/paymentSuccess" element={<ProtectedRoute element={<PaymentSuccess/>}/>}/>

          {/* //<Route path='/orders/user' element={<ProtectedRoute element={<P/>}/>}/> */}

          <Route path="/orders/user" element={<ProtectedRoute element={<MyOrders/>}/>}/>
          <Route path="/order/:orderid" element={<ProtectedRoute element={<OrderDetails/>}/>}/>

          {/**Admin Routes */}

          <Route path='/admin/dashboard' element={<ProtectedRoute element={<Dashboard/>} adminOnly={true}/>}></Route>
          <Route path="/admin/products" element={<ProtectedRoute element={<ProductList/>} adminOnly={true}/>}/>

          <Route path="/admin/product/create"  element={<ProtectedRoute element={<CreateProduct/>} adminOnly={true}/>}/>

           <Route path="/admin/product/:id"  element={<ProtectedRoute element={<UpdateProduct/>} adminOnly={true}/>}/>

            <Route path="/admin/users"  element={<ProtectedRoute element={<UserList/>} adminOnly={true}/>}/>

            <Route path="/admin/user/:id"  element={<ProtectedRoute element={<UpdatedRole/>} adminOnly={true}/>}/>

            <Route path="/admin/orders"  element={<ProtectedRoute element={<OrderList/>} adminOnly={true}/>}/>

            <Route path="/admin/order/:orderid"  element={<ProtectedRoute element={<UpdateOrder/>} adminOnly={true}/>}/>

            <Route path='/admin/reviews' element={<ProtectedRoute element={<ReviewsList/>} adminOnly={true}/>}/>

            <Route path='*' element={<NoPageFound/>}/> 
            
        </Routes>
        {isAuthenticated && user? <UserDashboard user={user} /> : null}
      </Router>
    </>
  );
}

export default App;
