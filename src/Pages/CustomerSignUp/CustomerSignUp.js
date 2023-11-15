import React, { useState } from "react";
import "../../CommonStyle/loginandsignup.css";
import customerpage from "../../Assets/customerpage.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CustomerSignUp() {
  const navigate = useNavigate();
  const [customerSignUpData, setCustomerSignUpData] = useState({
    customer_name: "",
    customer_email: "",
    customer_mobilenum: "",
    customer_password: "",
  });
  const [customerPasswordRule, setCustomerPasswordRule] = useState(false);
  const [customerSignUpFieldsError, setCustomerSignUpFieldsError] = useState(
    {}
  );
  const [customerSignUpAuthError, setCustomerSignUpAuthError] = useState("");
  const custSignUpValidDataObj = {
    isNameValid: false,
    isEmailValid: false,
    isMobileValid: false,
    isPasswordValid: false,
  };

  const handleChangeCustomerSignUpData = (e) => {
    setCustomerSignUpData((previousValue) => ({
      ...previousValue,
      [e.target.name]: e.target.value.trim(),
    }));
  };
  const handleKeyUpCustomerPasswordRule = () => {
    setCustomerPasswordRule(true);
  };
  const validateCustomerName = () => {
    if (customerSignUpData.customer_name === "") {
      setCustomerSignUpFieldsError((previousError) => ({
        ...previousError,
        customer_nameError: "Enter your name",
      }));
      custSignUpValidDataObj["isNameValid"] = false;
    } else {
      setCustomerSignUpFieldsError((previousError) => ({
        ...previousError,
        customer_nameError: "",
      }));
      custSignUpValidDataObj["isNameValid"] = true;
    }
  };
  const validateCustomerEmail = () => {
    const emailRegx =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (customerSignUpData.customer_email === "") {
      setCustomerSignUpFieldsError((previousError) => ({
        ...previousError,
        customer_emailError: "Enter your email",
      }));
      custSignUpValidDataObj["isEmailValid"] = false;
    } else if (emailRegx.test(customerSignUpData.customer_email) === false) {
      setCustomerSignUpFieldsError((previousError) => ({
        ...previousError,
        customer_emailError: "Invalid email address!, please check",
      }));
      custSignUpValidDataObj["isEmailValid"] = false;
    } else {
      setCustomerSignUpFieldsError((previousError) => ({
        ...previousError,
        customer_emailError: "",
      }));
      custSignUpValidDataObj["isEmailValid"] = true;
    }
  };
  const validateCustomerMobile = () => {
    if (customerSignUpData.customer_mobilenum === "") {
      setCustomerSignUpFieldsError((previousError) => ({
        ...previousError,
        customer_mobileError: "Enter your mobile number",
      }));
      custSignUpValidDataObj["isMobileValid"] = false;
    } else {
      const mobileRegex = /^\d/;
      const isMobile = customerSignUpData.customer_mobilenum.toString();
      if (mobileRegex.test(Number(isMobile)) === false) {
        setCustomerSignUpFieldsError((previousError) => ({
          ...previousError,
          customer_mobileError: "Mobile Number is not valid",
        }));
        custSignUpValidDataObj["isMobileValid"] = false;
      } else if (isMobile.length < 10) {
        setCustomerSignUpFieldsError((previousError) => ({
          ...previousError,
          customer_mobileError: "Mobile Number must have 10 digits",
        }));
        custSignUpValidDataObj["isMobileValid"] = false;
      } else if (isMobile.length > 10) {
        setCustomerSignUpFieldsError((previousError) => ({
          ...previousError,
          customer_mobileError: "Mobile Number cannot have more than 10 digits",
        }));
        custSignUpValidDataObj["isMobileValid"] = false;
      } else {
        setCustomerSignUpFieldsError((previousError) => ({
          ...previousError,
          customer_mobileError: "",
        }));
        custSignUpValidDataObj["isMobileValid"] = true;
      }
    }
  };
  const validateCustomerPassword = () => {
    if (customerSignUpData.customer_password === "") {
      setCustomerSignUpFieldsError((previousError) => ({
        ...previousError,
        customer_passwordError: "Enter your password",
      }));
      custSignUpValidDataObj["isPasswordValid"] = false;
    } else {
      const passwordValidation =
        /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-])/;
      if (customerSignUpData.customer_password.length < 8) {
        setCustomerSignUpFieldsError((previousError) => ({
          ...previousError,
          customer_passwordError: "Password must have 8 characters",
        }));
        custSignUpValidDataObj["isPasswordValid"] = false;
      } else if (
        passwordValidation.test(customerSignUpData.customer_password) === false
      ) {
        setCustomerSignUpFieldsError((previousError) => ({
          ...previousError,
          customer_passwordError: "Password is not valid",
        }));
        custSignUpValidDataObj["isPasswordValid"] = false;
      } else if (customerSignUpData.customer_password.length > 16) {
        setCustomerSignUpFieldsError((previousError) => ({
          ...previousError,
          customer_passwordError: "Password can have maximum 16 characters",
        }));
        custSignUpValidDataObj["isPasswordValid"] = false;
      } else {
        setCustomerSignUpFieldsError((previousError) => ({
          ...previousError,
          customer_passwordError: "",
        }));
        custSignUpValidDataObj["isPasswordValid"] = true;
      }
    }
    setCustomerPasswordRule(false);
  };
  const handleClickCustomerSignUp = async () => {
    setCustomerSignUpAuthError("");
    validateCustomerName();
    validateCustomerEmail();
    validateCustomerMobile();
    validateCustomerPassword();
    if (Object.values(custSignUpValidDataObj).every(Boolean)) {
      console.log(custSignUpValidDataObj);
      try {
        const result = await axios.post(
          "http://localhost:8080/customer/signup",
          customerSignUpData
        );
        if (result.status === 200) {
          if (result.data.token === "customer-already-exists") {
            setCustomerSignUpAuthError(result.data.msg);
          } else {
            console.log(result.data.token);
            console.log("navigate to customer home page");
          }
        }
      } catch (e) {
        setCustomerSignUpAuthError(e.response.data.msg);
      }
    }
  };

  const gotoCustomerLoginPage = () => {
    navigate("/customer/login");
  };

  return (
    <div className="login-signup-main-container">
      <div className="login-signup-container">
        <div className="login-signup-form-box customer-login-signup-form-box">
          <h1>Customer Sign Up</h1>
          <div className="login-signup-form-fields">
            <label htmlFor="customer-name">Name</label>
            <input
              type="text"
              id="customer-name"
              className="login-signup-form-input"
              name="customer_name"
              onChange={handleChangeCustomerSignUpData}
            ></input>
            <p
              className={
                customerSignUpFieldsError.customer_nameError === ""
                  ? "hide-data"
                  : "display-input-data-error"
              }
            >
              {customerSignUpFieldsError.customer_nameError}
            </p>
          </div>
          <div className="login-signup-form-fields">
            <label htmlFor="customer-email">Email</label>
            <input
              type="email"
              id="customer-email"
              className="login-signup-form-input"
              name="customer_email"
              onChange={handleChangeCustomerSignUpData}
            ></input>
            <p
              className={
                customerSignUpFieldsError.customer_emailError === ""
                  ? "hide-data"
                  : "display-input-data-error"
              }
            >
              {customerSignUpFieldsError.customer_emailError}
            </p>
          </div>
          <div className="login-signup-form-fields">
            <label htmlFor="customer-mobile">Mobile Number</label>
            <input
              type="tel"
              id="customer-mobile"
              className="login-signup-form-input"
              name="customer_mobilenum"
              onChange={handleChangeCustomerSignUpData}
            ></input>
            <p
              className={
                customerSignUpFieldsError.customer_mobileError === ""
                  ? "hide-data"
                  : "display-input-data-error"
              }
            >
              {customerSignUpFieldsError.customer_mobileError}
            </p>
          </div>
          <div className="login-signup-form-fields">
            <label htmlFor="customer-password">Password</label>
            <input
              type="password"
              id="customer-password"
              className="login-signup-form-input"
              name="customer_password"
              onChange={handleChangeCustomerSignUpData}
              onKeyUp={handleKeyUpCustomerPasswordRule}
            ></input>
            <p className={customerPasswordRule ? "password-rule" : "hide-data"}>
              Password must have 8 characters including 1 Uppercase, 1
              lowercase, 1 number & 1 special character
            </p>
            <p
              className={
                customerSignUpFieldsError.customer_passwordError === ""
                  ? "hide-data"
                  : "display-input-data-error"
              }
            >
              {customerSignUpFieldsError.customer_passwordError}
            </p>
            <p
              className={
                customerSignUpAuthError === ""
                  ? "hide-data"
                  : "display-login-signup-auth-error"
              }
            >
              {customerSignUpAuthError}
            </p>
          </div>
          <div className="login-signup-form-complete-btn-box">
            <button
              className="login-signup-form-complete-btn customer-login-signup-btn"
              onClick={handleClickCustomerSignUp}
            >
              Sign Up
            </button>
          </div>
          <div className="login-signup-link-box">
            <p>
              Already have an account?
              <span
                className="login-sign-up-link"
                onClick={gotoCustomerLoginPage}
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="login-signup-image-box">
        <img
          src={customerpage}
          alt="customerpageimage"
          className="login-signup-page-img"
        ></img>
      </div>
    </div>
  );
}
