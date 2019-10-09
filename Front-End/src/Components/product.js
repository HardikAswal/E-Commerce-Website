import React from "react";
import {BrowserRouter as Route,Link} from "react-router-dom";

function Product(props){
    

    return (
        <div>
            <h1>Product Page</h1>
            <div>
            {<img src={props.productPage[0].picture.file} alt="Product" style={{width:"250px"}}></img>}<br/>
            {props.productPage[0].name}<br/>
            {props.productPage[0].description}<br/>
            {props.productPage[0].price}<br/>
            {props.productPage[0].style}<br/>
            {props.productPage[0].neck}<br/>
            {props.productPage[0].sleeve}<br/>
            
            </div>
        </div>
    )
}

export default Product;