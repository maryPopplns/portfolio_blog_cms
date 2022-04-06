import './homepage.css';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function Homepage() {
  const posts = useSelector((state) => state.posts.value);

  useEffect(() => {
    console.log(posts);
  }, [posts]);

  return <div>homepage</div>;
}

export default Homepage;
