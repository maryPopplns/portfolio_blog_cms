import './homepage.css';
import Post from '../post/Post';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';

function Homepage() {
  const posts = useSelector((state) => state.posts.value);

  const postComponents = posts.map((post) => {
    return <Post data={post} key={post._id} />;
  });

  // TODO make homepage size calc(100vh - navbar)
  return (
    <main className='homepage'>
      <h1 className='homepage_header'>all posts</h1>
      <hr className='homepage_header_hr' />
      <div>{postComponents}</div>
      <Outlet />
    </main>
  );
}

export default Homepage;
