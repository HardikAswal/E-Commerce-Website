import React from 'react';
import {BrowserRouter as Route,Link} from 'react-router-dom';

class Wishlist extends React.Component {

    render(){
        let sizeSelect=null;
        return (
            <div>
                <h1>Wishlist</h1>
                <div className="productGrid">
               {this.props.wishlist.map((x,i)=>(
               <div>
               <Link to="/Product"> 
               <button onClick={(e)=>{this.props.showProduct({x})}}>
               {<img src={x.picture.file} alt="Product" style={{width:'250px'}}></img>}
               <div>{x.name}{x.price}</div>
               </button>
               </Link>   
               <div>
                <select onChange={(e)=>{x.sizeSelect=e.target.value}}>
                    <option>Select</option>
                    <option>S</option>
                    <option>M</option>
                    <option>L</option>
                    <option>XL</option>
                </select>
               
               </div>
               <div>
               {<button onClick={(e)=>this.props.wishlistToCart({x},i)}>Add to Cart</button>}
               {<button onClick={(e)=>this.props.deleteFromWishlist(i)}>Delete</button>}
               </div>
               </div>))}
               </div>
            </div>
        )
    }
}

export default Wishlist;