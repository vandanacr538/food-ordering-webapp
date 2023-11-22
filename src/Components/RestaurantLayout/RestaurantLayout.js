import React from 'react'
import { Outlet } from 'react-router-dom';
import RestaurantHeader from '../RestaurantHeader/RestaurantHeader';
import RestaurantSideNav from '../RestaurantSideNav/RestaurantSideNav';
import "./restaurantlayout.css";

export default function RetaurantLayout() {
  
  return (
    <div>
        <RestaurantHeader/>
        <div className='main-container'>
          <RestaurantSideNav/>
          <div className='outlet-container'>
            <Outlet/>
          </div>
        </div>
    </div>
  )
}
