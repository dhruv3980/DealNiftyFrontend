import React, { useEffect } from "react";
import Footer from "../components/Footer";
import "../pageStyles/Home.css";
import Navbar from "../components/Navbar";
import ImageSlider from "../components/ImageSlider";
import Product from "../components/Product";
import Pagetitle from "../components/Pagetitle";
import { useSelector, useDispatch } from "react-redux";
import { getProduct, removeErrors } from "../features/products/Product.Slice";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const Home = () => {
  const { loading, error, products, productCount} = useSelector(
    (state) => state.product
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct({ keyword: "" }));
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 2000,
      });

      dispatch(removeErrors());
    }
  }, [error, dispatch]);

  // if (loading) {
  //   return <Loader />;
  // }

  return (
    <>
      <Pagetitle title={"Home-My-Website"} />
      <Navbar />
      <ImageSlider />

      <div className="home-container">
        <h2 className="home-heading">Trending Now</h2>

        <div className="home-product-container">
          {products &&
            products.map((product, index) => (
              <Product key={index} product={product} />
            ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
