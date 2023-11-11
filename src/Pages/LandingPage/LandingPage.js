import React from 'react'
import "./landingpage.css";
import landingimg from "../../Assets/landingimg.png";


export default function LandingPage() {
  return (
    <div className='landing-page-main-container'>
        <div className='landing-page-intro-container'>
            <div className='landing-page-intro-box'>
                <h1>Food Ordering Web App</h1>
                <button className='landing-page-intro-btn'>Customer</button>
                <button className='landing-page-intro-btn'>Restaurant</button>
            </div>
            <div className='landing-page-intro-box'>
                <img src={landingimg} alt="landing-img" className='landing-img'></img>
            </div>
        </div>
    </div>
  )
}
