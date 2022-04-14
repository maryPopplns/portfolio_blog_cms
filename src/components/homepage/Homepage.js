import './homepage.css';
import { uuidv4 } from 'uuid';
import Post from '../post/Post';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';

function Homepage() {
  const posts = useSelector((state) => state.posts.value);

  const postComponents = posts.map((post) => {
    const key = uuidv4();
    return <Post data={post} key={key} />;
  });

  // TODO load posts upon component load

  return (
    <main className='homepage'>
      <h1 className='homepage_header'>all posts</h1>
      <hr className='homepage_header_hr' />
      <div className='postsContainer'>{postComponents}</div>
      <Outlet />
    </main>
  );
}

export default Homepage;
