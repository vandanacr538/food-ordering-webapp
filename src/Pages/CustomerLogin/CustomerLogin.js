import React from 'react'
import "../customerandrestaurant.css";
import "./customerlogin.css";
import customerloginpage from "../../Assets/customerloginpage.png";

export default function CustomerLogin() {
  return (
    <div className='customer-login-main-container'>
      <div className='customer-login-container'>
        <div className='page-form-box customer-form-box'>
          <h1>Customer Login</h1>
          <div className='page-form-fields'>
            <label htmlFor="customer-email">Email</label>
            <input type='email' id='customer-email' className='page-form-input' name="customer-email" ></input>
          </div>
          <div className='page-form-fields'>
            <label htmlFor="customer-password">Password</label>
            <input type='text' id='customer-password' className='page-form-input' name="customer-password" ></input>
          </div>
          <div className='page-task-complete-btn-box'>
          <button className='page-task-complete-btn customer-login-btn' >Sign in</button>
          </div>
          <div className='no-account-box'>
            <p>Don't have an account?<span className='sign-up-link'>Sign Up</span></p>
          </div>
        </div>
      </div>
      <div className='customer-login-image-box'>
        <img src={customerloginpage} alt="customerloginpage" className='customer-login-page-img'></img>
      </div>
    </div>
  )
}
