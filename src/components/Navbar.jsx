import React, { useState } from 'react';
import '../componentStyles/Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import "../pageStyles/Search.css"
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector } from 'react-redux';


const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const {isAuthenticated} = useSelector(state=>state.user);
    const {cartItems} = useSelector(state=>state.cart)
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const navigate = useNavigate()


    const toggleMenu = ()=> setIsMenuOpen(prev=>!prev);
    const toggleSearch = ()=> setIsSearchOpen(prev=>!prev)
    

    function handleSearchSubmit(e){
        e.preventDefault();

        // encodeURIComponent ensures the search query is URL-safe 
    // (e.g., spaces → %20, "&" → %26) so special characters 
    // don’t break the query string

        if(searchQuery.trim()){
            navigate(`/products?keyword=${encodeURIComponent(searchQuery.trim())}`)
 
        }
        else{
            navigate('/products')
        }

        setSearchQuery("");

    }
  return (
    <nav className='navbar'>
        <div className='navbar-container'>

            <div className="navbar-logo">
                <Link to='/' onClick={()=>setIsMenuOpen(false)}>DealNifty</Link>
            </div>

            <div className={`navbar-links ${isMenuOpen?"active":""
            }`}>
                <ul>
                    <li><Link to='/' onClick={()=>setIsMenuOpen(false)}>Home</Link></li>
                    <li><Link to='/products'>Products</Link></li>
                    <li><Link to="/about-us">About Us</Link></li>
                    <li><Link to='/contact-us'>Contact Us</Link></li>
                </ul>
            </div>

            <div className='navbar-icons'>
                <div className="search-container">

                    <form onSubmit={handleSearchSubmit} className={`search-form ${isSearchOpen? 'active':""}`}>
                        <input type="text" className='search-input'                    placeholder='Search-products'
                        value={searchQuery}
                        onChange={e=> setSearchQuery(e.target.value)}
                        />

                        <button type="button" className='search-icon' onClick={toggleSearch}>
                            <SearchIcon focusable="false"/>
                        </button>
                    </form>

                </div>

                <div className='cart-container'>
                    <Link to='/cart'>
                        <ShoppingCartIcon className='icon'></ShoppingCartIcon>

                        <span className='cart-badge'>{cartItems.length}</span>

                    </Link>
                </div>


                { !isAuthenticated &&
                <Link to='/register' className='register-link'><PersonAddIcon className='icon'/></Link>
                }


                <div className="navbar-hamburger" onClick={toggleMenu}>
                    {isMenuOpen?<CloseIcon className="icon"/>:<MenuIcon className='icon'/>}
                </div> 


            </div>



        </div>

    </nav>
  )
}

export default Navbar
