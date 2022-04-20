import './homepage.css';
import { v4 as uuidv4 } from 'uuid';
import Post from '../post/Post';
import { setPosts } from '../../store/slices/posts';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Homepage() {
  const [postComponents, setPostComponents] = useState([]);
  const posts = useSelector((state) => state.posts.value);

  const dispatch = useDispatch();
  useEffect(() => {
    fetch('https://whispering-depths-29284.herokuapp.com/post')
      .then((result) => result.json())
      .then((posts) => dispatch(setPosts(posts)));
  }, [dispatch]);

  useEffect(() => {
    const components = posts.map((post) => {
      const key = uuidv4();
      return <Post data={post} key={key} />;
    });
    setPostComponents(components);
  }, [posts]);

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
