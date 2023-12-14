import React, { useState } from "react";
import "../../CommonStyle/loginandsignup.css";
import customerpage from "../../Assets/customerpage.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function CustomerLogin() {
  const navigate = useNavigate();
  const [customerLoginData, setCustomerLoginData] = useState({
    customer_email: "",
    customer_password: "",
  });
  const [customerLoginFieldsError, setCustomerLoginFieldsError] = useState({
    customer_emailError:"",
    customer_passwordError:""
  });
  const [customerLoginAuthError, setCustomerLoginAuthError] = useState("");
  const custLoginValidDataObj = { isEmailValid: false, isPasswordValid: false };
  const [hidePassword, setHidePassword] = useState(true);

  const handleClickShowPassword=()=>{
    setHidePassword(!hidePassword);
  }
  const handleChangeCustomerEmail = (e)=>{
    setCustomerLoginData((previousValue)=>({...previousValue, [e.target.name]:e.target.value}));
    if(e.target.value===""){
      setCustomerLoginFieldsError((previousError)=>({...previousError, customer_emailError:"Enter your email"}));
    }
    else{
      setCustomerLoginFieldsError((previousError)=>({...previousError, customer_emailError:""}));
    }
  }
  const handleChangeCustomerPassword = (e)=>{
    setCustomerLoginData((previousValue)=>({...previousValue, [e.target.name]:e.target.value}));
    if(e.target.value===""){
      setCustomerLoginFieldsError((previousError)=>({...previousError, customer_passwordError:"Enter your password"}));
    }
    else{
      setCustomerLoginFieldsError((previousError)=>({...previousError, customer_passwordError:""}));
    }
  }
  const validateCustomerEmail = () => {
    const emailRegx =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (customerLoginData.customer_email === "") {
      setCustomerLoginFieldsError((previousError) => ({
        ...previousError,
        customer_emailError: "Enter your email",
      }));
      custLoginValidDataObj.isEmailValid = false;
    } else if (emailRegx.test(customerLoginData.customer_email) === false) {
      setCustomerLoginFieldsError((previousError) => ({
        ...previousError,
        customer_emailError: "Invalid email address!, please check",
      }));
      custLoginValidDataObj.isEmailValid = false;
    } else {
      setCustomerLoginFieldsError((previousError) => ({
        ...previousError,
        customer_emailError: "",
      }));
      custLoginValidDataObj.isEmailValid = true;
    }
  };
  const validateCustomerPassword = () => {
    if (customerLoginData.customer_password === "") {
      setCustomerLoginFieldsError((previousError) => ({
        ...previousError,
        customer_passwordError: "Enter your password",
      }));
      custLoginValidDataObj.isPasswordValid = false;
    } else {
      setCustomerLoginFieldsError((previousError) => ({
        ...previousError,
        customer_passwordError: "",
      }));
      custLoginValidDataObj.isPasswordValid = true;
    }
  };

  const handleClickCustomerLogin = async () => {
    setCustomerLoginAuthError("");
    validateCustomerEmail();
    validateCustomerPassword();
    console.log(customerLoginData);
    if (
      custLoginValidDataObj.isEmailValid === true &&
      custLoginValidDataObj.isPasswordValid === true
    ) {
      try {
        const result = await axios.post(
          "https://food-ordering-webapp-backend.onrender.com/customer/login",
          customerLoginData
        );
        if(result.status===200){
          localStorage.setItem("c-token", result.data.token);
          navigate("/customer/home");
        }
      } catch (e) {
        if (e.response.status === 401) {
          setCustomerLoginAuthError(e.response.data.msg);
        } else if (e.response.status === 403) {
          setCustomerLoginAuthError(e.response.data.msg);
        } else {
          setCustomerLoginAuthError(e.response.data.msg);
        }
      }
    }
  };
  const gotoCustomerSignUpPage = () => {
    navigate("/customer/signup");
  };

  return (
    <div className="login-signup-main-container">
      <div className="login-signup-container">
        <div className="login-signup-form-box customer-login-signup-form-box">
          <h1>Customer Login</h1>
          <div className="login-signup-form-fields">
            <label htmlFor="customer-email">Email</label>
            <input
              type="email"
              id="customer-email"
              className="login-signup-form-input"
              name="customer_email"
              onChange={handleChangeCustomerEmail}
            ></input>
            <p
              className={
                customerLoginFieldsError.customer_emailError === ""
                  ? "hide-data"
                  : "display-input-data-error"
              }
            >
              {customerLoginFieldsError.customer_emailError}
            </p>
          </div>
          <div className="login-signup-form-fields">
            <label htmlFor="customer-password">Password</label>
            <div className="login-signup-form-input password-input-div">
              <input
                type={hidePassword?"password":"text"}
                id="customer-password"
                className="password-input"
                name="customer_password"
                onChange={handleChangeCustomerPassword}
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
                customerLoginFieldsError.customer_passwordError === ""
                  ? "hide-data"
                  : "display-input-data-error"
              }
            >
              {customerLoginFieldsError.customer_passwordError}
            </p>
            <p
              className={
                customerLoginAuthError === ""
                  ? "hide-data"
                  : "display-login-signup-auth-error"
              }
            >
              {customerLoginAuthError}
            </p>
          </div>
          <div className="login-signup-form-complete-btn-box">
            <button
              className="login-signup-form-complete-btn customer-login-signup-btn"
              onClick={handleClickCustomerLogin}
            >
              Sign in
            </button>
          </div>
          <div className="login-signup-link-box">
            <p>
              Don't have an account?
              <span
                className="login-sign-up-link"
                onClick={gotoCustomerSignUpPage}
              >
                Sign Up
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="login-signup-image-box">
        <img
          src={customerpage}
          alt="customerloginpage"
          className="login-signup-page-img"
        ></img>
      </div>
    </div>
  );
}
