import './newPost.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Analysis from '../analysis/Analysis';
import { useNavigate } from 'react-router-dom';
import urlencoded from '../../helpers/urlencoded';

function NewPost() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('');
  const [showing, setShowing] = useState(false);
  const [errors, setErrors] = useState([{}]);
  const [analysis, setAnalysis] = useState(false);
  const jwtToken = useSelector((state) => state.jwtToken.value);
  let navigate = useNavigate();

  function formHandler(event) {
    event.preventDefault();
    const newPost = urlencoded({ title, body, category, showing });
    fetch('https://whispering-depths-29284.herokuapp.com/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${jwtToken}`,
      },
      body: newPost,
    })
      .then(() => navigate('/'))
      .catch((error) => console.log(error));
  }

  function analyzeHandler() {
    const postBody = urlencoded({ body });
    fetch('https://whispering-depths-29284.herokuapp.com/grammar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${jwtToken}`,
      },
      body: postBody,
    })
      .then((result) => result.json())
      .then(({ errors }) => {
        if (errors.length !== 0) {
          setErrors(errors);
          setAnalysis(true);
        }
      })
      .catch((error) => console.log(error));
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
          {/*  */}
          <ul className='category_showing_container'>
            <li className='category_container'>
              <label htmlFor='category'>category</label>
              <input
                id='category'
                name='category'
                type='text'
                value={category}
                onChange={({ target }) => setCategory(target.value)}
              ></input>
            </li>
            <li className='showing_container'>
              <label htmlFor='showing'>showing</label>
              <input
                id='showing'
                name='showing'
                type='checkbox'
                value={showing}
                onChange={({ target }) => setShowing((prev) => !prev)}
              ></input>
            </li>
          </ul>
          {/*  */}
          <div className='new_post_button_container'>
            <button type='button' onClick={body ? analyzeHandler : undefined}>
              analyze
            </button>
            <button disabled={!body && !title} type='submit'>
              submit
            </button>
          </div>
        </form>
      </main>
      {analysis && <Analysis data={{ errors, body, setBody, setAnalysis }} />}
    </>
  );
}

export default NewPost;
