import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import ManageMovie from './components/ManageMovie';
import ManagePromotions from './components/ManagePromotions';
import ManageUsers from './components/ManageUsers';
import { MoviesProvider } from './components/MoviesContext';
import {Provider} from 'react-redux'
import store from './redux/store';
import SignupPage from './components/Signup';
import EditProfile from './components/EditProfile';
import Login from './components/Login';
import ForgetPassword from './components/ForgotPassword';
import EmailConfirmation from './components/EmailConfirmation';
import RegConfirmation from './components/RegConfirmation';
import ChangePassword from './components/ChangePassword';
import Activation from './components/Activation';
import OrderPage from './components/checkout';
import ConfirmationPage from './components/confirmationPage';
import MovieTickets from './components/seatBooking';
import PaymentPage from './components/payment';
import Navbar from './components/Navbar'; // Import Navbar component
import MovieModal from './components/MovieModal';
import { UseDispatch, useSelector } from 'react-redux';
import OrderHistory from './components/OrderHistory';


function App() {
  const admin = useSelector((state) => state.login.admin)
  const user = useSelector((state) => state.login.email)
  // Function to handle user logout
  const handleLogout = () => {
    localStorage.removeItem('user'); // Remove user data from localStorage if stored
    window.location.href = '/'; // Redirect to home page
  };

  return (
    <MoviesProvider>
      <Router>
        <div>
          <Navbar/>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgetPassword" element={<ForgetPassword />} />
            <Route path="/resetPassword" element={<ChangePassword />} />
            <Route path="/regConfirmation" element={<RegConfirmation />} />
            <Route path="/EmailConfirmation" element={<EmailConfirmation />} />
            <Route path="/activation" element={<Activation />} />
            <Route path="/checkout" element={<OrderPage />} />
            <Route path='/confirmationPage' element={<ConfirmationPage />}/>
            <Route path='/seatBooking' element={<MovieTickets />}/>
            <Route path='/payment' element={<PaymentPage />}/>
            <Route path='/dontUse' element={<MovieModal/>}/>
            <Route path='/order-history' element={<OrderHistory />} />
            <Route
              path="/editprofile"
              element={user ? <EditProfile /> : <Navigate to="/login" replace />}
            />
            {user && admin && (
              <>
                <Route path="/manage-movies" element={<ManageMovie />} />
                <Route path="/manage-promotions" element={<ManagePromotions />} />
                <Route path="/manage-users" element={<ManageUsers />} />
              </>
            )}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </MoviesProvider>
  );

}

export default App;
