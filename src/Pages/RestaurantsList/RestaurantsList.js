import { LinearProgress } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "./restaurantslist.css";
import ItemsCarousel from '../../Components/ItemsCarousel/ItemsCarousel';

export default function RestaurantsList() {
  const [restaurantsList, setRestaurantsList] = useState();
  const [exploreRestMenu, setExploreRestMenu] = useState(); 
  const [displayRestFoodMenu, setDisplayRestFoodMenu] = useState(false);

  const getRestaurantsList=async()=>{
    try{
        const result = await axios.get("https://food-ordering-webapp-backend.onrender.com/restaurant/get_restaurantslist");
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
  const handleDisplayMenuClick=(restaurant)=>{
    setDisplayRestFoodMenu(true);
    setExploreRestMenu(restaurant);
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
                <th>Explore Food Menu</th>
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
                        <td>
                            <button className='table-action-btn' onClick={()=>handleDisplayMenuClick(row)}>Menu</button>
                        </td>
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
        {displayRestFoodMenu?(
            <div>
                <ItemsCarousel id={exploreRestMenu._id} heading={`${exploreRestMenu.restaurant_name}`+" Food Menu"}/>
            </div>
        ):(<></>)
        }
    </div>
  )
}
