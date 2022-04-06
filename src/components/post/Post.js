import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './post.css';

function Post({ data }) {
  const { _id, title, body } = data;

  return (
    <Link to={_id}>
      <h2>{title}</h2>
      {/* <p>{body}</p> */}
    </Link>
  );
}

export default Post;
