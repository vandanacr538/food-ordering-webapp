import React from 'react'
import "./landingpage.css";
import landingimg from "../../Assets/landingimg.png";
import { useNavigate } from 'react-router-dom';


export default function LandingPage() {
  const navigate = useNavigate();
  const loginAsCustomer=()=>{
    navigate("/customer/login");
  } 
  const loginAsRestaurant=()=>{
    if(localStorage.getItem("r-token")){
      navigate("/restaurant/home");
    }
    else {
      navigate("/restaurant/login");
    }
  }

  return (
    <div className='landing-page-main-container'>
        <div className='landing-page-intro-container'>
            <div className='landing-page-intro-box'>
                <h1>Food Ordering Web App</h1>
                <button className='landing-page-intro-btn' onClick={loginAsCustomer}>Customer</button>
                <button className='landing-page-intro-btn' onClick={loginAsRestaurant}>Restaurant</button>
            </div>
            <div className='landing-page-intro-box'>
                <img src={landingimg} alt="landing-img" className='landing-img'></img>
            </div>
        </div>
    </div>
  )
}
