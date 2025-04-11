import React from 'react'
import Home from './pages/home'
import Login from './pages/Login'
// import { Route, Router,Routes } from 'lucide-react'
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Register from './pages/Register';
import Match from './components/Match';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Protected from './components/Protected';
import  Wallet  from './pages/Wallet';
// import Header from './components/header';


const App = () => {
  return (
    <div className='w-full h-full text-white bg-black  ' >      
       <div>
        <Router>
          <Routes>
            <Route path="/" element={  <Login />} />
            <Route path="/home" element={
               <Home/> 
              } />
            <Route path="/register" element={<Register/>} />
            <Route path="/match/:id" element={
              <Protected> <Match/> </Protected>
              } />
            <Route path="/wallet" element={
              <Protected> <Wallet/> </Protected>
            } />


            </Routes>
        </Router>
        <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false}        newestOnTop={false}        closeOnClick        rtl={false}        pauseOnFocusLoss        draggable        pauseOnHover        theme="colored"      />
       </div>
    </div>
  )
}

export default App