import './App.css';
import { useEffect, useState } from 'react';
import Login from '../components/login/Login';
import { Routes, Route } from 'react-router-dom';
import { setPosts } from '../store/slices/posts';
import Navbar from '../components/navbar/Navbar';
import NewPost from '../components/newPost/NewPost';
import { useSelector, useDispatch } from 'react-redux';
import Homepage from '../components/homepage/Homepage';
import IndividualPost from '../components/individualPost/IndividualPost';

function App() {
  const loggedIn = useSelector((state) => state.loggedIn.value);

  const dispatch = useDispatch();
  useEffect(() => {
    fetch('https://whispering-depths-29284.herokuapp.com/post')
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
            <Route path='new' element={<NewPost />} />
            <Route path=':postID' element={<IndividualPost />} />
          </Route>
        </Routes>
      )}
    </>
  );
}

export default App;
