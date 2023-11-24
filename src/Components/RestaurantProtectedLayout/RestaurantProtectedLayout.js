import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function RestaurantProtectedLayout() {
  const [restNotLoggedIn, setRestNotLoggedIn] = useState(false);
  
  useEffect(() => {
    if (localStorage.getItem("r-token") === null) {
      setRestNotLoggedIn(true);
    }
    else{
      setRestNotLoggedIn(false);
    }
  }, [restNotLoggedIn]);
  return (
    <div>
        {restNotLoggedIn ? <Navigate to="/restaurant/login"/>:<Outlet/>}
    </div>
  )
}
