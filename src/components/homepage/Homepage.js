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

  return (
    <main>
      <h1>Blog CMS</h1>
      <div>{postComponents}</div>
      <Outlet />
    </main>
  );
}

export default Homepage;
