import React from 'react'
import "./restauranthomepage.css";
import homepageimg from "../../Assets/homepageimg.avif";
import { useNavigate } from 'react-router-dom';

export default function RestaurantHomePage() {
  const navigate = useNavigate();

  const gotoAddFoodItemPage=()=>{
    navigate("/restaurant/addfooditem");
  }
   
  return (
    <div className='rest-home-maincontainer'>
      <div className='home-page-image-container'>
        <img src={homepageimg} alt="rest-home-page"></img>
      </div>
      <div className='home-page-content'>
        <h1>A good CHEF USES FOOD Not just to excite the THE SENSES BUT To tell a STORY</h1>
        <button className='home-page-add-btn' onClick={gotoAddFoodItemPage}>Add New Food Item</button>
      </div>
    </div>
  )
}
