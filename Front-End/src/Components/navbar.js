import React, { useState } from "react";
import {BrowserRouter as Route,Link} from "react-router-dom";
import '../navbar.css';


function Nav(props){
    var [men,setMen]=React.useState(false);
    var [women,setWomen]=React.useState(false);
    var [kids,setKids]=React.useState(false);
    var [cart,setCart]=React.useState(false);

    return (
            <div id="navbar">
                <div className="branding">
                    <a href="/"><span className="span">HUDSON & MANE</span></a>
                </div>

                <div className="nav-mid">
                   <Link to="/Men" onClick={(e)=>{setMen(true);setWomen(false);setKids(false);setCart(false)}}>{men ? <span style={{borderBottomWidth:"3px",borderBottomColor:"pink",borderBottomStyle:"solid",paddingBottom:"25px"}}><b>MEN</b></span>:<span ><b>MEN</b></span>}</Link>
                   <Link to="/Women" onClick={(e)=>{setMen(false);setWomen(true);setKids(false);setCart(false)}}>{women ? <span style={{borderBottomWidth:"3px",borderBottomColor:"pink",borderBottomStyle:"solid",paddingBottom:"25px"}}><b>WOMEN</b></span>:<span ><b>WOMEN</b></span>}</Link>                   
                   <Link to="/Kids" onClick={(e)=>{setMen(false);setWomen(false);setKids(true);setCart(false)}}>{kids ? <span style={{borderBottomWidth:"3px",borderBottomColor:"pink",borderBottomStyle:"solid",paddingBottom:"25px"}}><b>KIDS</b></span>:<span ><b>KIDS</b></span>}</Link>   
                </div>

                <div className="nav-search">
                    <input type="text" placeholder="Search..." onKeyDown={(e)=>props.keyPress(e)}/>                
                </div>
                
                <div className="nav-right ">
                   <Link><b>
                       <span onClick={(e)=>{props.changeShow(e);console.log(props.show)}} className="span1parent">
                           <i className="far fa-heart" style={{fontSize:"20px"}}></i>
                           {props.wishlist.length > 0 ? <span className="span1">{props.wishlist.length}</span>:null}
                       </span></b>
                    </Link>
                   <Link to="/Cart" onClick={(e)=>{setMen(false);setWomen(false);setKids(false);setCart(true)}}>{cart ? <b>
                       <span className="span2parent" style={{borderBottomWidth:"3px",borderBottomColor:"pink",borderBottomStyle:"solid",paddingBottom:"25px"}}><i className="fas fa-shopping-cart"></i>
                       {props.cart.length > 0 ? <span className="span1">{props.cart.length}</span>:null}
                       </span></b>:
                       <b>
                       <span className="span2parent"><i className="fas fa-shopping-cart"></i>
                       {props.cart.length > 0 ? <span className="span1">{props.cart.length}</span>:null}
                       </span></b>}
                   </Link>
                   <Link to="#"><span><b>Login</b></span></Link>
                </div>
            </div>
        
    )
}

export default Nav;