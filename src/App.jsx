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
        </Routes>
        {isAuthenticated && user? <UserDashboard user={user} /> : null}
      </Router>
    </>
  );
}

export default App;
