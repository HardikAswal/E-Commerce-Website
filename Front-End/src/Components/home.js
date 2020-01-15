import React from "react";
// import {BrowserRouter as Router,Route,Link} from "react-router-dom";
import { Carousel } from 'antd';
import '../App.css';


function Home(){
    return (
    <div>
    <Carousel autoplay>
        <div className="caroImg1">
        </div>      
        <div className="caroImg2">
        </div>
        <div className="caroImg3">
        </div>
        <div className="caroImg4">
        </div>
    </Carousel>

    <div className="flex">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>

    <div className="grids">

    </div>

    
    </div>    
    )
}

export default Home;