import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './post.css';

function Post({ data }) {
  const { _id, title, body } = data;

  return (
    <Link className='homepage_post_link' to={_id}>
      <div>
        <h2>{title}</h2>
        <p className='homepage_post_body'>{body}</p>
      </div>
    </Link>
  );
}

export default Post;
