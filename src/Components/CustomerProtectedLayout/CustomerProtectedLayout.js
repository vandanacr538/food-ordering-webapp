import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom';

export default function CustomerProtectedLayout() {
  const [custNotLoggedIn, setCustNotLoggedIn] = useState(false);
  
  useEffect(() => {
    if (localStorage.getItem("c-token") === null) {
      setCustNotLoggedIn(true);
    }
    else{
      setCustNotLoggedIn(false);
    }
  }, [custNotLoggedIn]);

  return (
    <div>
        {custNotLoggedIn ? <Navigate to="/customer/login"/> : <Outlet/>}
    </div>
  )
}
