import React from 'react';
import './App.css';
import axios from 'axios';
import Nav from "./Components/navbar";
import Home from "./Components/home";
import Cart from "./Components/cart";
import Wishlist from "./Components/wishlist";
import Men from "./Components/men";
import Women from "./Components/women";
import Kids from "./Components/kids";
import Admin from "./Components/admin";
import Product from "./Components/product";
import Buynow from './Components/buynow';
import Footer from './Components/footer';
import './carousel.css';
import {BrowserRouter as Router,Route,Link} from "react-router-dom";


class App extends React.Component {
  constructor(props){
    super(props);
    this.state={};
    this.state.show=null;
    this.state.products=[];
    this.state.admin=[];
    this.state.cart=[];
    this.state.wishlist=[];
    this.state.productPage=[]  
  }

  componentDidMount(){
    axios.get('http://localhost:5000/admin').then((res)=>{
      console.log(res.data);
      const products = res.data;
      const admin = res.data;
      this.setState({
        products,
        admin
      });
      console.log(this.state.admin);
    })}

  //Add product information from Admin Page
  AddInfo(info){
    let s = this.state.products;
    let j = this.state.admin;
    console.log(info);

    let obj ={name:"",price:"",picture:null,date: new Date(),id:Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 15),description:"",style:"",neck:"",sleeve:"",sizeSelect:null,qtyS:"",qtyM:"",qtyL:"",qtyXL:"",men:"",women:"",kids:""};

    if (info.productPicture.file !== null && info.productName !== "" && info.productPrice >= 0 
    && info.productDesc !== "" && info.qtyS >= 0 && info.qtyM >= 0 && info.qtyL >= 0 && info.qtyXL >= 0
    && info.neck !== "" && info.sleeve !== "" && info.style !== ""){ 
    obj.picture=info.productPicture;
    obj.name=info.productName;
    obj.price=info.productPrice;
    obj.description=info.productDesc;
    obj.qtyS=info.qtyS;
    obj.qtyM=info.qtyM;
    obj.qtyL=info.qtyL;
    obj.qtyXL=info.qtyXL;
    obj.style=info.style;
    obj.neck=info.neck;
    obj.sleeve=info.sleeve;
    obj.men=info.men;
    obj.women=info.women;
    obj.kids=info.kids;

    console.log(obj);
    console.log(info.productPicture.file);

    const data = new FormData();
    data.append('file', info.productPicture.file);

    axios.post('http://localhost:5000/upload', data, { // receive two parameter endpoint url ,form data 
    })
       .then(res => { // then print response status
         console.log(res.statusText)

        if (res.statusText == "OK"){
        axios.post('http://localhost:5000/admin',obj).then((res)=>{
          console.log("Products",res.data);
          j.push(res.data);
          this.setState({
            products:s,
            admin:j
          });
        });
        }
       })

    // axios.post('http://localhost:5000/admin',obj).then((res)=>{
    //   console.log("Products",res.data);
    //   j.push(res.data);
    //   this.setState({
    //     products:s,
    //     admin:j
    //   });
    // });
    }

