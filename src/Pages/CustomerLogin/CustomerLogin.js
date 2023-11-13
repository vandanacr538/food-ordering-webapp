import React from 'react'
import "../../CommonStyle/customerandrestaurant.css";
import "../../CommonStyle/customer.css";
import customerpage from "../../Assets/customerpage.png";
import { useNavigate } from 'react-router-dom';

export default function CustomerLogin() {
  const navigate = useNavigate();
  const gotoSignUpPage=()=>{
    navigate("/customer/signup");
  }

  return (
    <div className='customer-login-signup-main-container'>
      <div className='customer-login-signup-container'>
        <div className='login-signup-form-box customer-login-signup-form-box'>
          <h1>Customer Login</h1>
          <div className='login-signup-form-fields'>
            <label htmlFor="customer-email">Email</label>
            <input type='email' id='customer-email' className='login-signup-form-input' name="customer-email" ></input>
          </div>
          <div className='login-signup-form-fields'>
            <label htmlFor="customer-password">Password</label>
            <input type='password' id='customer-password' className='login-signup-form-input' name="customer-password" ></input>
          </div>
          <div className='login-signup-form-complete-btn-box'>
            <button className='login-signup-form-complete-btn customer-login-signup-btn'>Sign in</button>
          </div>
          <div className='login-signup-link-box'>
            <p>Don't have an account?<span className='login-sign-up-link' onClick={gotoSignUpPage}>Sign Up</span></p>
          </div>
        </div>
      </div>
      <div className='customer-login-signup-image-box'>
        <img src={customerpage} alt="customerloginpage" className='customer-login-signup-page-img'></img>
      </div>
    </div>
  )
}
