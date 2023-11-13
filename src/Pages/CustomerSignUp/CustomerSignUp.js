import React from 'react'
import "../../CommonStyle/customerandrestaurant.css";
import "../../CommonStyle/customer.css";
import customerpage from "../../Assets/customerpage.png";
import { useNavigate } from 'react-router-dom';

export default function CustomerSignUp() {
  const navigate = useNavigate();
  const gotoLoginPage=()=>{
    navigate("/customer/login");
  }  

  return (
    <div className='customer-login-signup-main-container'>
        <div className='customer-login-signup-container'>
            <div className='login-signup-form-box customer-login-signup-form-box'>
                <h1>Customer Sign Up</h1>
                <div className='login-signup-form-fields'>
                    <label htmlFor="customer-name">Name</label>
                    <input type='text' id='customer-name' className='login-signup-form-input' name="customer-name" ></input>
                </div>
                <div className='login-signup-form-fields'>
                    <label htmlFor="customer-email">Email</label>
                    <input type='email' id='customer-email' className='login-signup-form-input' name="customer-email" ></input>
                </div>
                <div className='login-signup-form-fields'>
                    <label htmlFor="customer-mobile">Mobile Number</label>
                    <input type='text' id='customer-mobile' className='login-signup-form-input' name="customer-mobile" ></input>
                </div>
                <div className='login-signup-form-fields'>
                    <label htmlFor="customer-password">Password</label>
                    <input type='password' id='customer-password' className='login-signup-form-input' name="customer-password" ></input>
                </div>
                <div className='login-signup-form-complete-btn-box'>
                    <button className='login-signup-form-complete-btn customer-login-signup-btn'>Sign Up</button>
                </div>
                <div className='login-signup-link-box'>
                    <p>Already have an account?<span className='login-sign-up-link' onClick={gotoLoginPage}>Login</span></p>
                </div>
            </div>
        </div>
        <div className='customer-login-signup-image-box'>
            <img src={customerpage} alt="customerpageimage" className='customer-login-signup-page-img'></img>
        </div> 
    </div>
  )
}
