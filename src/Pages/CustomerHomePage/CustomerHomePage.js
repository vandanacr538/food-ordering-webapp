import React, { useEffect, useState } from 'react'
import ItemsCarousel from '../../Components/ItemsCarousel/ItemsCarousel'
import "./customerhomepage.css";
import bannerimg from "../../Assets/bannerimg.png";
import axios from 'axios';
import { decodeToken } from 'react-jwt';

export default function CustomerHomePage() {
  const [customerDetails, setCustomerDetails] = useState();
  
  const getCustomerDetails =async()=>{
    try{
      const result = await axios.get("https://food-ordering-webapp-backend.onrender.com/customer/get_customer_details", {
        headers:{
          Authorization:localStorage.getItem("c-token")
        }
      });
      if(result.status===200){
        setCustomerDetails(decodeToken(result.data.token));
      }
    }
    catch(e){
      alert(e.response.data.msg);
    }
  }
  useEffect(()=>{
    getCustomerDetails();
  }, []);
  const exploreFood=(e)=>{
    e.preventDefault();
    window.scrollTo({
    top: document.querySelector("#food-list").offsetTop,
    behavior: "smooth"
  });
  }

  return (
    <div className='cust-homepage-main-container'>
      <div className='cust-banner-maincontainer'>
        <div className='cust-banner-content'>
            <h1>Order your best food at anytime</h1>
            <p>Hi {customerDetails && (
              <span>{customerDetails.customer_name}</span>
            )}, our delicious, tasty food are waiting for you in our food list. You can order anytime</p>
            <button className='cust-banner-btn' onClick={exploreFood}>Explore food</button>
        </div>
        <div className='cust-banner-image-box'>
            <img src={bannerimg} alt="banner" className='cust-banner-img'></img>
        </div>
      </div>
      <div id='food-list'>
        <ItemsCarousel heading={"Food items full list"}/>
      </div>
    </div>
  )
}
