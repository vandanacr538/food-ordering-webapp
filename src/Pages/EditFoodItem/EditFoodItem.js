import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import "../../CommonStyle/form.css";
import editpageimg from "../../Assets/editpageimg.png";
import { Edit } from '@mui/icons-material';
import axios from 'axios';

export default function EditFoodItem() {
  const foodItemData = useLocation();
  const [editFoodItem, setEditFoodItem] = useState(foodItemData.state);
  const [editItemError, setEditItemError] = useState("");
  const [editItemSuccess, setEditItemSuccess] =useState("");
  const [hideItemImgInput, setHideItemImgInput] = useState(true);
  const [previewItemImg, setPreviewItemImg] = useState(false);
  const navigate = useNavigate();
  const [editItemFieldsError, setEditItemFieldsError] = useState({
    editItem_nameError:"",
    editItem_quantityError:"",
    editItem_priceError:"",
    editItem_descError:"",
    editItem_pictureError:""
  });
  const editItemValidObj = {
    isItemNameValid: false,
    isItemQuantityValid: false,
    isItemPriceValid: false,
    isItemDescValid: false,
    isItemPictureValid: false,
  };

  useEffect(()=>{
    if(localStorage.getItem("r-token") && !editFoodItem){
      navigate("/restaurant/foodmenu");
    }
  },[])
  const handleChangeEditItemName = (e)=>{
    setEditFoodItem((previousValue)=>({...previousValue, [e.target.name]:e.target.value}));
    if(e.target.value===""){
      setEditItemFieldsError((previousError)=>({...previousError, editItem_nameError:"Enter the item name"}));
    }
    else{
      setEditItemFieldsError((previousError)=>({...previousError, editItem_nameError:""}));
    }
  }
  const handleChangeEditItemQuantity = (e)=>{
    setEditFoodItem((previousValue)=>({...previousValue, [e.target.name]:e.target.value}));
    if(e.target.value===""){
      setEditItemFieldsError((previousError)=>({...previousError, editItem_quantityError:"Enter the item quantity"}));
    }
    else{
      setEditItemFieldsError((previousError)=>({...previousError, editItem_quantityError:""}));
    }
  }
  const handleChangeEditItemPrice = (e)=>{
    setEditFoodItem((previousValue)=>({...previousValue, [e.target.name]:e.target.value}));
    if(e.target.value===""){
      setEditItemFieldsError((previousError)=>({...previousError, editItem_priceError:"Enter the item price"}));
    }
    else{
      setEditItemFieldsError((previousError)=>({...previousError, editItem_priceError:""}));
    }
  }
  const handleChangeEditItemDesc = (e)=>{
    setEditFoodItem((previousValue)=>({...previousValue, [e.target.name]:e.target.value}));
    if(e.target.value===""){
      setEditItemFieldsError((previousError)=>({...previousError, editItem_descError:"Enter the item description"}));
    }
    else{
      setEditItemFieldsError((previousError)=>({...previousError, editItem_descError:""}));
    }
  }
  const handleChangeEditItemPicture = (e)=>{
    setEditFoodItem((previousValue)=>({...previousValue, [e.target.name]:e.target.files[0]}));
    if(e.target.files[0]==="" || e.target.files[0]===undefined){
      setEditItemFieldsError((previousError)=>({...previousError, editItem_pictureError:"Upload an image for the item"}));
      setPreviewItemImg(false);
    }
    else{
      setEditItemFieldsError((previousError)=>({...previousError, editItem_pictureError:""}));
      setPreviewItemImg(true);
    }
  }
  const validateEditItemName=()=>{
    if(editFoodItem.item_name===""){
      setEditItemFieldsError((previousError)=>({...previousError, editItem_nameError:"Enter the item name"}));
      editItemValidObj["isItemNameValid"] = false;
    }
    else{
      setEditItemFieldsError((previousError)=>({...previousError, editItem_nameError:""}));
      editItemValidObj["isItemNameValid"] = true;
    }
  }
  const validateEditItemQuantity=()=>{
    if(editFoodItem.item_quantity===""){
      setEditItemFieldsError((previousError)=>({...previousError, editItem_quantityError:"Enter the item quantity"}));
      editItemValidObj["isItemQuantityValid"] = false;
    }
    else{
      setEditItemFieldsError((previousError)=>({...previousError, editItem_quantityError:""}));
      editItemValidObj["isItemQuantityValid"] = true;
    }
  }
  const validateEditItemPrice=()=>{
    if(editFoodItem.item_price===""){
      setEditItemFieldsError((previousError)=>({...previousError, editItem_priceError:"Enter the item price"}));
      editItemValidObj["isItemPriceValid"] = false;
    }
    else{
      setEditItemFieldsError((previousError)=>({...previousError, editItem_priceError:""}));
      editItemValidObj["isItemPriceValid"] = true;
    }
  }
  const validateEditItemDesc=()=>{
    if(editFoodItem.item_description===""){
      setEditItemFieldsError((previousError)=>({...previousError, editItem_descError:"Enter the item description"}));
      editItemValidObj["isItemDescValid"] = false;
    }
    else{
      setEditItemFieldsError((previousError)=>({...previousError, editItem_descError:""}));
      editItemValidObj["isItemDescValid"] = true;
    }
  }
  const validateEditItemPicture=()=>{
    if(editFoodItem.item_picture_url==="" || editFoodItem.item_picture_url===undefined){
      setEditItemFieldsError((previousError)=>({...previousError, editItem_pictureError:"Upload an image for the item"}));
      editItemValidObj["isItemPictureValid"] = false;
    }
    else{
      setEditItemFieldsError((previousError)=>({...previousError, editItem_pictureError:""}));
      editItemValidObj["isItemPictureValid"] = true;
    }
  }
  const handleClickEditFoodItem=async()=>{
   setEditItemError("");
   validateEditItemName();
   validateEditItemQuantity();
   validateEditItemPrice();
   validateEditItemDesc();
   validateEditItemPicture();
   console.log(editFoodItem);
   console.log(editItemValidObj);
   if(Object.values(editItemValidObj).every(Boolean)){
    const formData = new FormData();
    for(let key in editFoodItem){
      formData.append(key, editFoodItem[key]);
      console.log(editFoodItem[key]);
    }
    const config = {
      headers:{
          "Content-Type":"multipart/form-data",
          Authorization:localStorage.getItem("r-token")
      }
    }
    try{
      const response = await axios.put(
        "https://food-ordering-webapp-backend.onrender.com/restaurant_food/update_food_item",
        formData,
        config,
      );
      if(response.status===200){
        if(response.data.token==="food-item-already-exits"){
          setEditItemError(response.data.msg);
        }
        else{
          setEditItemSuccess(response.data.msg);
          setTimeout(()=>{
            navigate("/restaurant/home");
          },3000)
        }
      }
    }
    catch(e){
      setEditItemError(e.response.data.msg);
    }
   }
  }

  return (
    <div className='form-maincontainer'>
      <h2>Edit Food Item</h2>
      <div className='form-container'>
        {editFoodItem && (
          <div className='form-box'>
          <div className="form-fields">
            <label htmlFor="item-name">Item Name</label>
            <input type='text'id="item-name" name="item_name" 
            className="form-input"
            value={editFoodItem.item_name || ""}
            onChange={handleChangeEditItemName}> 
            </input>
            <p className={ editItemFieldsError.editItem_nameError === "" ? "hide-data" : "display-input-data-error"}>
              {editItemFieldsError.editItem_nameError}
            </p>
          </div>
          <div className="form-fields">
            <label htmlFor="item-quantity">Item Quantity</label>
            <input type='text' id="item-quantity" name="item_quantity" 
            className="form-input" 
            value={editFoodItem.item_quantity || ""}
            onChange={handleChangeEditItemQuantity}>
            </input>
            <p className={ editItemFieldsError.editItem_quantityError === "" ? "hide-data" : "display-input-data-error"}>
              {editItemFieldsError.editItem_quantityError}
            </p>
          </div>
          <div className="form-fields">
            <label htmlFor="item-price">Item Price</label>
            <input type='text' id="item-price" name="item_price" 
            className="form-input" 
            value={editFoodItem.item_price || ""}
            onChange={handleChangeEditItemPrice}>
            </input>
            <p className={ editItemFieldsError.editItem_priceError === "" ? "hide-data" : "display-input-data-error"}>
              {editItemFieldsError.editItem_priceError}
            </p>
          </div>
          <div className="form-fields">
            <label htmlFor="item-description">Item Description</label>
            <input type='text' id="item-description" name="item_description"
            className="form-input" 
            value={editFoodItem.item_description || ""}
            onChange={handleChangeEditItemDesc}>
            </input>
            <p className={ editItemFieldsError.editItem_descError === "" ? "hide-data" : "display-input-data-error"}>
              {editItemFieldsError.editItem_descError}
            </p>
          </div>
          <div className="form-fields">
            <label htmlFor="item_picture_url">Item Picture</label>
            <div className='edit-itempic-div'>
              <img 
                src={previewItemImg?URL.createObjectURL(editFoodItem.item_picture_url):editFoodItem.item_picture_url} 
                alt={editFoodItem.item_name} className='preview-img-box'>
              </img>
              <Edit sx={{color:"#ff9100", width:"20px", height:"20px"}} className='edit-icon' 
              onClick={()=>setHideItemImgInput(!hideItemImgInput)}/>
            </div>
            <input type='file' id="item_picture_url" name="item_picture_url" accept="image/*"
            className={hideItemImgInput?"hide-data":"form-input item-picture-img-input"}
            onChange={handleChangeEditItemPicture}>
            </input>
            <p className={ editItemFieldsError.editItem_pictureError === "" ? "hide-data" : "display-input-data-error"}>
              {editItemFieldsError.editItem_pictureError}
            </p>
            <p className={ editItemError=== "" ? "hide-data": "form-submit-fail-error"}>
              {editItemError}
            </p>
          </div>
          <button className='form-submit-btn' onClick={handleClickEditFoodItem}>Update Item</button>
          <p className={ editItemSuccess=== "" ? "hide-data": "form-submit-success-msg"}>
              {editItemSuccess}
          </p>
        </div>
        )}
        <div className='form-page-image-container'>
          <div className='form-page-images-box'>
            <img src={editpageimg} alt="edit-food-img1" className='single-image-in-form'></img>
          </div>
        </div>
      </div>
    </div>
  )
}
