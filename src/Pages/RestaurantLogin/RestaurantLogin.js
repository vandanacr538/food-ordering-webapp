import React from 'react'
import "../../CommonStyle/loginandsignup.css";
import restaurant from "../../Assets/restaurant.webp";
import { useNavigate } from 'react-router-dom';

export default function RestaurantLogin() {
  const navigate = useNavigate();
  const gotoRestaurantSignUpPage=()=>{
    navigate("/restaurant/signup");
  }

  return (
    <div className='login-signup-main-container'>
        <div className='login-signup-image-box'>
            <img src={restaurant} alt="restaurantimage" className='login-signup-page-img'></img>
        </div>
        <div className='login-signup-container'>
            <div className='login-signup-form-box restaurant-login-signup-form-box'>
                <h1>Restaurant Login</h1>
                <div className='login-signup-form-fields'>
                    <label htmlFor="restaurant-email">Restaurant Email</label>
                    <input type='email' id='restaurant-email' className='login-signup-form-input' name="restaurant-email" ></input>
                </div>
                <div className='login-signup-form-fields'>
                    <label htmlFor="restaurant-password">Password</label>
                    <input type='password' id='restaurant-password' className='login-signup-form-input' name="restaurant-password" ></input>
                </div>
                <div className='login-signup-form-complete-btn-box'>
                    <button className='login-signup-form-complete-btn restaurant-login-signup-btn'>Sign in</button>
                </div>
                <div className='login-signup-link-box'>
                    <p>Don't have an account?<span className='login-sign-up-link' onClick={gotoRestaurantSignUpPage}>Sign Up</span></p>
                </div>
            </div>
        </div>
    </div>
  )
}
