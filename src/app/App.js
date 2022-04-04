import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import Homepage from '../components/homepage/Homepage';
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <>
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
