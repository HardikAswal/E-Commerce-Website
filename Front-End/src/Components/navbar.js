import React from "react";
import {BrowserRouter as Route,Link} from "react-router-dom";
import '../navbar.css';

function Nav(props){
    return (
        
            <div id="navbar">
                <div className="branding">
                    <span className="span">HUDSON & MANE</span>
                </div>

                <div className="nav-mid">
                   <Link to="/Men"><span><b>MEN</b></span></Link>
                   <Link to="/Women"><span><b>WOMEN</b></span></Link>                   
                   <Link to="/Kids"><span><b>KIDS</b></span></Link>   
                </div>

                <div className="nav-search">
                    <input type="text" placeholder="Search..." onKeyDown={(e)=>props.keyPress(e)}/>                
                </div>
                
                <div className="nav-right ">
                   <Link to="/Wishlist"><span><b>Wishlist ({props.wishlist.length})</b></span></Link>
                   <Link to="/Cart"><span><b>Cart ({props.cart.length})</b></span></Link>
                   <Link to="#"><span><b>Login</b></span></Link>
                </div>
            </div>
        
    )
}

export default Nav;