    else{
      alert("Please fill all the fields.")
    }
  }  

  //Update product information
  UpdateInfo(product,x,i){
    let u = this.state.products; 
    console.log(u);
    console.log(product);
    console.log(x);
    console.log(i);

    for (let i=0;i<this.state.products.length;i++){
      if (u[i].id === x.x.id){
        if (product.updateName !== ""){
          u[i].name = product.updateName;
        }
        if (product.updateDesc !== ""){
          u[i].description = product.updateDesc;  
        }
        if (product.updatePrice !== ""){
          u[i].price = product.updatePrice;  
        }
        if (product.updatePicture.file !== null){
          u[i].picture = product.updatePicture;  
        }
        if (product.updateQtyS !== ""){
          u[i].qtyS = product.updateQtyS;  
        }
        if (product.updateQtyM !== ""){
          u[i].qtyM = product.updateQtyM;  
        }
        if (product.updateQtyL !== ""){
          u[i].qtyL = product.updateQtyL;  
        }
        if (product.updateQtyXL !== ""){
          u[i].qtyXL = product.updateQtyXL;  
        }
        if (product.updateNeck !== ""){
          u[i].neck = product.updateNeck;  
        }
        if (product.updateSleeve !== ""){
          u[i].sleeve = product.updateSleeve;  
        }
        if (product.updateStyle !== ""){
          u[i].style = product.updateStyle;  
        }
        if (product.updateMen !== ""){
          if (product.updateMen === "True"){
            u[i].men = true;
          }
          else if (product.updateMen === "False"){
            u[i].men = false;
          }
        }
        if (product.updateWomen !== ""){
          if (product.updateWomen === "True"){
            u[i].women = true;
          }
          else if (product.updateWomen === "False"){
            u[i].women = false;
          }
        }
        if (product.updateKids !== ""){
          if (product.updateKids === "True"){
            u[i].kids = true;
          }
          else if (product.updateKids === "False"){
            u[i].kids = false;
          }
        } 
      }
    }

    axios.post("http://localhost:5000/update",)
    this.setState({
      products:u,
      admin:u
    })
  }


  //Add product to cart from Men,Women or Kids section.
  addToCart(product){
    console.log(product);
    console.log(product.x);
    console.log(product.x.id);
    var matchFound=0;

    for (var i=0;i<this.state.cart.length;i++){
      if (product.x.id === this.state.cart[i].id){
        matchFound = matchFound + 1;
      }  
    }

    if (product.x.sizeSelect !== null && product.x.sizeSelect !== "Select" && matchFound === 0){
    let cart= this.state.cart;
    let cartObj={name:"",price:"",picture:"",id:"",style:"",neck:"",sleeve:"",qtyS:0,qtyM:0,qtyL:0,qtyXL:0,men:false,women:false,kids:false,sizeSelect:null,gender:null};
    
    cartObj.picture=product.x.picture;
    cartObj.name=product.x.name;
    cartObj.price=product.x.price;
    cartObj.id = product.x.id;
    cartObj.qtyS=product.x.qtyS;
    cartObj.qtyM=product.x.qtyM;
    cartObj.qtyL=product.x.qtyL;
    cartObj.qtyXL=product.x.qtyXL;
    cartObj.style=product.x.style;
    cartObj.neck=product.x.neck;
    cartObj.sleeve=product.x.sleeve;
    cartObj.men=product.x.men;
    cartObj.women=product.x.women;
    cartObj.kids=product.x.kids;
    cartObj.sizeSelect=product.x.sizeSelect;
    cartObj.gender=product.gender;
    cart.push(cartObj);

    console.log(cart);
    console.log("S:",cartObj.qtyS,"M:",cartObj.qtyM,"L:",cartObj.qtyL,"XL:",cartObj.qtyXL);
    console.log("Selected",cartObj.sizeSelect);

    if (cartObj.sizeSelect === "S"){
      if (cartObj.qtyS > 0){
        this.setState({
          cart:cart
        })
      }
      else{
        cart.splice(0,1);
        alert("Size not available!");
      }
    }
    else if (cartObj.sizeSelect === "M"){
      if (cartObj.qtyM !== 0){
        this.setState({
          cart:cart
        })
      }
      else{
        cart.splice(0,1);
        alert("Size not available!");
      }
    }
    else if (cartObj.sizeSelect === "L"){
      if (cartObj.qtyL > 0){
        this.setState({
          cart:cart
        })
      }
      else {
        cart.splice(0,1);
        alert("Size not available!");
      }
    }
    else if (cartObj.sizeSelect === "XL") {
      if (cartObj.qtyXL > 0){
        this.setState({
          cart:cart
        })
      }
      else{
        cart.splice(0,1);
        alert("Size not available!");
      }
    }
    else {

    }
}

  else{
    alert("Please select a size!");
  }
    console.log(this.state.cart);
}

//Add product to wishlist from Men,Women or Kids section.
  addToWishlist(product){
    console.log(product);
    console.log(product.x);
    var matchFound=0;

    for (var i=0;i<this.state.wishlist.length;i++){
      if (product.x.id === this.state.wishlist[i].id){
        matchFound = matchFound + 1;
      }  
    }

    if (matchFound === 0){
    let wishlist= this.state.wishlist;
    let wishlistObj={name:"",price:"",picture:"",id:"",style:"",neck:"",sleeve:"",qtyS:0,qtyM:0,qtyL:0,qtyXL:0,men:false,women:false,kids:false};
    
    wishlistObj.picture=product.x.picture;
    wishlistObj.name=product.x.name;
    wishlistObj.price=product.x.price;
    wishlistObj.id=product.x.id;
    wishlistObj.qtyS=product.x.qtyS;
    wishlistObj.qtyM=product.x.qtyM;
    wishlistObj.qtyL=product.x.qtyL;
    wishlistObj.qtyXL=product.x.qtyXL;
    wishlistObj.style=product.x.style;
    wishlistObj.neck=product.x.neck;
    wishlistObj.sleeve=product.x.sleeve;
    wishlistObj.men=product.x.men;
    wishlistObj.women=product.x.women;
    wishlistObj.kids=product.x.kids;
    wishlist.push(wishlistObj);

    console.log(wishlist);

    this.setState({
      wishlist:wishlist
    })
    console.log(this.state.wishlist);
  }
  }

  //Delete product from cart
  deleteFromCart(index){
    let cart = this.state.cart;
    cart.splice(index,1);
    this.setState({
      cart:cart
    })
  }

  //Delete product from wishlist
  deleteFromWishlist(index){
    let cart = this.state.wishlist;
    cart.splice(index,1);
    this.setState({
      wishlist:cart
    })
  }

  //Move product from wishlist to cart
  wishlistToCart(product,index){
    var num=0,i,j;
    console.log(product);
    console.log(product.x);
    console.log(index);
    console.log(this.state.cart.length);
    if (this.state.cart.length === 0 ){
      
      }

    else {
        for (i=0;i<this.state.cart.length;i++){
          for (j=0;j<this.state.cart.length;j++){
            console.log(product.x);
            console.log(this.state.cart[j]);
            if (product.x.picture === this.state.cart[j].picture){
                num=num+1;
            }
          }
        }
    }  
    console.log(num);
        if (num > 0){
          
        }
        else {
          if (product.x.sizeSelect !=null){
          this.addToCart(product);
        }
        }
      
  if (product.x.sizeSelect != null){      
  this.deleteFromWishlist(index);  
  }
  else {
    alert("Select Size");
  }    
  console.log(this.state.cart);
}

