import './newPost.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import urlencoded from '../../helpers/urlencoded';
import Analysis from '../analysis/Analysis';

import data from './data.json'; // TODO remove

function NewPost() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  // TODO remove placeholder text
  const [errors, setErrors] = useState([{}]);
  const [analysis, setAnalysis] = useState(false);
  const jwtToken = useSelector((state) => state.jwtToken.value);

  function formHandler(event) {
    event.preventDefault();
    const newPost = urlencoded({ title, body });
    fetch('https://whispering-depths-29284.herokuapp.com/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${jwtToken}`,
      },
      body: newPost,
    })
      .then((result) => result.json())
      .then((result) => {
        // TODO redirect to homepage
        console.log(result);
      });
  }

  function analyzeHandler() {
    //  TODO requires login

    // const postBody = urlencoded({ body });
    // fetch('https://whispering-depths-29284.herokuapp.com/grammar', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //     Authorization: `Bearer ${jwtToken}`,
    //   },
    //   body: postBody,
    // })
    //   .then((result) => result.json())
    //   .then(({ errors }) => {
    //     setAnalysis(true);
    //     setErrors(errors);
    //   });

    setAnalysis(true);
    setErrors(data.errors);
  }

  return (
    <>
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
              spellCheck='true'
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
              spellCheck='true'
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
      {analysis && <Analysis data={{ errors, body }} />}
    </>
  );
}

export default NewPost;
