import React from 'react';
import "../App.css";
import {BrowserRouter as Route,Link} from "react-router-dom";

class Men extends React.Component {

    render(){
       
        let sizeSelect=null;
        let gender="Men";
        return (
            <div>
            <h1>Welcome To Men section</h1>
            <div>
                <select onChange={(e)=>{this.props.sort(e)}}>
                    <option value="Default">Default</option>
                    <option value="High To Low">Price: High to Low</option>
                    <option value="Low To High">Price: Low to High</option>
                </select>
            </div>
            <div className="productGrid">
            {this.props.products.map((x)=>x.men ? 
            <div>
            <Link to="/Product">
            <button onClick={(e)=>{this.props.showProduct({x})}}>
            {<img src={x.picture.file} alt="Product" style={{width:'250px'}}></img>}
            <div>{x.name}{x.price}</div>
            </button>
            </Link>
            <div>
                <select onChange={(e)=>{x.sizeSelect=e.target.value;console.log(x.sizeSelect)}}>
                    <option>Select</option>
                    <option>S</option>
                    <option>M</option>
                    <option>L</option>
                    <option>XL</option>
                </select>
            </div>
            <div>{<button onClick={(e)=>{this.props.addToCart({x,gender})}}>Add To Cart</button>}
            {<button onClick={(e)=>this.props.addToWishlist({x})}>Add To Wishlist</button>}
            </div>
            </div>:null)}
            </div>
            </div>
        )
    }
}

export default Men;