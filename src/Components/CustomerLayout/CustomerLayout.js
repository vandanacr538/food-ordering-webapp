import React from 'react'
import CustomerHeader from '../CustomerHeader/CustomerHeader'
import { Outlet } from 'react-router-dom'
import "./customerlayout.css";

export default function CustomerLayout() {
  return (
    <div>
        <CustomerHeader/>
        <div className='outlet-main-container'>
            <Outlet/>
        </div>
    </div>
  )
}
