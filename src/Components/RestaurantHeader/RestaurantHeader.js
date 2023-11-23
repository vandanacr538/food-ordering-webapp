import { ManageAccounts, Restaurant } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import "./restaurantheader.css";
import axios from 'axios';
import { decodeToken } from 'react-jwt';
import { useNavigate } from 'react-router-dom';

export default function RestaurantHeader() {
  const navigate = useNavigate();
  const [restaurantData, setRestaurantData] = useState({});

  const getRestDetails = async()=>{
    const result =await axios.get("http://localhost:8080/restaurant/get_restaurant_details",{
      headers:{
        Authorization:localStorage.getItem("r-token")
      }
    })
    setRestaurantData(decodeToken(result.data.token));
  }
  const gotoRestHomePage=()=>{
    navigate("/restaurant/home");
  }
  const gotoRestSettingsPage=()=>{
    navigate("/restaurant/settings");
  }
  useEffect(()=>{
    getRestDetails();
  },[])
  return (
    <div>
        <header>
        <div className="rheader-left-side">
          <div>
           <Restaurant sx={{ width: "50px", height: "45px", color: "#ff9100" }} />
          </div>
          <div onClick={gotoRestHomePage}>
            <h1 className='rheader-heading'>{restaurantData.restaurant_name}</h1>
          </div>
        </div>
        <div className="settings-icon-rheader" onClick={gotoRestSettingsPage}>
          <ManageAccounts sx={{ height: "45px", width: "50px", color: "#ff9100" }} className='manage-account-icon'/>
        </div>
      </header>
    </div>
  )
}
