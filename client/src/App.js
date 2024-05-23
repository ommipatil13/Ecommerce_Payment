import React from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header';
import Home from './Components/Home';
import CardDetails from './Components/CardDetails';
import toast, { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<CardDetails />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App