import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LandingPage from './Pages/LandingPage/LandingPage';
import CustomerLogin from './Pages/CustomerLogin/CustomerLogin';
import CustomerSignUp from './Pages/CustomerSignUp/CustomerSignUp';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage/>}></Route>
        <Route path='/customer/login' element={<CustomerLogin/>}></Route>
        <Route path='/customer/signup' element={<CustomerSignUp/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
