import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LandingPage from './Pages/LandingPage/LandingPage';
import CustomerLogin from './Pages/CustomerLogin/CustomerLogin';
import CustomerSignUp from './Pages/CustomerSignUp/CustomerSignUp';
import RestaurantLogin from './Pages/RestaurantLogin/RestaurantLogin';
import RestaurantSignUp from './Pages/RestaurantSignUp/RestaurantSignUp';
import RestaurantHomePage from './Pages/RestaurantHomePage/RestaurantHomePage';
import AddFoodItem from './Pages/AddFoodItem/AddFoodItem';
import RestaurantLayout from './Components/RestaurantLayout/RestaurantLayout';
import RestaurantSettings from './Pages/RestaurantSettings/RestaurantSettings';
import RestaurantFoodMenu from './Pages/RestaurantFoodMenu/RestaurantFoodMenu';
import EditFoodItem from './Pages/EditFoodItem/EditFoodItem';
import RestaurantProtectedLayout from './Components/RestaurantProtectedLayout/RestaurantProtectedLayout';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage/>}></Route>
        <Route path='/restaurant' element={<RestaurantProtectedLayout/>}>
          <Route path='/restaurant' element={<RestaurantLayout/>}>
            <Route path='/restaurant/home' element={<RestaurantHomePage/>}></Route>
            <Route path='/restaurant/addfooditem' element={<AddFoodItem/>}></Route>
            <Route path='/restaurant/settings' element={<RestaurantSettings/>}></Route>
            <Route path='/restaurant/foodmenu' element={<RestaurantFoodMenu/>}></Route>
            <Route path='/restaurant/editfooditem' element={<EditFoodItem/>}></Route>
          </Route>
        </Route>
        <Route path='/customer/login' element={<CustomerLogin/>}></Route>
        <Route path='/customer/signup' element={<CustomerSignUp/>}></Route>
        <Route path='/restaurant/login' element={<RestaurantLogin/>}></Route>
        <Route path='/restaurant/signup' element={<RestaurantSignUp/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
