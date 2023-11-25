import React from 'react'
import CustomerHeader from '../CustomerHeader/CustomerHeader'
import { Outlet } from 'react-router-dom'

export default function CustomerLayout() {
  return (
    <div>
        <CustomerHeader/>
        <div className='main-container'>
            <Outlet/>
        </div>
    </div>
  )
}
