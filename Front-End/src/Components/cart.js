import React from 'react';
import {BrowserRouter as Route,Link} from 'react-router-dom';

class Cart extends React.Component {

    render(){
        return (
            <div>
                <h1>Cart</h1>
                
                <div style={{float:"right"}}>
                {this.props.cart.length >= 1 ? <button>Buy Now</button>:null}    
                </div>

               <div className="productGrid">
               {this.props.cart.map((x,i)=><div>
                <Link to="/Product">
               <button onClick={(e)=>{this.props.showProduct({x})}}>
               {<img src={x.picture.file} alt="Product" style={{width:'250px'}}></img>}
               <div>{x.name}{x.price}</div>
               </button>
               </Link>
               <div>
               {<button onClick={(e)=>this.props.cartToWishlist({x},i)}>Add to Wishlist</button>}
               {<button onClick={(e)=>this.props.deleteFromCart(i)}>Delete</button>}
               </div>
               </div>)}
               </div>
            </div>
        )
    }
}

export default Cart;