//Move product from Cart to Wishlist
cartToWishlist(product,index){
  var num=0,i,j;
  console.log(product);
  console.log(product.x);
  console.log(this.state.wishlist.length);
  if (this.state.wishlist.length === 0 ){
    
    }

  else {
      for (i=0;i<this.state.wishlist.length;i++){
        for (j=0;j<this.state.wishlist.length;j++){
          console.log(product.x);
          console.log(this.state.wishlist[j]);
          if (product.x.picture === this.state.wishlist[j].picture){
              num=num+1;
          }
        }
      }
  }  
  console.log(num);
      if (num > 0){
        
      }
      else {
        this.addToWishlist(product);
      }
   
  this.deleteFromCart(index);      
  console.log(this.state.cart);
}

//Product Page
showProduct(product){
  let productPage= this.state.productPage;
  productPage.splice(0,1);
  console.log(product);
  let productObj = {name:"",price:"",picture:"",description:"",style:"",neck:"",sleeve:"",qtyS:0,qtyM:0,qtyL:0,qtyXL:0,men:false,women:false,kids:false};
  productObj.picture=product.x.picture;
  productObj.name=product.x.name;
  productObj.price=product.x.price;
  productObj.description=product.x.description
  productObj.qtyS=product.x.qtyS;
  productObj.qtyM=product.x.qtyM;
  productObj.qtyL=product.x.qtyL;
  productObj.qtyXL=product.x.qtyXL;
  productObj.style=product.x.style;
  productObj.neck=product.x.neck;
  productObj.sleeve=product.x.sleeve;
  productObj.men=product.x.men;
  productObj.women=product.x.women;
  productObj.kids=product.x.kids;
  productPage.push(productObj);
  console.log(productPage);
  this.setState({
    productPage:productPage
  })
  console.log(this.state.productPage);
}

//Removing product from product list and cart
removeProduct(product){
  console.log(product);

  let p = this.state.products;
  let a = this.state.admin;
  let c = this.state.cart;
  let w = this.state.wishlist;

  for (let i=0;i<this.state.products.length;i++){
    if (p[i].name === product.x.name){
      p.splice(i,1);
    }
  }

  for (let i=0;i<this.state.admin.length;i++){
    if (a[i].name === product.x.name){
      a.splice(i,1);
    }
  }

  for (let i=0;i<this.state.cart.length;i++){
    if (c[i].name === product.x.name){
      c.splice(i,1);
    }
  }

  for (let i=0;i<this.state.wishlist.length;i++){
    if (w[i].name === product.x.name){
      w.splice(i,1);
    }
  }

  axios.delete("http://localhost:5000/admin/"+product.x._id).then((res)=>{
    this.setState({
      products:p,
      admin:a,
      cart:c,
      wishlist:w
    })
  })
}

//Price High To Low Sorting
highToLow(e){
  console.log(e);
  let a = this.state.products;
  console.log(a);
  
  for ( let i=0;i<a.length;i++){
    for (let j=i+1;j<a.length;j++){
      if (a[i].price < a[j].price){
        let temp = a[j];
        a[j]=a[i];
        a[i]=temp;
      }
    }
  }
  a.sort()
  this.setState({
    products:a
  })
}

