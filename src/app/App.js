import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import Homepage from '../components/homepage/Homepage';
import Login from '../components/login/Login';
import './App.css';

function App() {
  const loggedIn = useSelector((state) => state.loggedIn.value);

  return (
    <>
      <Login />
      {loggedIn && (
        <Routes>
          <Route path='/' element={<Navbar />}>
            <Route index element={<Homepage />} />
          </Route>
        </Routes>
      )}
    </>
  );
}

export default App;
