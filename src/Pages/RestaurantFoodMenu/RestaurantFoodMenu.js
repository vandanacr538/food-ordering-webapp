import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../CommonStyle/form.css";
import "./restaurantfoodmenu.css";
import { useNavigate } from "react-router-dom";
import { LinearProgress } from "@mui/material";
import { Close } from "@mui/icons-material";

export default function RestaurantFoodMenu() {
  const [foodItems, setFoodItems] = useState();
  const navigate = useNavigate();
  const [showViewModal, setShowViewModal] = useState(false);
  const [itemToView , setItemToView] = useState({}); 
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete , setItemToDelete] = useState({}); 
  const [deleteSucess, setDeleteSuccess] = useState("");
  
  const getFoodItems = async ()=>{
    try{
      const result = await axios.post("http://localhost:8080/restaurant_food/get_rest_fooditemslist", {}, {
        headers:{
            Authorization:localStorage.getItem("r-token")
        }
      });
      if(result.status===200){
        setFoodItems(result.data);
      }
    }
    catch(e){
      alert(e.response.data.msg);
    }
  }
  useEffect(()=>{
    if(localStorage.getItem("r-token")){
      getFoodItems();
    }
  },[]);
  const displayViewModal=(item)=>{
    setShowViewModal(true);
    setItemToView(item);
  }
  const navigateToEdit=(item)=>{
    navigate("/restaurant/editfooditem", { state: item })
  }
  const displayDeleteModal=(item)=>{
    setShowDeleteModal(true);
    setItemToDelete(item);
  }
  const handleClickDeleteFoodItem=async()=>{
    console.log(itemToDelete);
    try{
      const response = await axios.delete("http://localhost:8080/restaurant_food/delete_food_item", {data:itemToDelete});
      if(response.status===200){
        setDeleteSuccess(response.data.msg);
        setTimeout(()=>{
          setShowDeleteModal(false);
          setItemToDelete({});
          setDeleteSuccess("");
        }, 2000);
      }
    }
    catch(e){
      alert(e.response.data.msg);
    }
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
          {
            foodItems && (
              <>
               {foodItems.map((row, index)=>(
                  <tr key={index}>
                    <td><img src={row.item_picture_url} alt={row.item_name} className="item-img-in-menu"></img></td>
                    <td>{row.item_name}</td>
                    <td>{row.item_quantity}</td>
                    <td>₹{row.item_price}</td>
                    <td>
                      <button className="table-action-btn" onClick={()=>displayViewModal(row)}>View</button>
                    </td>
                    <td>
                      <button className="table-action-btn" onClick={()=>navigateToEdit(row)}>Edit</button>
                    </td>
                    <td>
                      <button className="table-action-btn" onClick={()=>displayDeleteModal(row)}>Delete</button>
                    </td>
                  </tr>
               ))}
              </>
            )
          }
        </tbody>
      </table>
      {foodItems ? 
      (<>
      {foodItems.length===0 && (
      <p className="no-items-present">Your Food Menu is empty!</p>
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
       <div className={showDeleteModal? "delete-modal":"hide-data"}>
          <h3>Delete Food Item?</h3>
          <p>Are you sure, you want to delete this Food Item?</p>
          <p id="delete-food">{`"${itemToDelete.item_name}"`}</p>
          <hr></hr>
          <div className="delete-modal-btns">
            <button className="cancel-btn" onClick={()=>setShowDeleteModal(false)}>Cancel</button>
            <button className="delete-confirm-btn" onClick={handleClickDeleteFoodItem}>Delete</button>
          </div>
          <p className={ deleteSucess=== "" ? "hide-data": "form-submit-success-msg"}>
              {deleteSucess}
          </p>
       </div>
       <div className={showViewModal? "view-modal-container":"hide-data"}>
        <div className="view-modal-header">
          <h3>Food Item Details</h3>
          <Close style={{marginBottom:"5px", fontSize:"20px", color:"#ff9100"}} className="close-icon"
          onClick={()=>setShowViewModal(false)}/>
        </div>
        <div className="view-modal-img-box">
        <img src={itemToView.item_picture_url} alt={itemToView.item_name} className="img-in-viewmodal"></img>
        </div>
        <div className="view-modal-content-box">
          <p><span>Item Name:</span> {itemToView.item_name}</p>
          <p><span>Item Quantity:</span> {itemToView.item_quantity}</p>
          <p><span>Item Price:</span>{itemToView.item_price}</p>
          <p><span>Item Description:</span> {itemToView.item_description}</p>
        </div>
       </div>
    </div>
  )
}
