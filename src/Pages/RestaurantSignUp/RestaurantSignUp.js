import React, { useState } from 'react'
import "../../CommonStyle/loginandsignup.css";
import restaurant from "../../Assets/restaurant.webp";
import { useNavigate } from 'react-router-dom';

export default function RestaurantSignUp() {
  const navigate = useNavigate();
  const gotoRestaurantLoginPage=()=>{
    navigate("/restaurant/login");
  }  
  return (
    <div className='login-signup-main-container'>
        <div className='login-signup-image-box'>
            <img src={restaurant} alt="restaurantimage" className='login-signup-page-img'></img>
        </div> 
        <div className='login-signup-container'>
            <div className='login-signup-form-box customer-login-signup-form-box'>
                <h1>Restaurant Sign Up</h1>
                <div className='login-signup-form-fields'>
                    <label htmlFor="restaurant-name">Restaurant Name</label>
                    <input type='text' id='restaurant-name' className='login-signup-form-input' name="restaurant-name" ></input>
                </div>
                <div className='login-signup-form-fields'>
                    <label htmlFor="restaurant-email">Restaurant Email</label>
                    <input type='email' id='restaurant-email' className='login-signup-form-input' name="restaurant-email" ></input>
                </div>
                <div className='login-signup-form-fields'>
                    <label htmlFor="restaurant-address">Address of Restaurant</label>
                    <input type='text' id='restaurant-address' className='login-signup-form-input' name="restaurant-address" ></input>
                </div>
                <div className='login-signup-form-fields'>
                    <label htmlFor="restaurant-opening-time">Opening Time</label>
                    <input type="time" id="restaurant-opening-time" className='login-signup-form-input' name="restaurant-opening-time"></input>
                </div>
                <div className='login-signup-form-fields'>
                    <label htmlFor="restaurant-closing-time">Closing Time</label>
                    <input type="time" id="restaurant-closing-time" className='login-signup-form-input' name="restaurant-closing-time"></input>
                </div>
                <div className='login-signup-form-fields'>
                    <label htmlFor="restaurant-password">Password</label>
                    <input type='password' id='restaurant-password' className='login-signup-form-input' name="restaurant-password" ></input>
                </div>
                <div className='login-signup-form-complete-btn-box'>
                    <button className='login-signup-form-complete-btn customer-login-signup-btn'>Sign Up</button>
                </div>
                <div className='login-signup-link-box'>
                    <p>Already have an account?<span className='login-sign-up-link' onClick={gotoRestaurantLoginPage}>Login</span></p>
                </div>
            </div>
        </div>
    </div>
  )
}