//Price Low To High Sorting
lowToHigh(e){
  console.log(e);
  let a = this.state.products;
  console.log(a);
  
  for ( let i=0;i<a.length;i++){
    for (let j=i+1;j<a.length;j++){
      console.log(a[i].price,a[j].price);
      if (a[i].price > a[j].price){
        let temp = a[j];
        a[j]=a[i];
        a[i]=temp;
      }
    }
  }

  this.setState({
    products:a
  })
}

//Default Sort according to Time/Date 
Default(e){
  console.log(e);
  let a = this.state.products;
  console.log(a);
  for (let i=0;i<a.length;i++){
    console.log(a[i].date);
  }
  
  for ( let i=0;i<a.length;i++){
    for (let j=0;j<a.length;j++){
      if ( a[i].date < a[j].date){
        let temp = a[j];
        a[j]=a[i];
        a[i]=temp;
      }
    }
  }

  this.setState({
    products:a
  })
}

//Sort Function which further calls a function according to the request
sort(e){
  console.log(e.target.value);
  console.log(e);
  let highToLow="High To Low";
  let lowToHigh="Low To High";
  let Default="Default";
  if (e.target.value === highToLow){
    this.highToLow(e);
  }
  else if(e.target.value === lowToHigh){
    this.lowToHigh(e);
  }
  else if(e.target.value === Default){
    this.Default(e);
  }
}

keyPress(e){
  if(e.keyCode === 13){
    let u = this.state.products;
    console.log(u);
  }
}

changeShow(e){
  console.log(e.target.value);
  
  this.setState({
    show:!this.state.show
  })
}

  render(){
    return (
      <React.Fragment>
        <div id="main">
        <Route path="/" render={(e)=><Nav changeShow={this.changeShow.bind(this)} show={this.state.show} wishlist={this.state.wishlist} cart={this.state.cart} keyPress={this.keyPress.bind(this)}></Nav>}></Route>
        <div id="content">
        <Route path="/" exact component={Home}></Route>
        <Route path="/Cart" render={(e)=><Cart AddInfo={this.AddInfo.bind(this)} deleteFromCart={this.deleteFromCart.bind(this)} cart={this.state.cart} cartToWishlist={this.cartToWishlist.bind(this)} wishlistToCart={this.wishlistToCart.bind(this)} addToCart={this.addToCart.bind(this)} addToWishlist={this.addToWishlist.bind(this)} products={this.state.products} showProduct={this.showProduct.bind(this)}></Cart>}></Route>
        <Route path="/" render={(e)=><Wishlist changeShow={this.changeShow.bind(this)} show={this.state.show} AddInfo={this.AddInfo.bind(this)} deleteFromWishlist={this.deleteFromWishlist.bind(this)} cartToWishlist={this.cartToWishlist.bind(this)} wishlistToCart={this.wishlistToCart.bind(this)} addToCart={this.addToCart.bind(this)} wishlist={this.state.wishlist} addToWishlist={this.addToWishlist.bind(this)} products={this.state.products} showProduct={this.showProduct.bind(this)}> </Wishlist>}></Route>
        <Route path="/Admin" render={(e)=><Admin AddInfo={this.AddInfo.bind(this)} UpdateInfo={this.UpdateInfo.bind(this)} products={this.state.products} admin={this.state.admin} removeProduct={this.removeProduct.bind(this)}></Admin>}></Route>
        <Route path="/Men" render={(e)=><Men AddInfo={this.AddInfo.bind(this)} addToCart={this.addToCart.bind(this)} addToWishlist={this.addToWishlist.bind(this)} wishlist={this.state.wishlist} products={this.state.products} showProduct={this.showProduct.bind(this)} sort={this.sort.bind(this)}></Men>}></Route>
        <Route path="/Women" render={(e)=><Women AddInfo={this.AddInfo.bind(this)} addToCart={this.addToCart.bind(this)} addToWishlist={this.addToWishlist.bind(this)} products={this.state.products} showProduct={this.showProduct.bind(this)} sort={this.sort.bind(this)}></Women>}></Route>
        <Route path="/Kids" render={(e)=><Kids AddInfo={this.AddInfo.bind(this)} addToCart={this.addToCart.bind(this)} addToWishlist={this.addToWishlist.bind(this)} products={this.state.products} showProduct={this.showProduct.bind(this)} sort={this.sort.bind(this)}></Kids>}></Route>
        <Route path="/Product" render={(e)=><Product showProduct={this.showProduct.bind(this)} productPage={this.state.productPage}></Product>}></Route>
        <Route path="/Buynow" component={Buynow}></Route>
        </div>
        </div>
        <Route path="/" component={Footer}></Route>
      </React.Fragment>
    ) 
  }
}
export default App;
