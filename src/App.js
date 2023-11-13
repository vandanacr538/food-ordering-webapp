import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LandingPage from './Pages/LandingPage/LandingPage';
import CustomerLogin from './Pages/CustomerLogin/CustomerLogin';
import CustomerSignUp from './Pages/CustomerSignUp/CustomerSignUp';
import RestaurantLogin from './Pages/RestaurantLogin/RestaurantLogin';
import RestaurantSignUp from './Pages/RestaurantSignUp/RestaurantSignUp';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage/>}></Route>
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
