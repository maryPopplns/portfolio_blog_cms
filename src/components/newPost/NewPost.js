import { useState } from 'react';
import './newPost.css';

function NewPost() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  function formHandler(event) {
    event.preventDefault();
  }
  function analyzeHandler() {
    const url = 'https://api.textgears.com/grammar';
    fetch('', {
      method: 'GET',
      headers: {
        Authorization: 'application/x-www-form-urlencoded',
      },
    })
      .then((result) => {
        //
      })
      .catch((error) => {
        //
      });
  }

  return (
    <main className='new_post'>
      <h1>new post</h1>
      <form onSubmit={formHandler}>
        <div className='new_post_input_container'>
          <label htmlFor='new_post_title'>title</label>
          <input
            type='text'
            id='new_post_title'
            name='new_post_title'
            required
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
            required
            value={body}
            onChange={({ target }) => setBody(target.value)}
          ></textarea>
        </div>
        <div className='new_post_button_container'>
          <button type='button' onClick={analyzeHandler}>
            analyze
          </button>
          <button type='submit'>submit</button>
        </div>
      </form>
    </main>
  );
}

export default NewPost;
