import React, { useEffect, useRef, useState } from 'react'
import "./itemscarousel.css";
import { AddShoppingCart, KeyboardArrowDown, KeyboardArrowUp, NavigateBefore, NavigateNext } from '@mui/icons-material';
import axios from 'axios';

export default function ItemsCarousel() {
  const itemCarouselElement = useRef();
  const [foodList, setFoodList] = useState();
  const [fullDescription, setFullDescription] = useState(false);
  
  const handleClickItemCarBackward=()=>{
    itemCarouselElement.current.scrollBy({
      top: 100,
      left: -1000,
      behavior: "smooth",
    });
  }
  const handleClickItemCarForward=()=>{
    console.log("forward");
    itemCarouselElement.current.scrollBy({
      top: 100,
      left: 1000,
      behavior: "smooth",
    });
  }
  const getFoodList = async ()=>{
    try{
      const result = await axios.get("http://localhost:8080/restaurant_food/get_full_food_itemslist");
      if(result.status===200){
        setFoodList(result.data);
      }
    }
    catch(e){
      alert(e.response.data.msg);
    }
  }
  useEffect(()=>{
    getFoodList();
  },[]);
  const handleClickDisplayFullDesc=()=>{
    setFullDescription(!fullDescription);
  }
  return (
    <div className='items-carousel-maincontainer'>
      <h2>Food items full list</h2>
      <div className='items-carousel-cards' ref={itemCarouselElement}>
        <button className="item-carousel-nav-left" onClick={handleClickItemCarBackward}>
          <NavigateBefore className="item-carousel-nav"/>
        </button>
        <button className="item-carousel-nav-right" onClick={handleClickItemCarForward}>
          <NavigateNext className="item-carousel-nav"/>
        </button>
        {foodList ? foodList.map((element)=>{
          return (
            <div className='items-carousel-card'>
              <div className='item-car-img-box'>
                <img src={element.item_picture_url} alt={element.item_name} className='item-carousel-img'></img>
              </div>
              <div className='item-carousel-details-box'>
                <h3 className='item-name-in-carousel'>{element.item_name}</h3>
                <div className='item-desc-in-carousel-box' onClick={handleClickDisplayFullDesc}>{fullDescription?
                  (<p className='item-desc-content'>{element.item_description}
                  <span className='item-desc-less'><KeyboardArrowUp style={{fontSize:"16px", color:"#000", marginBottom:"-5px"}}/></span>
                  </p>):(<p className='item-desc-content'>{element.item_description.substring(0,30)}...
                  <span className='item-desc-more'><KeyboardArrowDown style={{fontSize:"16px", color:"#000", marginBottom:"-6px"}}/></span>
                  </p>)}
                </div>
                <div className='item-price-cart-div'>
                  <p className='item-price-in-carousel'>₹{element.item_price}</p>
                  <AddShoppingCart sx={{marginBottom:"-5px", color:"#ff9100", fontSize:"35px"}} className='add-cart-icon' />
                </div>
              </div>
            </div>
          )
        }):(
          <></>
        )}
      </div>
    </div>
  )
}
