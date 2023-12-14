import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "./orders.css";

export default function Orders() {
  const [ordersList, setOrdersList] = useState();

  const getOrders=async()=>{
    const result = await axios.post("https://food-ordering-webapp-backend.onrender.com/order/getorders", {}, {
      headers:{
        Authorization:localStorage.getItem("r-token")
      }
    });
    if(result.status===200){
      setOrdersList(result.data.allOrdersList.filter((element)=>{
        return element.order_status===true;
     }));
    }
  }
  useEffect(()=>{
    getOrders();
  },[]);
  const completeOrder=async(order)=>{
    order.order_status=false;
    try{
      const result = await axios.put("https://food-ordering-webapp-backend.onrender.com/order/update_orderstatus", order);
      if(result.status===200){
        setTimeout(()=>{
          getOrders();
        }, 2000)
      }
    }
    catch(e){
      console.log(e.response);
    }
  }

  return (
    <div className='orders-page-container'>
      {ordersList ? (
      <>
      {ordersList.length>0 ? (<>
        <h2>Current Orders</h2>
        <p>These are the current orders which are yet to be accepted by you</p>
        <table className='order-table'>
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Item Name</th>
              <th>Item Quantity</th>
              <th>Order status</th>
            </tr>
          </thead>
          <tbody>
          {ordersList.map((element, index)=>{
              return (
                <tr>
                  <td>{index+1}</td>
                  <td>{element.item_name}</td>
                  <td>{element.ordered_item_quantity}</td>
                  <td>
                    <button onClick={()=>completeOrder(element)} className='order-action-btn'>Accept the Order</button>
                  </td>
                </tr>
              )
          })}
          </tbody>
      </table>
      </>):((<><p>No Orders requested</p></>))}
      </>):(<>
      Loading...
      </>)}
    </div>
  )
}
