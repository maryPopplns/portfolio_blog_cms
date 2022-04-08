import { useState } from 'react';
import './newPost.css';

function NewPost() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  return (
    <main className='new_post'>
      <h1>new post</h1>
      <form>
        <div className='new_post_input_container'>
          <label htmlFor='new_post_title'>title</label>
          <input
            type='text'
            id='new_post_title'
            name='new_post_title'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          ></input>
        </div>
        <div className='new_post_input_container'>
          <label htmlFor='new_post_body'>body</label>
          <textarea
            type='textarea'
            id='new_post_body'
            name='new_post_body'
            resize='false'
            value={body}
            onChange={({ target }) => setBody(target.value)}
          ></textarea>
        </div>
        <button></button>
      </form>
    </main>
  );
}

export default NewPost;
