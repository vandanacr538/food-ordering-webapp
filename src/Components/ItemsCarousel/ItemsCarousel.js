import React, { useEffect, useRef, useState } from 'react'
import "./itemscarousel.css";
import { AddShoppingCart, KeyboardArrowDown, KeyboardArrowUp, NavigateBefore, NavigateNext } from '@mui/icons-material';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

export default function ItemsCarousel(props) {
  const pathname = useLocation();
  const navigate = useNavigate();
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
      if(window.location.pathname==="/customer/restaurantslist"){
        setFoodList();
        const result = await axios.post("http://localhost:8080/restaurant_food//getrest_foodmenu", {}, {
          headers:{
            Authorization: props.id
          }
        });
        if(result.status===200){
            setFoodList(result.data);
        }
      }
      else{
        const result = await axios.get("http://localhost:8080/restaurant_food/get_full_food_itemslist");
        if(result.status===200){
          setFoodList(result.data);
        }
      }
    }
    catch(e){
      alert(e.response.data.msg);
    }
  }
  useEffect(()=>{
    getFoodList();
  },[props.heading]);
  const handleClickDisplayFullDesc=()=>{
    setFullDescription(!fullDescription);
  }
  const addItemToCart=async(item)=>{
    const itemToAddToCart = {item:item, quantity:1}
    try{
      const result = await axios.post("http://localhost:8080/cart/add_to_cart", itemToAddToCart, 
      {
        headers:{
          Authorization:localStorage.getItem("c-token")
        }
      });
      if(result.status===200){
        navigate("/customer/cart");
      }
    }
    catch(e){
      console.log(e.response.data.msg);
    }
  }
  return (
    <div className='items-carousel-maincontainer'>
      <h2>{props.heading}</h2>
      {foodList?(
        <>
        {foodList.length>0?(
          <>
          <div className='items-carousel-cards' ref={itemCarouselElement}>
            <button className="item-carousel-nav-left" onClick={handleClickItemCarBackward}>
              <NavigateBefore className="item-carousel-nav"/>
            </button>
            <button className="item-carousel-nav-right" onClick={handleClickItemCarForward}>
              <NavigateNext className="item-carousel-nav"/>
            </button>
            {foodList ? foodList.map((element, index)=>{
              return (
                <div className='items-carousel-card' key={index}>
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
                      <AddShoppingCart sx={{marginBottom:"-5px", color:"#ff9100", fontSize:"35px"}} className='add-cart-icon' 
                      onClick={()=>addItemToCart(element)}/>
                    </div>
                  </div>
                </div>
              )
            }):(
              <></>
            )}
          </div>
          </>
        ):(<>This Restaurant Food Menu is not avaiable!</>)}
        </>
      ):(
      <>
      <div className='carousel-loader-div'>
        <CircularProgress style={{color:"#ff9100", width:"60px", height:"60px"}}/>
      </div>
      </>)}
    </div>
  )
}
