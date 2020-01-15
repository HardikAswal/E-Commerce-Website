import React from 'react';
import {BrowserRouter as Route,Link} from 'react-router-dom';

class Wishlist extends React.Component {

    render(){
        let sizeSelect=null;
        return (
        <div className="wishlist-show">
            {this.props.show ? 
               <div className="wishlist-container">
               <h4>Wishlist <span onClick={(e)=>{this.props.changeShow(e);console.log(this.props.show)}}
               style={{backgroundColor:"orange",borderRadius:"40px",padding:"3px",paddingLeft:"7px",paddingRight:"7px",fontSize:"16px",cursor:"pointer",textAlign:"center",float:"right",marginRight:"15px",textTransform:"lowercase",marginTop:"-14px"}}><i class="fas fa-times"></i></span></h4>
               <div className="wishlist-productGrid">
              {this.props.wishlist.map((x,i)=>(
              <div className="wishlist-product" onClick={(e)=>{this.props.showProduct({x})}}>
              <Link to="/Product" > 
              {<img src={x.picture.file} alt="Product" style={{width:'100px'}}></img>}
              </Link>
              <Link to="/Product">
              <div><b>{x.name}</b></div>
              </Link>
              <div>Rs.{x.price}</div>   
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
              {<button onClick={(e)=>this.props.deleteFromWishlist(i)}>Remove</button>}
              </div>
              </div>))}
              </div>
           </div>:null}
            
        </div>    
            
        )
    }
}

export default Wishlist;