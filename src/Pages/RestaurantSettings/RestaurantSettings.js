import { Edit, Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { decodeToken } from 'react-jwt';
import "../../CommonStyle/form.css";
import settingsimg from "../../Assets/settingsimg.avif";

export default function RestaurantSettings() {
  const [restDetails, setRestDetails] =useState({});
  const [disabled, setDisabled] = useState(true); 
  const [editSuccess, setEditSuccess] =useState("");
  const [editRestSettingError, setEditRestSettingError] = useState("");
  const [restaurantPasswordRule, setRestaurantPasswordRule] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [editRestFieldsError, setEditRestFieldsError] = useState({
    edit_restNameError:"",
    edit_restAddressError:"",
    edit_restOpeningTimeError:"",
    edit_restClosingTimeError:"",
    edit_restPasswordError:""
  });
  const editRestSettingValidDataObj = {
    isEditRestNameValid: false,
    isEditRestAddressValid: false,
    isEditRestOpeningTimeValid: false,
    isEditRestClosingTimeValid: false,
    isEditRestPasswordValid: false,
  };
  
  const getRestDetails = async()=>{
    const result =await axios.get("http://localhost:8080/restaurant/get_restaurant_details",{
      headers:{
        Authorization:localStorage.getItem("r-token")
      }
    })
    setRestDetails(decodeToken(result.data.token));
  }
  useEffect(()=>{
    if(localStorage.getItem("r-token")){
      getRestDetails();
    }
  }, []);
  const handleClickEnableEdit=()=>{
    setDisabled(!disabled);
  }
  const handleClickShowPassword=()=>{
    setHidePassword(!hidePassword);
  }
  const handleChangeRestNameEdit = (e)=>{
    setRestDetails((previousValue)=>({...previousValue, [e.target.name]:e.target.value}));
    if(e.target.value===""){
      setEditRestFieldsError((previousError)=>({...previousError, edit_restNameError:"Enter the restaurant name"}));
    }
    else{
      setEditRestFieldsError((previousError)=>({...previousError, edit_restNameError:""}));
    }
  }
  const handleChangeRestAddressEdit = (e)=>{
    setRestDetails((previousValue)=>({...previousValue, [e.target.name]:e.target.value}));
    if(e.target.value===""){
      setEditRestFieldsError((previousError)=>({...previousError, edit_restAddressError:"Enter the restaurant address"}));
    }
    else{
      setEditRestFieldsError((previousError)=>({...previousError, edit_restAddressError:""}));
    }
  }
  const handleChangeRestOpeningTimeEdit = (e)=>{
    setRestDetails((previousValue)=>({...previousValue, [e.target.name]:e.target.value}));
    if(e.target.value===""){
      setEditRestFieldsError((previousError)=>({...previousError, edit_restOpeningTimeError:"Enter the restaurant opening time"}));
    }
    else{
      setEditRestFieldsError((previousError)=>({...previousError, edit_restOpeningTimeError:""}));
    }
  }
  const handleChangeRestClosingTimeEdit = (e)=>{
    setRestDetails((previousValue)=>({...previousValue, [e.target.name]:e.target.value}));
    if(e.target.value===""){
      setEditRestFieldsError((previousError)=>({...previousError, edit_restClosingTimeError:"Enter the restaurant closing time"}));
    }
    else{
      setEditRestFieldsError((previousError)=>({...previousError, edit_restClosingTimeError:""}));
    }
  }
  const handleChangeRestPasswordEdit=(e)=>{
    setRestDetails((previousValue)=>({...previousValue, [e.target.name]:e.target.value.trim()}));
    if(e.target.value.trim()===""){
      setEditRestFieldsError((previousError)=>({...previousError, edit_restPasswordError:"Enter the restaurant password"}));
      setRestaurantPasswordRule(false);
    }
    else{
      setEditRestFieldsError((previousError)=>({...previousError, edit_restPasswordError:""}));
      setRestaurantPasswordRule(true);
    }
  }
  const validateEditRestName = () => {
    if (restDetails.restaurant_name === "") {
      setEditRestFieldsError((previousError) => ({
        ...previousError,
        edit_restNameError: "Enter the restaurant name",
      }));
      editRestSettingValidDataObj["isEditRestNameValid"] = false;
    } else {
      setEditRestFieldsError((previousError) => ({
        ...previousError,
        edit_restNameError: "",
      }));
      editRestSettingValidDataObj["isEditRestNameValid"] = true;
    }
  };
  const validateEditRestAddress = () => {
    if (restDetails.restaurant_address === "") {
      setEditRestFieldsError((previousError) => ({
        ...previousError,
        edit_restAddressError: "Enter the restaurant address",
      }));
      editRestSettingValidDataObj["isEditRestAddressValid"] = false;
    } else {
      setEditRestFieldsError((previousError) => ({
        ...previousError,
        edit_restAddressError: "",
      }));
      editRestSettingValidDataObj["isEditRestAddressValid"] = true;
    }
  };
  const validateEditRestOpeningTime = () => {
    if (restDetails.restaurant_openingtime === "") {
      setEditRestFieldsError((previousError) => ({
        ...previousError,
        edit_restOpeningTimeError: "Enter the restaurant opening time",
      }));
      editRestSettingValidDataObj["isEditRestOpeningTimeValid"] = false;
    } else {
      setEditRestFieldsError((previousError) => ({
        ...previousError,
        edit_restOpeningTimeError: "",
      }));
      editRestSettingValidDataObj["isEditRestOpeningTimeValid"] = true;
    }
  };
  const validateRestClosingTime = () => {
    if (restDetails.restaurant_closingtime === "") {
      setEditRestFieldsError((previousError) => ({
        ...previousError,
        edit_restClosingTimeError: "Enter the restaurant closing time",
      }));
      editRestSettingValidDataObj["isEditRestClosingTimeValid"] = false;
    } else {
      setEditRestFieldsError((previousError) => ({
        ...previousError,
        edit_restClosingTimeError: "",
      }));
      editRestSettingValidDataObj["isEditRestClosingTimeValid"] = true;
    }
  };
  const validateEditRestPassword = () => {
    setRestaurantPasswordRule(false);
    if (restDetails.restaurant_password === "") {
      setEditRestFieldsError((previousError) => ({
        ...previousError,
        edit_restPasswordError: "Enter the restaurant password",
      }));
      editRestSettingValidDataObj["isEditRestPasswordValid"] = false;
    } else {
      const passwordValidation =
        /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-])/;
      if (restDetails.restaurant_password.length < 8) {
        setEditRestFieldsError((previousError) => ({
          ...previousError,
          edit_restPasswordError: "Password must have 8 characters",
        }));
        editRestSettingValidDataObj["isEditRestPasswordValid"] = false;
      } else if (
        passwordValidation.test(restDetails.restaurant_password) === false
      ) {
        setEditRestFieldsError((previousError) => ({
          ...previousError,
          edit_restPasswordError: "Password is not valid",
        }));
        editRestSettingValidDataObj["isEditRestPasswordValid"] = false;
        setRestaurantPasswordRule(true);
      } else if (restDetails.restaurant_password.length > 16) {
        setEditRestFieldsError((previousError) => ({
          ...previousError,
          edit_restPasswordError: "Password can have maximum 16 characters",
        }));
        editRestSettingValidDataObj["isEditRestPasswordValid"] = false;
      } else {
        setEditRestFieldsError((previousError) => ({
          ...previousError,
          edit_restPasswordError: "",
        }));
        editRestSettingValidDataObj["isEditRestPasswordValid"] = true;
      }
    }
  };
  const handleClickUpdateRestData=async()=>{
    setEditRestSettingError("");
    validateEditRestName();
    validateEditRestAddress();
    validateEditRestOpeningTime();
    validateRestClosingTime();
    validateEditRestPassword();
    if(Object.values(editRestSettingValidDataObj).every(Boolean)){
        console.log(restDetails);
        try {
            const result = await axios.put("http://localhost:8080/restaurant/edit_restaurant_details", restDetails, {
                headers:{
                  Authorization:localStorage.getItem("r-token")
                }
            });
            if(result.status===200){
                setEditSuccess(result.data.msg);
                localStorage.removeItem("r-token");
                localStorage.setItem("r-token", result.data.token);
                window.location.reload();
            }
        } 
        catch (e) {
            setEditRestSettingError(e.response.data.msg);
        }
    }
  }
  return (
    <div className='form-maincontainer'>
        <div className='settings-edit-box'>
        <h2>Restaurant Settings</h2>
        <div className='edit-icon-box'>
            <Edit sx={{ height: "100%", width: "100%", color: "#ff9100" }} 
            className='edit-icon'
            onClick={handleClickEnableEdit}/>
        </div>
      </div>
      <div className='form-container'>
        <div className='form-box'>
          <div className="form-fields">
            <label htmlFor="restaurant-name">Restaurant Name</label>
            <input type='text'id="restaurant-name" name="restaurant_name" 
            value={restDetails.restaurant_name || ''}
            className="form-input"
            disabled={disabled}
            onChange={handleChangeRestNameEdit}
            > 
            </input>
            <p className={ editRestFieldsError.edit_restNameError === "" ? "hide-data" : "display-input-data-error"}>
              {editRestFieldsError.edit_restNameError}
            </p>
          </div>
          <div className="form-fields">
            <label htmlFor="restaurant-email">Restaurant Email</label>
            <input type='text' id="restaurant-email" name="restaurant_email" 
            value={restDetails.restaurant_email || ''}
            className="form-input" 
            disabled
            >
            </input>
          </div>
          <div className="form-fields">
            <label htmlFor="restaurant-address">Restaurant Address</label>
            <input type='text' id="restaurant-address" name="restaurant_address" 
            value={restDetails.restaurant_address || ''}
            className="form-input" 
            disabled={disabled}
            onChange={handleChangeRestAddressEdit}
            >
            </input>
            <p className={ editRestFieldsError.edit_restAddressError === "" ? "hide-data" : "display-input-data-error"}>
              {editRestFieldsError.edit_restAddressError}
            </p>
          </div>
          <div className="form-fields">
            <label htmlFor="restaurant-openingtime">Restaurant Opening Time</label>
            <input type='time' id="restaurant-openingtime" name="restaurant_openingtime"
            value={restDetails.restaurant_openingtime || ''}
            className="form-input" 
            disabled={disabled}
            onChange={handleChangeRestOpeningTimeEdit}
            >
            </input>
            <p className={ editRestFieldsError.edit_restOpeningTimeError === "" ? "hide-data" : "display-input-data-error"}>
              {editRestFieldsError.edit_restOpeningTimeError}
            </p>
          </div>
          <div className="form-fields">
            <label htmlFor="restaurant-closingtime">Restaurant Closing Time</label>
            <input type='time' id="restaurant-closingtime" name="restaurant_closingtime"
            value={restDetails.restaurant_closingtime || ''}
            className="form-input" 
            disabled={disabled}
            onChange={handleChangeRestClosingTimeEdit}
            >
            </input>
            <p className={ editRestFieldsError.edit_restClosingTimeError === "" ? "hide-data" : "display-input-data-error"}>
              {editRestFieldsError.edit_restClosingTimeError}
            </p>
          </div>
          <div className="form-fields">
            <label htmlFor="restaurant-password">Restaurant Password</label>
            <div className="form-input password-input-div">
              <input
                type={hidePassword?"password":"text"}
                id="restaurant-password"
                className="password-input"
                name="restaurant_password"
                value={restDetails.restaurant_password || ''}
                disabled={disabled}
                onChange={handleChangeRestPasswordEdit }
              ></input>
              <div className="show-hide-password-box" onClick={handleClickShowPassword}>
                {hidePassword ? (
                  <Visibility style={{ fontSize: "20px", color: "#5e5e5e" }} />
                ) : (
                  <VisibilityOff style={{ fontSize: "20px", color: "#5e5e5e" }} />
                )}
              </div>
            </div>
            <p className={ editRestFieldsError.edit_restPasswordError === "" ? "hide-data" : "display-input-data-error"}>
              {editRestFieldsError.edit_restPasswordError}
            </p>
            <p
              className={restaurantPasswordRule ? "password-rule" : "hide-data"}
            >
              Password must have 8 characters including 1 Uppercase, 1
              lowercase, 1 number & 1 special character
            </p>
            <p className={ editRestSettingError=== "" ? "hide-data": "form-submit-fail-error"}>
              {editRestSettingError}
            </p>
          </div>
          <button className='form-submit-btn' onClick={handleClickUpdateRestData}>Update</button>
          <p className={ editSuccess=== "" ? "hide-data": "form-submit-success-msg"}>
              {editSuccess}
          </p>
        </div>
        <div className='form-page-image-container'>
          <div className='form-page-images-box setting-img-box'>
            <img src={settingsimg} alt="settingimg1" className='single-image-in-form'></img>
          </div>
        </div>
      </div>
    </div>
  )
}
