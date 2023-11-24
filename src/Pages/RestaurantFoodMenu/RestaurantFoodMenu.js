import axios from "axios";
import React, { useEffect, useState } from "react";
import "./restaurantfoodmenu.css";
import { useNavigate } from "react-router-dom";
import { LinearProgress } from "@mui/material";

export default function RestaurantFoodMenu() {
  const [foodItems, setFoodItems] = useState([]);
  const navigate = useNavigate();
  
  const getFoodItems = async ()=>{
    try{
      const result = await axios.get("http://localhost:8080/restaurant_food/get_rest_fooditemslist", {
        headers:{
            Authorization:localStorage.getItem("r-token")
        }
      });
      if(result.status===200){
        setFoodItems(result.data);
        console.log(result.data);
      }
    }
    catch(e){
      alert(e.response.data.msg);
    }
  }
  useEffect(()=>{
    getFoodItems();
  },[]);
  const navigateToEdit=(item)=>{
    navigate("/restaurant/editfooditem", { state: item })
  }
  return (
    <div className='foodmenu-maincontainer'>
      <h2>Food Items List</h2>
      <table className="foodmenu-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>View</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {foodItems && (
            <>
              {foodItems.map((row)=>(
                <tr>
                  <td><img src={row.item_picture_url} alt={row.item_name} className="item-img-in-menu"></img></td>
                  <td>{row.item_name}</td>
                  <td>{row.item_quantity}</td>
                  <td>₹{row.item_price}</td>
                  <td>
                    <button className="table-action-btn">View</button>
                  </td>
                  <td>
                    <button className="table-action-btn" onClick={()=>navigateToEdit(row)}>Edit</button>
                  </td>
                  <td>
                    <button className="table-action-btn">Delete</button>
                  </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
      {foodItems.length===0 && (
       <>
        <div className="table-loading-icon-div">
          <LinearProgress sx={{backgroundColor: "#ff910050",
           "& .MuiLinearProgress-bar": {
           backgroundColor: "#ff9100"}}}/>
        </div>
       </>)}
    </div>
  )
}
