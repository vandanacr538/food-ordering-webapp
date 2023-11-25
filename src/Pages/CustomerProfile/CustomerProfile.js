import React, { useEffect, useState } from 'react'
import "./customerprofile.css";
import "../../CommonStyle/form.css";
import { Edit, Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { decodeToken } from 'react-jwt';
import custprofilefooter from "../../Assets/custprofilefooter.avif"

export default function CustomerProfile() {
  const mobileRegex=/^\d/;
  const [custDetails, setCustDetails] =useState({});
  const [disabled, setDisabled] = useState(true); 
  const [editSuccess, setEditSuccess] =useState("");
  const [editCustProfileError, setEditCustProfileError] = useState("");
  const [customerPasswordRule, setCustomerPasswordRule] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [editCustFieldsError, setEditCustFieldsError] = useState({
    edit_custNameError:"",
    edit_custMobileError:"",
    edit_custPasswordError:""
  });
  const editCustProfileValidDataObj = {
    isEditCustNameValid: false,
    isEditCustMobileValid: false,
    isEditCustPasswordValid: false,
  };

  const getCustDetails = async()=>{
    const result =await axios.get("http://localhost:8080/customer/get_customer_details",{
      headers:{
        Authorization:localStorage.getItem("c-token")
      }
    })
    setCustDetails(decodeToken(result.data.token));
  }
  useEffect(()=>{
    if(localStorage.getItem("c-token")){
      getCustDetails();
    }
  }, []);
  const handleClickEnableEdit=()=>{
    setDisabled(!disabled);
  }
  const handleClickShowPassword=()=>{
    setHidePassword(!hidePassword);
  }
  const handleChangeCustNameEdit = (e)=>{
    setCustDetails((previousValue)=>({...previousValue, [e.target.name]:e.target.value}));
    if(e.target.value===""){
      setEditCustFieldsError((previousError)=>({...previousError, edit_custNameError:"Enter your name"}));
    }
    else{
      setEditCustFieldsError((previousError)=>({...previousError, edit_custNameError:""}));
    }
  }
  const handleChangeCustMobileEdit=(e)=>{
    setCustDetails((previousValue)=>({...previousValue, [e.target.name]:e.target.value}));
    if(e.target.value===""){
      setEditCustFieldsError((previousError)=>({...previousError, edit_custMobileError:"Enter your mobile number"}));
    }
    else if(mobileRegex.test(e.target.value) === false){
      setEditCustFieldsError((previousError)=>({...previousError, edit_custMobileError:"Mobile Number must have only digits"}));
    }
    else if(e.target.value.length>10){
      setEditCustFieldsError((previousError) => ({
        ...previousError,
        edit_custMobileError: "Mobile Number cannot have more than 10 digits",
      }));
      editCustProfileValidDataObj["isEditCustMobileValid"] = false;
    }
    else{
      setEditCustFieldsError((previousError)=>({...previousError, edit_custMobileError:""}));
    }
  }
  const handleChangeCustPasswordEdit=(e)=>{
    setCustDetails((previousValue)=>({...previousValue, [e.target.name]:e.target.value}));
    if(e.target.value===""){
      setEditCustFieldsError((previousError)=>({...previousError, edit_custPasswordError:"Enter your password"}));
      setCustomerPasswordRule(false);
    }
    else{
      setCustomerPasswordRule(true);
      setEditCustFieldsError((previousError)=>({...previousError, edit_custPasswordError:""}));
    }
  }
  const validateEditCustName = () => {
    if (custDetails.customer_name === "") {
      setEditCustFieldsError((previousError) => ({
        ...previousError,
        edit_custNameError: "Enter your name",
      }));
      editCustProfileValidDataObj["isEditCustNameValid"] = false;
    } else {
      setEditCustFieldsError((previousError) => ({
        ...previousError,
        edit_custNameError: "",
      }));
      editCustProfileValidDataObj["isEditCustNameValid"] = true;
    }
  };
  const validateEditCustMobile = () => {
    if (custDetails.customer_mobilenum === "") {
      setEditCustFieldsError((previousError) => ({
        ...previousError,
        edit_custMobileError: "Enter your mobile number",
      }));
      editCustProfileValidDataObj["isEditCustMobileValid"] = false;
    } 
    else {
      if (mobileRegex.test(custDetails.customer_mobilenum) === false) {
        setEditCustFieldsError((previousError) => ({
          ...previousError,
          edit_custMobileError: "Mobile Number must have only digits",
        }));
        editCustProfileValidDataObj["isEditCustMobileValid"] = false;
      }
      else if(custDetails.customer_mobilenum.toString().length<10){
        setEditCustFieldsError((previousError) => ({
          ...previousError,
          edit_custMobileError: "Mobile Number must have 10 digits",
        }));
        editCustProfileValidDataObj["isEditCustMobileValid"] = false;
      } 
      else if(custDetails.customer_mobilenum.toString().length>10){
        setEditCustFieldsError((previousError) => ({
          ...previousError,
          edit_custMobileError: "Mobile Number cannot have more than 10 digits",
        }));
        editCustProfileValidDataObj["isEditCustMobileValid"] = false;
      }
      else {
        setEditCustFieldsError((previousError) => ({
          ...previousError,
          edit_custMobileError: "",
        }));
        editCustProfileValidDataObj["isEditCustMobileValid"] = true;   
      }
    }
  };
  const validateEditCustPassword = () => {
    setCustomerPasswordRule(false);
    if (custDetails.customer_password === "") {
      setEditCustFieldsError((previousError) => ({
        ...previousError,
        edit_custPasswordError: "Enter your password",
      }));
      editCustProfileValidDataObj["isEditCustPasswordValid"] = false;
    } 
    else {
      const passwordValidation =
        /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-])/;
      if (custDetails.customer_password.length < 8) {
        setEditCustFieldsError((previousError) => ({
          ...previousError,
          edit_custPasswordError: "Password must have 8 characters",
        }));
        editCustProfileValidDataObj["isEditCustPasswordValid"] = false;
      } 
      else if (
        passwordValidation.test(custDetails.customer_password) === false
      ) {
        setEditCustFieldsError((previousError) => ({
          ...previousError,
          edit_custPasswordError: "Password is not valid",
        }));
        editCustProfileValidDataObj["isEditCustPasswordValid"] = false;
        setCustomerPasswordRule(true);
      } 
      else if (custDetails.customer_password.length > 16) {
        setEditCustFieldsError((previousError) => ({
          ...previousError,
          edit_custPasswordError: "Password can have maximum 16 characters",
        }));
        editCustProfileValidDataObj["isEditCustPasswordValid"] = false;
      } 
      else {
        setEditCustFieldsError((previousError) => ({
          ...previousError,
          edit_custPasswordError: "",
        }));
        editCustProfileValidDataObj["isEditCustPasswordValid"] = true;
      }
    }
  };
  const handleClickUpdateCustData=async()=>{
    setEditCustProfileError("");
    validateEditCustName();
    validateEditCustMobile();
    validateEditCustPassword();
    if(Object.values(editCustProfileValidDataObj).every(Boolean)){
        console.log(custDetails);
        try {
            const result = await axios.put("http://localhost:8080/customer/edit_customer_details", custDetails, {
                headers:{
                  Authorization:localStorage.getItem("c-token")
                }
            });
            if(result.status===200){
                setEditSuccess(result.data.msg);
                localStorage.removeItem("c-token");
                localStorage.setItem("c-token", result.data.token);
                window.location.reload();
            }
        } 
        catch (e) {
            setEditCustProfileError(e.response.data.msg);
        }
    }
  }

  return (
    <div className='cust-profile-page-container'>
      <div className='settings-edit-box cust-profile-editbox'>
        <h2>Customer Settings</h2>
        <div className='edit-icon-box'>
            <Edit sx={{ height: "100%", width: "100%", color: "#ff9100" }} 
            className='edit-icon'
            onClick={handleClickEnableEdit}
            />
        </div>
      </div>
      <div className='form-container cust-profile-form-container'>
        <div className='form-box cust-profile-form-box'>
          <div className="form-fields">
            <label htmlFor="customer-name">Name</label>
            <input type='text'id="customer-name" name="customer_name" 
            value={custDetails.customer_name || ''}
            className="form-input"
            disabled={disabled}
            onChange={handleChangeCustNameEdit}
            > 
            </input>
            <p className={ editCustFieldsError.edit_custNameError === "" ? "hide-data" : "display-input-data-error"}>
              {editCustFieldsError.edit_custNameError}
            </p>
          </div>
          <div className="form-fields">
            <label htmlFor="customer-email">Email</label>
            <input type='text' id="customer-email" name="customer_mobilenum" 
            value={custDetails.customer_email || ''}
            className="form-input" 
            disabled
            >
            </input>
          </div>
          <div className="form-fields">
            <label htmlFor="customer-mobilenum">Mobile Number</label>
            <input type='text' id="customer-mobilenum" name="customer_mobilenum" 
            value={custDetails.customer_mobilenum || ''}
            className="form-input" 
            disabled={disabled}
            onChange={handleChangeCustMobileEdit}
            >
            </input>
            <p className={editCustFieldsError.edit_custMobileError === "" ? "hide-data" : "display-input-data-error"}>
              {editCustFieldsError.edit_custMobileError}
            </p>
          </div>
          <div className="form-fields">
            <label htmlFor="customer-password">Customer Password</label>
            <div className="form-input password-input-div">
              <input
                type={hidePassword?"password":"text"}
                id="customer-password"
                className="password-input"
                name="customer_password"
                value={custDetails.customer_password || ''}
                disabled={disabled}
                onChange={handleChangeCustPasswordEdit}
              ></input>
              <div className="show-hide-password-box" onClick={handleClickShowPassword}>
                {hidePassword ? (
                  <Visibility style={{ fontSize: "20px", color: "#5e5e5e" }} />
                ) : (
                  <VisibilityOff style={{ fontSize: "20px", color: "#5e5e5e" }} />
                )}
              </div>
            </div>
            <p className={editCustFieldsError.edit_custPasswordError === "" ? "hide-data" : "display-input-data-error"}>
              {editCustFieldsError.edit_custPasswordError}
            </p>
            <p
              className={customerPasswordRule ? "password-rule" : "hide-data"}
            >
              Password must have 8 characters including 1 Uppercase, 1
              lowercase, 1 number & 1 special character
            </p>
            <p className={ editCustProfileError=== "" ? "hide-data": "form-submit-fail-error"}>
              {editCustProfileError}
            </p>
          </div>
          <button className='form-submit-btn' onClick={handleClickUpdateCustData}>Update</button>
          <p className={ editSuccess=== "" ? "hide-data": "form-submit-success-msg"}>
              {editSuccess}
          </p>
        </div>
      </div>
      <div className='cust-profile-footer'>
        <img src={custprofilefooter} alt="custprofilefooter"></img>
      </div>
    </div>
  )
}
