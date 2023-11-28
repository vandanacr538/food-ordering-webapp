import React from 'react'
import "./restaurantsidenav.css";
import { AddCard, Grading, HomeSharp, Logout, ManageAccounts, MenuBook } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';

export default function RestaurantSideNav() {
  const {pathname} = useLocation();
  const navigate = useNavigate();

  const gotoRestHome=()=>{
    navigate("/restaurant/home");
  }
  const gotoRestFoodList=()=>{
    navigate("/restaurant/foodmenu");
  }
  const gotoRestAddItem=()=>{
    navigate("/restaurant/addfooditem");
  }
  const gotoRestOrders=()=>{
    navigate("/restaurant/orders")
  }
  const gotoRestSettings=()=>{
    navigate("/restaurant/settings");
  }
  const logOutFromRestPage=()=>{
    localStorage.removeItem("r-token");
    navigate("/restaurant/orders");
  }
  
  return (
    <div className='sidenav-container'>
      <ul>
          <li className={(pathname==="/restaurant/home")?"sidenav-list sidenav-active-list":"sidenav-list"} onClick={gotoRestHome}>
            <HomeSharp className='sidenav-list-icon'/>
            <span>Home</span>
          </li>
          <li className={(pathname==="/restaurant/foodmenu" || pathname==="/restaurant/editfooditem")?"sidenav-list sidenav-active-list":"sidenav-list"} onClick={gotoRestFoodList}>
            <MenuBook className='sidenav-list-icon'/>
            <span>Food Menu</span>
          </li>
          <li className={(pathname==="/restaurant/addfooditem")?"sidenav-list sidenav-active-list":"sidenav-list"} onClick={gotoRestAddItem}>
            <AddCard className='sidenav-list-icon'/>
            <span>Add Food Item</span>
          </li>
          <li  className={(pathname==="/restaurant/orders")?"sidenav-list sidenav-active-list":"sidenav-list"} onClick={gotoRestOrders}>
            <Grading  className='sidenav-list-icon'/>
            <span>Orders</span>
          </li>
          <li className={(pathname==="/restaurant/settings")?"sidenav-list sidenav-active-list":"sidenav-list"} onClick={gotoRestSettings}>
            <ManageAccounts className='sidenav-list-icon'/>
            <span>Settings</span>
          </li>
          <li className='sidenav-list' onClick={logOutFromRestPage}>
            <Logout  className='sidenav-list-icon'/>
            <span>Logout</span>
          </li>
      </ul>
    </div>
  )
}
