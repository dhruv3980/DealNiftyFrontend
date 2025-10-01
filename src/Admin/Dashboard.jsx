import React  from "react";
import "../AdminStyles/Dashboard.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Pagetitle from "../components/Pagetitle";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  AddBox,
  AttachMoney,
  CheckCircle,
  Dashboard as DashboardIcon,
  Inventory,
  People,
  ShoppingCart,
  Star,
  ErrorOutline,
  Instagram,
  LinkedIn,
  YouTube,
  GitHub,
} from "@mui/icons-material";

import { fetchALLOrders, fetchALLProducts, removeErrors, removeSuccess } from "../features/Admin/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";



const Dashboard = () => {
  const [githubdata, setgithubdata] = useState('');
  const {products, orders, success, error, loading, totalamount}=useSelector(state=>state.admin);

  const dispatch = useDispatch()

  useEffect(()=>{

    dispatch(fetchALLProducts());

    dispatch(fetchALLOrders());


  }, [dispatch])

  useEffect(()=>{
    if(error){
      dispatch(removeErrors());
    }
    if(success){
      dispatch(removeSuccess());
    }
  }, [dispatch, error, success]);



  
  const TotalProducts = products?.length||0;

  const TotalOrders = orders?.length||0;

  const outOfStock = products?.filter(product=>product.stock<1).length||0;

  const inStock = TotalProducts-outOfStock||0;

  const TotalReviews = products?.reduce((acc, product)=> acc+(product.reviews.length)||0, 0);

  


    useEffect(() => {
    const fetchGithubData = async () => {
      try {
        const response = await axios.get("https://api.github.com/users/dhruv3980");
        setgithubdata(response.data); // Save the data in state
      } catch (err) {
        console.error("Error fetching GitHub data:", err);
      }
    };

    fetchGithubData();
  }, []);

  console.log(githubdata);
  

  return (
    <>
      <Navbar />
      <Pagetitle title="Admin Dashboard" />
      <div className="dashboard-container">
        <div className="sidebar">
          <div className="logo">
            <DashboardIcon className="logo-icon" />
            Admin Dashboard
          </div>

          <nav className="nav-menu">
            <div className="nav-section">
              <h3>Products</h3>
              <Link to="/admin/products">
                <Inventory className="nav-icon" />
                All Products
              </Link>

              <Link to="/admin/product/create">
                <AddBox className="nav-icon" />
                Create Products
              </Link>

            </div>

            <div className="nav-section">
              <h3>Products</h3>
              <Link to="/admin/users">
                <People className="nav-icon" />
                All Users
              </Link>
            </div>

            <div className="nav-section">
              <h3>Orders</h3>
              <Link to="/admin/orders">
                <ShoppingCart className="nav-icon" />
                All Products
              </Link>
            </div>

            <div className="nav-section">
              <h3>Reviews</h3>
              <Link to="/admin/reviews">
                <Star className="nav-icon" />
                All Reviews
              </Link>
            </div>
          </nav>
        </div>

        <div className="main-content">
          <div className="stats-grid">
            <div className="stat-box">
              <Inventory className="icon" />
              <h3>Total Products</h3>
              <p>{TotalProducts}</p>
            </div>

            <div className="stat-box">
              <ShoppingCart className="icon" />
              <h3>Total Orders</h3>
              <p>{TotalOrders}</p>
            </div>

            <div className="stat-box">
              <Star className="icon" />
              <h3>Total Reviews</h3>
              <p>{TotalReviews}</p>
            </div>

            <div className="stat-box">
              <AttachMoney className="icon" />
              <h3>Total Revenue</h3>
              <p>{totalamount?.toFixed(2)||0}/-</p>
            </div>

            <div className="stat-box">
              <ErrorOutline className="icon" />
              <h3>Out Of Stocks</h3>
              <p>{outOfStock}</p>
            </div>

            <div className="stat-box">
              <CheckCircle className="icon" />
              <h3>In Stocks</h3>
              <p>{inStock}</p>
            </div>

          </div>

          <div className="social-stats">
            {/* <div className="social-box instagram">
              <Instagram/>
                <h3>Instagram</h3>
                <p>123K Followers</p>
                <p> 12 posts</p>

            </div> */}

             <div className="social-box linkedIn">
                <LinkedIn/>
                <h3>Linkedin</h3>
                <p>996 Followers</p>
                <p> 70 posts</p>

            </div>

             <div className="social-box youtube">
                <GitHub/>
                <h3>Github</h3>
                <p><b>UserName :</b>{githubdata?.login}</p>
                <p> <b>Repos : </b>{githubdata?.public_repos}</p>

            </div>
          </div>

        </div>
    </div>

    
    </>
  );
};

export default Dashboard;
