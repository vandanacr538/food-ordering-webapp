import React, { useState } from "react";
import "../../CommonStyle/loginandsignup.css";
import restaurant from "../../Assets/restaurant.webp";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function RestaurantLogin() {
  const navigate = useNavigate();
  const [restaurantLoginData, setRestaurantLoginData] = useState({
    restaurant_email: "",
    restaurant_password: "",
  });
  const [restLoginFieldsError, setRestLoginFieldsError] = useState({});
  const [restLoginAuthError, setRestLoginAuthError] = useState("");
  const restLoginValidDataObj = {
    isRestEmailValid: false,
    isRestPasswordValid: false,
  };

  const handleChangeRestLoginData = (e) => {
    setRestaurantLoginData((previousValue) => ({
      ...previousValue,
      [e.target.name]: e.target.value,
    }));
  };
  const validateRestEmail = () => {
    const emailRegx =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (restaurantLoginData.restaurant_email === "") {
      setRestLoginFieldsError((previousError) => ({
        ...previousError,
        restaurant_emailError: "Enter restaurant email",
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
        restaurant_passwordError: "Enter restaurant password",
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
          "http://localhost:8080/restaurant/login",
          restaurantLoginData
        );
        if (result.status === 200) {
          console.log(result.data);
          console.log("navigate to restaurant home page");
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
              onChange={handleChangeRestLoginData}
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
            <input
              type="password"
              id="restaurant-password"
              className="login-signup-form-input"
              name="restaurant_password"
              onChange={handleChangeRestLoginData}
            ></input>
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
