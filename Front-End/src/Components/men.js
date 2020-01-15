import React from 'react';
import "../App.css";
import {BrowserRouter as Route,Link} from "react-router-dom";

class Men extends React.Component {

    render(){
       
        let sizeSelect=null;
        let gender="Men";

        return (
            <div className="productContainer">
            <h4>Men Tshirts</h4>
            <div className="productSort">
                <select onChange={(e)=>{this.props.sort(e)}}>
                    <option value="Default">Default</option>
                    <option value="High To Low">Price: High to Low</option>
                    <option value="Low To High">Price: Low to High</option>
                </select>
            </div>
            <div className="productGrid">
            {this.props.products.map((x)=>x.men ? 
            <div className="gridProduct">
            <Link to="/Product" onClick={(e)=>{this.props.showProduct({x})}}>
            <div className="gridProductImage">{<img src={"/images/"+x.picture.file.filename} alt="Product" style={{width:'250px'}}></img>}</div>  
            <div className="gridProductName">{x.name}</div>
            </Link>
            <div className="gridProductPrice">Rs.{x.price}</div>
            <div className="gridProductSize">
                <select onChange={(e)=>{x.sizeSelect=e.target.value;console.log(x.sizeSelect)}}>
                    <option>Select</option>
                    <option>S</option>
                    <option>M</option>
                    <option>L</option>
                    <option>XL</option>
                </select>
            </div>
            <div className="gridProductCart">{<button onClick={(e)=>{this.props.addToCart({x,gender})}}>Add To Cart</button>}</div>
            <div className="gridProductWishlist">{<button onClick={(e)=>this.props.addToWishlist({x})}><i className="far fa-heart" style={{fontSize:"20px"}}></i></button>}</div>
            </div>:null)}
            </div>
            </div>
        )
    }
}

export default Men;