import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LandingPage from './Pages/LandingPage/LandingPage';
import CustomerLogin from './Pages/CustomerLogin/CustomerLogin';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage/>}></Route>
        <Route path='/customer_login' element={<CustomerLogin/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
