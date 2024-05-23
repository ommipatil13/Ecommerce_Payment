import React from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header';
import Home from './Components/Home';
import CardDetails from './Components/CardDetails';
import toast, { Toaster } from 'react-hot-toast';
import PaymentSuccess from './Components/PaymentSuccess';
import PaymentCancel from './Components/PaymentCancel';


const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<CardDetails />} />
        <Route path='/success' element={<PaymentSuccess />} />
        <Route path='/cancel' element={<PaymentCancel />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App