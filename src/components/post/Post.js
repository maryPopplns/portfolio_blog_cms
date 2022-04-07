import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './post.css';

function Post({ data }) {
  const { _id, title } = data;

  return (
    <div className='homepage_post_link_container'>
      <Link className='homepage_post_link' to={_id}>
        <div>
          <h2 className='homepage_post_title'>{title}</h2>
        </div>
      </Link>
    </div>
  );
}

export default Post;
