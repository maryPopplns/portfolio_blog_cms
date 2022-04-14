import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import Login from '../components/login/Login';
import { Routes, Route } from 'react-router-dom';
import { setPosts } from '../store/slices/posts';
import Navbar from '../components/navbar/Navbar';
import Homepage from '../components/homepage/Homepage';
import NewPost from '../components/newPost/NewPost';

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
      {/* {!loggedIn && <Login />}
      {loggedIn && ( */}
      <Routes>
        <Route path='/' element={<Navbar />}>
          <Route index element={<Homepage />} />
          <Route path='new' element={<NewPost />} />
          {/* <Route path=':postID' element={} /> */}
        </Route>
      </Routes>
      {/* )} */}
    </>
  );
}

export default App;
