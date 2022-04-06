import './homepage.css';
import Post from '../post/Post';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function Homepage() {
  const posts = useSelector((state) => state.posts.value);

  useEffect(() => {
    const postComponents = posts.map((post) => <Post data={post} />);
  }, [posts]);

  return <div>homepage</div>;
}

export default Homepage;
