import { FoodBank, Search } from '@mui/icons-material'
import React from 'react'
import "./customerheader.css";
import { useLocation, useNavigate } from 'react-router-dom';

export default function CustomerHeader() {
  const navigate = useNavigate();
  const {pathname} = useLocation();
  
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
      </header>
    </div>
  )
}
