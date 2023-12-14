import React, { useState } from "react";
import "../../CommonStyle/loginandsignup.css";
import restaurant from "../../Assets/restaurant.webp";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function RestaurantLogin() {
  const navigate = useNavigate();
  const [restaurantLoginData, setRestaurantLoginData] = useState({
    restaurant_email: "",
    restaurant_password: "",
  });
  const [restLoginFieldsError, setRestLoginFieldsError] = useState({
    restaurant_emailError:"",
    restaurant_passwordError:""
  });
  const [restLoginAuthError, setRestLoginAuthError] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const restLoginValidDataObj = {
    isRestEmailValid: false,
    isRestPasswordValid: false,
  };

  const handleClickShowPassword=()=>{
    setHidePassword(!hidePassword);
  }
  const handleChangeRestEmail = (e)=>{
    setRestaurantLoginData((previousValue)=>({...previousValue, [e.target.name]:e.target.value}));
    if(e.target.value===""){
      setRestLoginFieldsError((previousError)=>({...previousError, restaurant_emailError:"Enter the restaurant email"}));
    }
    else{
      setRestLoginFieldsError((previousError)=>({...previousError, restaurant_emailError:""}));
    }
  }
  const handleChangeRestPassword = (e)=>{
    setRestaurantLoginData((previousValue)=>({...previousValue, [e.target.name]:e.target.value}));
    if(e.target.value===""){
      setRestLoginFieldsError((previousError)=>({...previousError, restaurant_passwordError:"Enter the restaurant password"}));
    }
    else{
      setRestLoginFieldsError((previousError)=>({...previousError, restaurant_passwordError:""}));
    }
  }
  const validateRestEmail = () => {
    const emailRegx =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (restaurantLoginData.restaurant_email === "") {
      setRestLoginFieldsError((previousError) => ({
        ...previousError,
        restaurant_emailError: "Enter the restaurant email",
      }));
      restLoginValidDataObj["isRestEmailValid"] = false;
    } else if (emailRegx.test(restaurantLoginData.restaurant_email) === false) {
      setRestLoginFieldsError((previousError) => ({
        ...previousError,
        restaurant_emailError: "Invalid email address!, please check",
      }));
      restLoginValidDataObj["isRestEmailValid"] = false;
    } else {
      setRestLoginFieldsError((previousError) => ({
        ...previousError,
        restaurant_emailError: "",
      }));
      restLoginValidDataObj["isRestEmailValid"] = true;
    }
  };
  const validateRestPassword = () => {
    if (restaurantLoginData.restaurant_password === "") {
      setRestLoginFieldsError((previousError) => ({
        ...previousError,
        restaurant_passwordError: "Enter the restaurant password",
      }));
      restLoginValidDataObj["isRestPasswordValid"] = false;
    } else {
      setRestLoginFieldsError((previousError) => ({
        ...previousError,
        restaurant_passwordError: "",
      }));
      restLoginValidDataObj["isRestPasswordValid"] = true;
    }
  };
  const handleClickRestLogin = async () => {
    setRestLoginAuthError("");
    validateRestEmail();
    validateRestPassword();
    console.log(restLoginValidDataObj);
    if (Object.values(restLoginValidDataObj).every(Boolean)) {
      try {
        const result = await axios.post(
          "https://food-ordering-webapp-backend.onrender.com/restaurant/login",
          restaurantLoginData
        );
        if (result.status === 200) {
          localStorage.setItem("r-token", result.data.token);
          navigate("/restaurant/home");
        }
      } catch (e) {
        if (e.response.status === 401) {
          setRestLoginAuthError(e.response.data.msg);
        } else if (e.response.status === 403) {
          setRestLoginAuthError(e.response.data.msg);
        } else {
          setRestLoginAuthError(e.response.data.msg);
        }
      }
    }
  };
  const gotoRestaurantSignUpPage = () => {
    navigate("/restaurant/signup");
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
        <div className="login-signup-form-box restaurant-login-signup-form-box">
          <h1>Restaurant Login</h1>
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
                restLoginFieldsError.restaurant_emailError === ""
                  ? "hide-data"
                  : "display-input-data-error"
              }
            >
              {restLoginFieldsError.restaurant_emailError}
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
                restLoginFieldsError.restaurant_passwordError === ""
                  ? "hide-data"
                  : "display-input-data-error"
              }
            >
              {restLoginFieldsError.restaurant_passwordError}
            </p>
            <p
              className={
                restLoginAuthError === ""
                  ? "hide-data"
                  : "display-login-signup-auth-error"
              }
            >
              {restLoginAuthError}
            </p>
          </div>
          <div className="login-signup-form-complete-btn-box">
            <button
              className="login-signup-form-complete-btn restaurant-login-signup-btn"
              onClick={handleClickRestLogin}
            >
              Sign in
            </button>
          </div>
          <div className="login-signup-link-box">
            <p>
              Don't have an account?
              <span
                className="login-sign-up-link"
                onClick={gotoRestaurantSignUpPage}
              >
                Sign Up
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
