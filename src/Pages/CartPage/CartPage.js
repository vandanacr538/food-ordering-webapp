import React, { useEffect, useState } from 'react'
import "./cart.css";
import axios from 'axios';
import { Edit } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';

export default function CartPage() {
  const navigate= useNavigate();
  const [cartItems, setCartItems] = useState();
  const [totalPrice, setTotalPrice] = useState("");
  const [showQuanEditModal, setShowQuanEditModal] = useState(false);
  const [editQuantityError, setEditQuantityError] = useState("");
  const [quantityUpdatedItem, setQuantityUpdatedItem] = useState({});
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [itemToRemoveFromCart, setItemToRemoveFromCart] =useState();
  const [removeSucess, setRemoveSuccess] = useState("");

  const getCartItems = async ()=>{
    try{
      const result = await axios.post("http://localhost:8080/cart/getcart", {}, {
        headers:{
          Authorization:localStorage.getItem("c-token")
        }
      });
      if(result.status===200){
        setCartItems(result.data.result);
      }
    }
    catch(e){
      alert(e.response.data.msg);
    }
  }
  const getTotalPrice=async()=>{
    try{
      if(cartItems && cartItems.length>0){
        const result = await axios.post("http://localhost:8080/cart/get_totalprice",{}, {
        headers:{
          Authorization:localStorage.getItem("c-token")
        }
      });
      if(result.status===200){
        setTotalPrice(result.status.data[0].total_price);
      }
      }
    }
    catch(e){
      console.log(e.response);
    }  
  }
  useEffect(()=>{
    getCartItems();
    getTotalPrice();
  },[]);
  const displayQuanEditModal = (element)=>{
    setShowQuanEditModal(true);
    setQuantityUpdatedItem(element);
  }
  const handleChangeQuantity=(e)=>{
    setQuantityUpdatedItem((previousValue)=>({...previousValue, [e.target.name]:e.target.value}));
    if(e.target.value===""){
      setEditQuantityError("Enter the Quantity");
    }
    else{
      setEditQuantityError("");
    }
  }
  const updateQuantity=async()=>{
    console.log(quantityUpdatedItem);
    try{
      const result = await axios.put("http://localhost:8080/cart/update_item_quantity", quantityUpdatedItem, 
      {
        headers:{
          Authorization:localStorage.getItem("c-token")
        }
      }
      );
      if(result.status===200){
        getCartItems();
        getTotalPrice();
        setShowQuanEditModal(false);
      }
    }
    catch(e){
        console.log(e.response.data.msg);
    }
  }
  const displayRemoveItemModal=(item)=>{
    setShowRemoveModal(true);
    console.log(item.fim.item_name);
    setItemToRemoveFromCart(item);
  }
  const handleClickRemoveItemFromCart=async()=>{
    console.log(itemToRemoveFromCart);
    try{
      const response = await axios.delete("http://localhost:8080/cart/remove_item_from_cart", 
      {
        headers:{
          Authorization:localStorage.getItem("c-token")
        },
        data:{itemToRemoveFromCart}
      }
      );
      if(response.status===200){
        getCartItems();
        getTotalPrice();
        setShowRemoveModal(false);
      }
    }
    catch(e){
      alert(e.response.data.msg);
    }
  }
  const checkoutFromCart=async()=>{
    try{
      const result = await axios.post("http://localhost:8080/cart/checkout", {},
      {
        headers:{
          Authorization:localStorage.getItem("c-token")
        }
      }
      );
      if(result.status===200){
        getCartItems();
        getTotalPrice();
      }
    }
    catch(e){
      alert(e.response.data.msg);
    }
  }

  return (
    <div className='cart-page-maincontainer'>
      <div className="cart-container">
        {cartItems ? (<>
        {cartItems.length>0 ? (<>
          <div className="cart-items-container">
          <div className='cart-items-header'>
            <h2>Your Cart</h2>
            <h2>{cartItems.length} Items</h2>
          </div>
          <hr></hr>
          <table className='cart-items-table'>
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {cartItems ? (<>
              {cartItems.map((element, index)=>(
                <tr key={index}>
                  <td className='cart-item-col'>
                    <img src={element.fim.item_picture_url} alt={element.fim.item_name} className="cart-item-img"></img>
                    <div>
                      <h3>{element.fim.item_name}</h3>
                      <p className="cart-item-remove-text" onClick={()=>displayRemoveItemModal(element)}>Remove</p>
                    </div>
                  </td>
                  <td className='cart-item-quan-col'>
                    <div className='cart-item-quan-div'>
                      <div className='cart-quantity-btn'>{element.quan}</div>
                      <Edit style={{fontSize:"15px", cursor:"pointer"}} onClick={()=>displayQuanEditModal(element)}/>
                    </div>
                  </td>
                  <td>₹{element.fim.item_price}</td>
                </tr>
              ))}
              </>):(
                <>NO data</>
              )
              }
            </tbody>
          </table>
          <hr></hr>
          <div className='total-checkout-box'>
            Total Price:
            {totalPrice.length===0?(<></>):(<span className='total-price'>₹{totalPrice}</span>)}
            <button className='checkout-btn' onClick={checkoutFromCart}>Checkout</button>
          </div>
          <div className={showQuanEditModal ? "edit-quan-modal" : "hide-data"}>
            <p>Enter the Quantity of </p>{" "}
            <input
              type="number"
              name="quan"
              className='edit-quan-input'
              onChange={handleChangeQuantity}
              value={quantityUpdatedItem.quan || ""}
            />
            <p className={editQuantityError===""?"hide-data":"display-input-data-error"}>{editQuantityError}</p>
            <div className="edit-modal-btns">
              <button className="cancel-btn" onClick={()=>setShowQuanEditModal(false)}>Cancel</button>
              <button className="update-confirm-btn" onClick={updateQuantity} >Update</button>
            </div>
          </div>
          <div className={showRemoveModal? "delete-modal":"hide-data"}>
            <h3>Remove Item from Cart</h3>
            <p>Are you sure, you want to remove this Item from your cart?</p>
            <p id="delete-food">{itemToRemoveFromCart && (`"${itemToRemoveFromCart.fim.item_name}"`)}</p>
            <hr></hr>
            <div className="delete-modal-btns">
              <button className="cancel-btn" onClick={()=>setShowRemoveModal(false)}>Cancel</button>
              <button className="delete-confirm-btn" onClick={handleClickRemoveItemFromCart}>Remove</button>
            </div>
            <p className={ removeSucess=== "" ? "hide-data": "form-submit-success-msg"}>
                {removeSucess}
            </p>
         </div>
        </div>
        </>):(<p>Your Cart is Empty!</p>)}
        </>):(
          <>Loading.....</>
        )}
      </div>
    </div>
  )
}
