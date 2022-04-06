import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import Homepage from '../components/homepage/Homepage';
import Login from '../components/login/Login';
import './App.css';
import { setPosts } from '../store/slices/posts';

function App() {
  const loggedIn = useSelector((state) => state.loggedIn.value);

  const dispatch = useDispatch();
  useEffect(() => {
    fetch('https://protected-beyond-87972.herokuapp.com/post')
      .then((result) => result.json())
      .then((posts) => dispatch(setPosts(posts)));
  }, [dispatch]);

  return (
    <>
      {!loggedIn && <Login />}
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
