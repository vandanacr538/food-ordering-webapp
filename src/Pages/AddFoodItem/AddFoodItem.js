import axios from 'axios';
import React, { useState } from 'react'
import "../../CommonStyle/form.css";
import addfood1 from "../../Assets/addfood1.PNG";
import addfood2 from "../../Assets/addfood2.PNG";
import addfood3 from "../../Assets/addfood3.PNG";
import addfood4 from "../../Assets/addfood4.PNG";
import { useNavigate } from 'react-router-dom';

export default function AddFoodItem() {
    const navigate = useNavigate();
    const [newFoodItem, setNewFoodItem] = useState({
      item_name: "",
      item_quantity: "",
      item_price: "",
      item_description: "",
      item_picture_url: "",
    }); 
    const [addItemError, setAddItemError] = useState("");
    const [addSuccess, setAddSuccess] =useState("");
    const [addItemFieldsError, setAddItemFieldsError] = useState({
      addItem_nameError:"",
      addItem_quantityError:"",
      addItem_priceError:"",
      addItem_descError:"",
      addItem_pictureError:""
    });
    const addItemValidDataObj = {
      isItemNameValid: false,
      isItemQuantityValid: false,
      isItemPriceValid: false,
      isItemDescValid: false,
      isItemPictureValid: false,
    };

    const handleChangeNewItemName = (e)=>{
      setNewFoodItem((previousValue)=>({...previousValue, [e.target.name]:e.target.value}));
      if(e.target.value===""){
        setAddItemFieldsError((previousError)=>({...previousError, addItem_nameError:"Enter the item name"}));
      }
      else{
        setAddItemFieldsError((previousError)=>({...previousError, addItem_nameError:""}));
      }
    }
    const handleChangeNewItemQuantity = (e)=>{
      setNewFoodItem((previousValue)=>({...previousValue, [e.target.name]:e.target.value}));
      if(e.target.value===""){
        setAddItemFieldsError((previousError)=>({...previousError, addItem_quantityError:"Enter the item quantity"}));
      }
      else{
        setAddItemFieldsError((previousError)=>({...previousError, addItem_quantityError:""}));
      }
    }
    const handleChangeNewItemPrice = (e)=>{
      setNewFoodItem((previousValue)=>({...previousValue, [e.target.name]:e.target.value}));
      if(e.target.value===""){
        setAddItemFieldsError((previousError)=>({...previousError, addItem_priceError:"Enter the item price"}));
      }
      else{
        setAddItemFieldsError((previousError)=>({...previousError, addItem_priceError:""}));
      }
    }
    const handleChangeNewItemDesc = (e)=>{
      setNewFoodItem((previousValue)=>({...previousValue, [e.target.name]:e.target.value}));
      if(e.target.value===""){
        setAddItemFieldsError((previousError)=>({...previousError, addItem_descError:"Enter the item description"}));
      }
      else{
        setAddItemFieldsError((previousError)=>({...previousError, addItem_descError:""}));
      }
    }
    const handleChangeNewItemPicture = (e)=>{
      setNewFoodItem((previousValue)=>({...previousValue, [e.target.name]:e.target.files[0]}));
      if(e.target.files[0]==="" || e.target.files[0]===undefined){
        setAddItemFieldsError((previousError)=>({...previousError, addItem_pictureError:"Upload an image for the item"}));
      }
      else{
        setAddItemFieldsError((previousError)=>({...previousError, addItem_pictureError:""}));
      }
    }
    const validateItemName=()=>{
      if(newFoodItem.item_name===""){
        setAddItemFieldsError((previousError)=>({...previousError, addItem_nameError:"Enter the item name"}));
        addItemValidDataObj["isItemNameValid"] = false;
      }
      else{
        setAddItemFieldsError((previousError)=>({...previousError, addItem_nameError:""}));
        addItemValidDataObj["isItemNameValid"] = true;
      }
    }
    const validateItemQuantity=()=>{
      if(newFoodItem.item_quantity===""){
        setAddItemFieldsError((previousError)=>({...previousError, addItem_quantityError:"Enter the item quantity"}));
        addItemValidDataObj["isItemQuantityValid"] = false;
      }
      else{
        setAddItemFieldsError((previousError)=>({...previousError, addItem_quantityError:""}));
        addItemValidDataObj["isItemQuantityValid"] = true;
      }
    }
    const validateItemPrice=()=>{
      if(newFoodItem.item_price===""){
        setAddItemFieldsError((previousError)=>({...previousError, addItem_priceError:"Enter the item price"}));
        addItemValidDataObj["isItemPriceValid"] = false;
      }
      else{
        setAddItemFieldsError((previousError)=>({...previousError, addItem_priceError:""}));
        addItemValidDataObj["isItemPriceValid"] = true;
      }
    }
    const validateItemDesc=()=>{
      if(newFoodItem.item_description===""){
        setAddItemFieldsError((previousError)=>({...previousError, addItem_descError:"Enter the item description"}));
        addItemValidDataObj["isItemDescValid"] = false;
      }
      else{
        setAddItemFieldsError((previousError)=>({...previousError, addItem_descError:""}));
        addItemValidDataObj["isItemDescValid"] = true;
      }
    }
    const validateItemPicture=()=>{
      if(newFoodItem.item_picture_url==="" || newFoodItem.item_picture_url===undefined){
        setAddItemFieldsError((previousError)=>({...previousError, addItem_pictureError:"Upload an image for the item"}));
        addItemValidDataObj["isItemPictureValid"] = false;
      }
      else{
        setAddItemFieldsError((previousError)=>({...previousError, addItem_pictureError:""}));
        addItemValidDataObj["isItemPictureValid"] = true;
      }
    }
    const handleClickAddFood=async()=>{
     setAddItemError("");
     validateItemName();
     validateItemQuantity();
     validateItemPrice();
     validateItemDesc();
     validateItemPicture();
     console.log(newFoodItem);
     if(Object.values(addItemValidDataObj).every(Boolean)){
       const formData = new FormData();
      for(let key in newFoodItem){
        formData.append(key, newFoodItem[key]);
      }
      const config = {
        headers:{
            "Content-Type":"multipart/form-data",
            Authorization:localStorage.getItem("r-token")
        }
      }
      try{
        const response = await axios.post(
          "http://localhost:8080/restaurant_food/add_food_item",
          formData,
          config,
        );
        if(response.status===200){
        if(response.data.token==="food-item-already-exits"){
          setAddItemError(response.data.msg);
        }
        else{
          setAddSuccess(response.data.msg);
          setTimeout(()=>{
            navigate("/restaurant/home");
          },3000)
        }
        }
      }
      catch(e){
        setAddItemError(e.response.data.msg);
      }
     }
    }
   return (
     <div className='form-maincontainer'>
      <h2>Add New Food Item</h2>
      <div className='form-container'>
        <div className='form-box'>
          <div className="form-fields">
            <label htmlFor="item-name">Item Name</label>
            <input type='text'id="item-name" name="item_name" 
            className="form-input"
            onChange={handleChangeNewItemName}> 
            </input>
            <p className={ addItemFieldsError.addItem_nameError === "" ? "hide-data" : "display-input-data-error"}>
              {addItemFieldsError.addItem_nameError}
            </p>
          </div>
          <div className="form-fields">
            <label htmlFor="item-quantity">Item Quantity</label>
            <input type='text' id="item-quantity" name="item_quantity" 
            className="form-input" 
            onChange={handleChangeNewItemQuantity}>
            </input>
            <p className={ addItemFieldsError.addItem_quantityError === "" ? "hide-data" : "display-input-data-error"}>
              {addItemFieldsError.addItem_quantityError}
            </p>
          </div>
          <div className="form-fields">
            <label htmlFor="item-price">Item Price</label>
            <input type='text' id="item-price" name="item_price" 
            className="form-input" 
            onChange={handleChangeNewItemPrice}>
            </input>
            <p className={ addItemFieldsError.addItem_priceError === "" ? "hide-data" : "display-input-data-error"}>
              {addItemFieldsError.addItem_priceError}
            </p>
          </div>
          <div className="form-fields">
            <label htmlFor="item-description">Item Description</label>
            <input type='text' id="item-description" name="item_description"
            className="form-input" 
            onChange={handleChangeNewItemDesc}>
            </input>
            <p className={ addItemFieldsError.addItem_descError === "" ? "hide-data" : "display-input-data-error"}>
              {addItemFieldsError.addItem_descError}
            </p>
          </div>
          <div className="form-fields">
            <label htmlFor="item_picture_url">Item Picture</label>
            <input type='file' id="item_picture_url" name="item_picture_url"
            className="form-input item-picture-img-input" 
            onChange={handleChangeNewItemPicture}>
            </input>
            <p className={ addItemFieldsError.addItem_pictureError === "" ? "hide-data" : "display-input-data-error"}>
              {addItemFieldsError.addItem_pictureError}
            </p>
            <p className={ addItemError=== "" ? "hide-data": "display-add-edit-error"}>
              {addItemError}
            </p>
          </div>
          <button className='form-submit-btn' onClick={handleClickAddFood}>Add Item</button>
          <p className={ addSuccess=== "" ? "hide-data": "display-add-edit-success"}>
              {addSuccess}
          </p>
        </div>
        <div className='form-page-image-container'>
          <h3>Add a New, Delicious, tasty food to your Restaurant Menu</h3>
          <div className='form-page-images-box'>
            <div className='add-edit-image-card'>
              <img src={addfood1} alt="addfood1" className='add-edit-page-img'></img>
            </div>
            <div className='add-edit-image-card'>
            <img src={addfood2} alt="addfood2" className='add-edit-page-img'></img>
            </div>
            <div className='add-edit-image-card'>
              <img src={addfood3} alt="addfood3" className='add-edit-page-img'></img>
            </div>
            <div className='add-edit-image-card'>
              <img src={addfood4} alt="addfood4" className='add-edit-page-img'></img>
            </div>
          </div>
        </div>
      </div>
     </div>
   )
}
