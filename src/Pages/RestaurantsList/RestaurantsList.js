import { LinearProgress } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import "./restaurantslist.css";

export default function RestaurantsList() {
  const [restaurantsList, setRestaurantsList] = useState();

  const getRestaurantsList=async()=>{
    try{
        const result = await axios.get("http://localhost:8080/restaurant/get_restaurantslist");
        console.log(result);
        if(result.status===200){
            setRestaurantsList(result.data);
        }
    }
    catch(e){
        console.log(e);
    }
  }
  useEffect(()=>{
    getRestaurantsList();
  },[]);
  const checkRestFoodMenu=async(restaurant)=>{
    const restaurantID = restaurant._id;
    try{
        const result = await axios.post("http://localhost:8080/restaurant_food/getfoodmenu", {restaurantID});
        if(result.status===200){
            console.log(result.data);
        }
    }
    catch(e){
        console.log(e);
    }
  }

  return (
    <div className='restlist-page-container'>
        <h2>Restaurants List</h2>
        <table className="restlist-table">
            <thead>
            <tr>
                <th>Restaurant Name</th>
                <th>Address</th>
                <th>OpeningTime - ClosingTime</th>
            </tr>
            </thead>
            <tbody>
            {
                restaurantsList && (
                <>
                {restaurantsList.map((row, index)=>(
                    <tr key={index}>
                        <td>{row.restaurant_name}</td>
                        <td>{row.restaurant_address}</td>
                        <td>{row.restaurant_openingtime}{"-"}{row.restaurant_closingtime}</td>
                    </tr>
                ))}
                </>
                )
            }
            </tbody>
        </table>
        {restaurantsList ? 
        (<>
        {restaurantsList.length===0 && (
        <p className="no-items-present">Your  Menu is empty!</p>
        )}
        </>):
        (
            <>
            <div className="table-loading-icon-div">
                <LinearProgress sx={{backgroundColor: "#ff910050",
                "& .MuiLinearProgress-bar": {
                backgroundColor: "#ff9100"}}}/>
            </div>
            </>
        )}
    </div>
  )
}
