import React from "react";
import {BrowserRouter as Router,Route,Link} from "react-router-dom";
import '../App.css';

function Footer(){
    return (
    <div>
        <footer id="footer">
          <p>&copy;2019 Hardik Aswal , All Rights Reserved</p>
          <p style={{wordSpacing:"20px"}}><Link to="/Admin">Admin</Link> <Link to="/">User</Link></p>

        </footer>
    </div>    
    )
}

export default Footer;