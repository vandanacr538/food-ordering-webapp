import React, { useState } from "react";
import "../../CommonStyle/loginandsignup.css";
import restaurant from "../../Assets/restaurant.webp";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function RestaurantSignUp() {
  const navigate = useNavigate();
  const [restSignUpData, setRestSignUpData] = useState({
    restaurant_name: "",
    restaurant_email: "",
    restaurant_address: "",
    restaurant_openingtime: "",
    restaurant_closingtime: "",
    restaurant_password: "",
  });
  const [restaurantPasswordRule, setRestaurantPasswordRule] = useState(false);
  const [restSignUpFieldsError, setRestSignUpFieldsError] = useState({
    restaurant_nameError:"",
    restaurant_emailError:"",
    restaurant_addressError:"",
    restaurant_openingTimeError:"",
    restaurant_closingTimeError:"",
    restaurant_passwordError:""
  });
  const [restSignUpAuthError, setRestSignUpAuthError] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const restSignUpValidDataObj = {
    isRestNameValid: false,
    isRestEmailValid: false,
    isRestAddressValid: false,
    isRestOpeningTimeValid: false,
    isRestClosingTimeValid: false,
    isRestPasswordValid: false,
  };

  const handleClickShowPassword=()=>{
    setHidePassword(!hidePassword);
  }
  const handleChangeRestName=(e)=>{
    setRestSignUpData((previousValue)=>({...previousValue, [e.target.name]:e.target.value.trim()}));
    if(e.target.value.trim()===""){
      setRestSignUpFieldsError((previousError)=>({...previousError, restaurant_nameError:"Enter restaurant name"}));
    }
    else{
      setRestSignUpFieldsError((previousError)=>({...previousError, restaurant_nameError:""}));
    }
  }
  const handleChangeRestEmail=(e)=>{
    setRestSignUpData((previousValue)=>({...previousValue, [e.target.name]:e.target.value.trim()}));
    if(e.target.value.trim()===""){
      setRestSignUpFieldsError((previousError)=>({...previousError, restaurant_emailError:"Enter restaurant email"}));
    }
    else{
      setRestSignUpFieldsError((previousError)=>({...previousError, restaurant_emailError:""}));
    }
  }
  const handleChangeRestAddress=(e)=>{
    setRestSignUpData((previousValue)=>({...previousValue, [e.target.name]:e.target.value.trim()}));
    if(e.target.value.trim()===""){
      setRestSignUpFieldsError((previousError)=>({...previousError, restaurant_addressError:"Enter restaurant address"}));
    }
    else{
      setRestSignUpFieldsError((previousError)=>({...previousError, restaurant_addressError:""}));
    }
  }
  const handleChangeRestOpeningTime=(e)=>{
    setRestSignUpData((previousValue)=>({...previousValue, [e.target.name]:e.target.value.trim()}));
    if(e.target.value.trim()===""){
      setRestSignUpFieldsError((previousError)=>({...previousError, restaurant_openingTimeError:"Enter restaurant opening time"}));
    }
    else{
      setRestSignUpFieldsError((previousError)=>({...previousError, restaurant_openingTimeError:""}));
    }
  }
  const handleChangeRestClosingTime=(e)=>{
    setRestSignUpData((previousValue)=>({...previousValue, [e.target.name]:e.target.value.trim()}));
    if(e.target.value.trim()===""){
      setRestSignUpFieldsError((previousError)=>({...previousError, restaurant_closingTimeError:"Enter restaurant closing time"}));
    }
    else{
      setRestSignUpFieldsError((previousError)=>({...previousError, restaurant_closingTimeError:""}));
    }
  }
  const handleChangeRestPassword=(e)=>{
    setRestSignUpData((previousValue)=>({...previousValue, [e.target.name]:e.target.value.trim()}));
    if(e.target.value.trim()===""){
      setRestSignUpFieldsError((previousError)=>({...previousError, restaurant_passwordError:"Enter restaurant password"}));
      setRestaurantPasswordRule(false);
    }
    else{
      setRestSignUpFieldsError((previousError)=>({...previousError, restaurant_passwordError:""}));
      setRestaurantPasswordRule(true);
    }
  }

  const validateRestName = () => {
    if (restSignUpData.restaurant_name === "") {
      setRestSignUpFieldsError((previousError) => ({
        ...previousError,
        restaurant_nameError: "Enter restaurant name",
      }));
      restSignUpValidDataObj["isRestNameValid"] = false;
    } else {
      setRestSignUpFieldsError((previousError) => ({
        ...previousError,
        restaurant_nameError: "",
      }));
      restSignUpValidDataObj["isRestNameValid"] = true;
    }
  };
  const validateRestEmail = () => {
    const emailRegx =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (restSignUpData.restaurant_email === "") {
      setRestSignUpFieldsError((previousError) => ({
        ...previousError,
        restaurant_emailError: "Enter restaurant email",
      }));
      restSignUpValidDataObj["isRestEmailValid"] = false;
    } else if (emailRegx.test(restSignUpData.restaurant_email) === false) {
      setRestSignUpFieldsError((previousError) => ({
        ...previousError,
        restaurant_emailError: "Invalid email address!, please check",
      }));
      restSignUpValidDataObj["isRestEmailValid"] = false;
    } else {
      setRestSignUpFieldsError((previousError) => ({
        ...previousError,
        restaurant_emailError: "",
      }));
      restSignUpValidDataObj["isRestEmailValid"] = true;
    }
  };
  const validateRestAddress = () => {
    if (restSignUpData.restaurant_address === "") {
      setRestSignUpFieldsError((previousError) => ({
        ...previousError,
        restaurant_addressError: "Enter restaurant address",
      }));
      restSignUpValidDataObj["isRestAddressValid"] = false;
    } else {
      setRestSignUpFieldsError((previousError) => ({
        ...previousError,
        restaurant_addressError: "",
      }));
      restSignUpValidDataObj["isRestAddressValid"] = true;
    }
  };
  const validateRestOpeningTime = () => {
    if (restSignUpData.restaurant_openingtime === "") {
      setRestSignUpFieldsError((previousError) => ({
        ...previousError,
        restaurant_openingTimeError: "Enter restaurant opening time",
      }));
      restSignUpValidDataObj["isRestOpeningTimeValid"] = false;
    } else {
      setRestSignUpFieldsError((previousError) => ({
        ...previousError,
        restaurant_openingTimeError: "",
      }));
      restSignUpValidDataObj["isRestOpeningTimeValid"] = true;
    }
  };
  const validateRestClosingTime = () => {
    if (restSignUpData.restaurant_closingtime === "") {
      setRestSignUpFieldsError((previousError) => ({
        ...previousError,
        restaurant_closingTimeError: "Enter restaurant closing time",
      }));
      restSignUpValidDataObj["isRestClosingTimeValid"] = false;
    } else {
      setRestSignUpFieldsError((previousError) => ({
        ...previousError,
        restaurant_closingTimeError: "",
      }));
      restSignUpValidDataObj["isRestClosingTimeValid"] = true;
    }
  };
  const validateRestPassword = () => {
    setRestaurantPasswordRule(false);
    if (restSignUpData.restaurant_password === "") {
      setRestSignUpFieldsError((previousError) => ({
        ...previousError,
        restaurant_passwordError: "Enter restaurant password",
      }));
      restSignUpValidDataObj["isRestPasswordValid"] = false;
    } else {
      const passwordValidation =
        /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-])/;
      if (restSignUpData.restaurant_password.length < 8) {
        setRestSignUpFieldsError((previousError) => ({
          ...previousError,
          restaurant_passwordError: "Password must have 8 characters",
        }));
        restSignUpValidDataObj["isRestPasswordValid"] = false;
      } else if (
        passwordValidation.test(restSignUpData.restaurant_password) === false
      ) {
        setRestSignUpFieldsError((previousError) => ({
          ...previousError,
          restaurant_passwordError: "Password is not valid",
        }));
        restSignUpValidDataObj["isRestPasswordValid"] = false;
        setRestaurantPasswordRule(true);
      } else if (restSignUpData.restaurant_password.length > 16) {
        setRestSignUpFieldsError((previousError) => ({
          ...previousError,
          restaurant_passwordError: "Password can have maximum 16 characters",
        }));
        restSignUpValidDataObj["isRestPasswordValid"] = false;
      } else {
        setRestSignUpFieldsError((previousError) => ({
          ...previousError,
          restaurant_passwordError: "",
        }));
        restSignUpValidDataObj["isRestPasswordValid"] = true;
      }
    }
  };
  const handleClickRestSignUp = async () => {
    setRestSignUpAuthError("");
    validateRestName();
    validateRestEmail();
    validateRestAddress();
    validateRestOpeningTime();
    validateRestClosingTime();
    validateRestPassword();
    console.log(restSignUpValidDataObj);
    if (Object.values(restSignUpValidDataObj).every(Boolean)) {
      try {
        const result = await axios.post(
          "http://localhost:8080/restaurant/signup",
          restSignUpData
        );
        if (result.status === 200) {
          if (result.data.token === "restaurant-already-exists") {
            setRestSignUpAuthError(result.data.msg);
          } else {
            console.log(result.data);
            console.log("navigate to restaurant home page");
          }
        }
      } catch (e) {
        setRestSignUpAuthError(e.response.data.msg);
      }
    }
  };
  const gotoRestaurantLoginPage = () => {
    navigate("/restaurant/login");
  };
  return (
    <div className="login-signup-main-container">
      <div className="login-signup-image-box">
        <img
          src={restaurant}
          alt="restaurantimage"
          className="login-signup-page-img"
        ></img>
      </div>
      <div className="login-signup-container">
        <div className="login-signup-form-box customer-login-signup-form-box">
          <h1>Restaurant Sign Up</h1>
          <div className="login-signup-form-fields">
            <label htmlFor="restaurant-name">Restaurant Name</label>
            <input
              type="text"
              id="restaurant-name"
              className="login-signup-form-input"
              name="restaurant_name"
              onChange={handleChangeRestName}
            ></input>
            <p
              className={
                restSignUpFieldsError.restaurant_nameError === ""
                  ? "hide-data"
                  : "display-input-data-error"
              }
            >
              {restSignUpFieldsError.restaurant_nameError}
            </p>
          </div>
          <div className="login-signup-form-fields">
            <label htmlFor="restaurant-email">Restaurant Email</label>
            <input
              type="email"
              id="restaurant-email"
              className="login-signup-form-input"
              name="restaurant_email"
              onChange={handleChangeRestEmail}
            ></input>
            <p
              className={
                restSignUpFieldsError.restaurant_emailError === ""
                  ? "hide-data"
                  : "display-input-data-error"
              }
            >
              {restSignUpFieldsError.restaurant_emailError}
            </p>
          </div>
          <div className="login-signup-form-fields">
            <label htmlFor="restaurant-address">Address of Restaurant</label>
            <textarea
              id="restaurant-address"
              className="login-signup-form-input address-input"
              name="restaurant_address"
              onChange={handleChangeRestAddress}
            ></textarea>
            <p
              className={
                restSignUpFieldsError.restaurant_addressError === ""
                  ? "hide-data"
                  : "display-input-data-error"
              }
            >
              {restSignUpFieldsError.restaurant_addressError}
            </p>
          </div>
          <div className="login-signup-form-fields">
            <label htmlFor="restaurant-opening-time">Opening Time</label>
            <input
              type="time"
              id="restaurant-opening-time"
              className="login-signup-form-input"
              name="restaurant_openingtime"
              onChange={handleChangeRestOpeningTime}
            ></input>
            <p
              className={
                restSignUpFieldsError.restaurant_openingTimeError === ""
                  ? "hide-data"
                  : "display-input-data-error"
              }
            >
              {restSignUpFieldsError.restaurant_openingTimeError}
            </p>
          </div>
          <div className="login-signup-form-fields">
            <label htmlFor="restaurant-closing-time">Closing Time</label>
            <input
              type="time"
              id="restaurant-closing-time"
              className="login-signup-form-input"
              name="restaurant_closingtime"
              onChange={handleChangeRestClosingTime}
            ></input>
            <p
              className={
                restSignUpFieldsError.restaurant_closingTimeError === ""
                  ? "hide-data"
                  : "display-input-data-error"
              }
            >
              {restSignUpFieldsError.restaurant_closingTimeError}
            </p>
          </div>
          <div className="login-signup-form-fields">
            <label htmlFor="restaurant-password">Password</label>
            <div className="login-signup-form-input password-input-div">
              <input
                type={hidePassword?"password":"text"}
                id="restaurant-password"
                className="password-input"
                name="restaurant_password"
                onChange={handleChangeRestPassword}
              ></input>
              <div className="show-hide-password-box" onClick={handleClickShowPassword}>
                {hidePassword ? (
                  <Visibility style={{ fontSize: "20px", color: "#5e5e5e" }} />
                ) : (
                  <VisibilityOff style={{ fontSize: "20px", color: "#5e5e5e" }} />
                )}
              </div>
            </div>
            <p
              className={
                restSignUpFieldsError.restaurant_passwordError === ""
                  ? "hide-data"
                  : "display-input-data-error"
              }
            >
              {restSignUpFieldsError.restaurant_passwordError}
            </p>
            <p
              className={restaurantPasswordRule ? "password-rule" : "hide-data"}
            >
              Password must have 8 characters including 1 Uppercase, 1
              lowercase, 1 number & 1 special character
            </p>
            <p
              className={
                restSignUpAuthError === ""
                  ? "hide-data"
                  : "display-login-signup-auth-error"
              }
            >
              {restSignUpAuthError}
            </p>
          </div>
          <div className="login-signup-form-complete-btn-box">
            <button
              className="login-signup-form-complete-btn customer-login-signup-btn"
              onClick={handleClickRestSignUp}
            >
              Sign Up
            </button>
          </div>
          <div className="login-signup-link-box">
            <p>
              Already have an account?
              <span
                className="login-sign-up-link"
                onClick={gotoRestaurantLoginPage}
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
