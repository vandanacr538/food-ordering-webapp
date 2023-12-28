import { AddShoppingCart, Close, FoodBank, Search } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import "./customerheader.css";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CustomerHeader() {
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const [allFoodList, setAllFoodList] = useState([]);
  const [searchResultArr, setSearchResultArr] = useState([]);
  const [noSearchData, setNoSearchData] = useState(false);
  const [showFoodItem, setShowFoodItem] = useState(false);
  const [searchedItemDetails, setSearchedItemDetails] = useState({});

  const getAllFoodList = async()=>{
    const result = await axios.get("https://food-ordering-webapp-backend.onrender.com/restaurant_food/get_full_food_itemslist");
      if(result.status===200){
        setAllFoodList(result.data);
    }
  }
  useEffect(()=>{
    getAllFoodList();
  }, [])
  const searchFood=(e)=>{
    setSearchResultArr([]);
    setNoSearchData(false);
    if(e.target.value===""){
      return;
    }
    else{
      const searchedData=allFoodList.filter((element)=>
        element.item_name.toString().toLowerCase().includes(e.target.value.toString().toLowerCase())
      )
      if(searchedData.length>0){
        setSearchResultArr(searchedData);
      }
      else{
        setNoSearchData(true);
      }
      
    }
  }
  const debounce=(func, timeout)=>{
    let timerID;
    return function(...args){
      clearTimeout(timerID);
      setTimeout(()=>{
        func.apply(this, args);
      }, timeout);
    }
  }
  const handleSearchInputKeyUp=debounce(searchFood, 500);
  const displayItemModal=(item)=>{
    setShowFoodItem(true);
    setSearchedItemDetails(item);
  }
  const addItemToCart=async(item)=>{
    const itemToAddToCart = {item:item, quantity:1}
    try{
      const result = await axios.post("https://food-ordering-webapp-backend.onrender.com/cart/add_to_cart", itemToAddToCart, 
      {
        headers:{
          Authorization:localStorage.getItem("c-token")
        }
      });
      if(result.status===200){
        setShowFoodItem(false);
        setSearchResultArr([]);
        if(pathname==="/customer/cart"){
          window.location.reload();
        }
        else{
          navigate("/customer/cart");
        }
      }
    }
    catch(e){
      console.log(e.response.data.msg);
    }
  }
  const gotoCustHomePage = ()=>{
    navigate("/customer/home");
  }
  const gotoRestaurantsPage = ()=>{
    navigate("/customer/restaurantslist");
  }
  const gotoCustProfilePage = ()=>{
    navigate("/customer/profile");
  }
  const gotoCustCartPage = ()=>{
    navigate("/customer/cart");
  }
  const logOutCustomer=()=>{
    localStorage.removeItem("c-token");
    navigate("/");
  }
  return (
    <div>
        <header>
        <div className="cheader-left-side">
          <div className='cust-main-icon-header'>
            <FoodBank sx={{ width: "65px", height: "60px", color: "#ff9100" }} className='foodbank-icon' onClick={gotoCustHomePage}/>
          </div>
        </div>
        <div className='search-container'>
          <div className='search-div'>
              <input type='text' className='header-search' 
              placeholder='Search food'
              onKeyUp={handleSearchInputKeyUp}
              ></input>
              <Search className='search-icon' />
          </div>
          {searchResultArr.length>0?(
                <div className="search-result">
                  {searchResultArr?.map((element, index)=>{
                    return (
                    <div className="search-result-card" onClick={()=>displayItemModal(element)} key={index}>
                      <img src={element.item_picture_url} alt="item_picture" className="img-search-result"></img>
                      <div>
                      <p className='search-result-item-name'>{element.item_name}</p>
                      <p>₹{element.item_price}</p>
                      </div>
                    </div>
                    )
                  })}
                </div>
              ):(
              <div className='no-search-data-found' style={{display:noSearchData?"block":""}}>
                <p>No results found!</p>
              </div>
            )}
        </div>
        <div className='cust-header-list-div'>
            <ul>
                <li 
                  className={(pathname==="/customer/home")?"cust-header-list cust-header-active-list":"cust-header-list"}
                  onClick={gotoCustHomePage}
                >Home
                </li>
                <li 
                className={(pathname==="/customer/restaurantslist")?"cust-header-list cust-header-active-list":"cust-header-list"}
                onClick={gotoRestaurantsPage}
                >Restaurants</li>
                <li 
                  className={(pathname==="/customer/cart")?"cust-header-list cust-header-active-list":"cust-header-list"}
                  onClick={gotoCustCartPage}
                  >Cart
                </li>
                <li
                  className={(pathname==="/customer/profile")?"cust-header-list cust-header-active-list":"cust-header-list"}
                  onClick={gotoCustProfilePage}
                  >Profile
                </li>
                <li className='cust-header-list' onClick={logOutCustomer}>Logout</li>
            </ul>
        </div>
        <div className={showFoodItem? "searched-item-modal-container":"hide-data"}>
          <div className="searched-item-modal-header">
            <h3></h3>
            <Close style={{marginBottom:"5px", fontSize:"20px", color:"#ff9100"}} className="close-icon"
            onClick={()=>setShowFoodItem(false)}/>
          </div>
          <div className="searched-item-modal-img-box">
          <img src={searchedItemDetails.item_picture_url} alt={searchedItemDetails.item_name} className="searched-item-modal-img"></img>
          </div>
          <div className="searched-item-modal-content-box">
            <div className="searched-item-modal-box1">
              <div>
                <p><span>Item Name:</span> {searchedItemDetails.item_name}</p>
                <p><span>Item Price:</span>₹{searchedItemDetails.item_price}</p>
              </div>
              <AddShoppingCart sx={{marginBottom:"-5px", color:"#ff9100", fontSize:"45px"}} 
                className='add-cart-icon' 
                onClick={()=>addItemToCart(searchedItemDetails)}/>
            </div>
            <p className='searched-item-modal-des'><span>Item Description:</span> {searchedItemDetails.item_description}</p>
          </div>
        </div>
      </header>
    </div>
  )
}
