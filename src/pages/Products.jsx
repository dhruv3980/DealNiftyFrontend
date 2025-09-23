import React, { useEffect, useState } from "react";
import Pagetitle from "../components/Pagetitle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../pageStyles/products.css";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";
import { getProduct, removeErrors } from "../features/products/Product.Slice";
import { toast } from "react-toastify";
import { ContactPageSharp } from "@mui/icons-material";
import Loader from "../components/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import NoProduct from "../components/NoProduct";
import Pagenation from "../components/Pagenation";

const Products = () => {
  const navigate = useNavigate();

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const keyword = searchParams.get("keyword");
  let page = parseInt(searchParams.get("page"), 10) || 1;
  const category = searchParams.get("category");

  const { loading, error, products, productCount, resultPerPage, totalPages } =
    useSelector((state) => state.product);

  if (page < 1 || page > totalPages) {
    page = 1;
  }

  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(page);
  const categories = ["laptop", "mobile", "tv", "fruits", "glass"];

  useEffect(() => {
    dispatch(getProduct({ keyword, page: currentPage, category }));
  }, [dispatch, keyword, currentPage, category]);

  useEffect(() => {
    if (page == 1) {
      navigate("/products");
    }
  }, [page]);

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

  const handlePageChange = (page) => {
    if (currentPage != page) {
      setCurrentPage(page);

      const newsearchParams = new URLSearchParams(location.search);

      if (page <= 1 || page > totalPages) {
        newsearchParams.delete("page");
      } else {
        newsearchParams.set("page", page);
      }

    

      navigate(`?${newsearchParams.toString()}`);
    }
  };



  const handleCategoryClick = (category) => {
    const newsearchParams = new URLSearchParams(location.search);
    newsearchParams.set("category", category);
    newsearchParams.delete("page");
    navigate(`?${newsearchParams.toString()}`);
  };
 
  return (
    <div>
      <Pagetitle title={"All Products"}></Pagetitle>
      <Navbar />
      <div className="products-layout">
        <div className="filter-section">
          <h3 className="filter-heading">categoreis</h3>
          {/**Render categories */}

          <ul>
            {categories.map((category) => (
              <li key={category} onClick={() => handleCategoryClick(category)}>
                {category}
              </li>
            ))}
          </ul>
        </div>

        <div className="products-section">
          {products.length > 0 ? (
            <div className="products-product-container">
              {products &&
                products.map((product, item) => (
                  <Product key={product._id} product={product} />
                ))}
            </div>
          ) : (
            <NoProduct keyword={keyword} />
          )}

          <Pagenation currentPage={currentPage} onchange={handlePageChange} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Products;
