import './individualPost.css';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Analysis from '../analysis/Analysis';
import { useNavigate, useParams } from 'react-router-dom';
import urlencoded from '../../helpers/urlencoded';

function IndividualPost() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState([{}]);
  const [analysis, setAnalysis] = useState(false);
  const jwtToken = useSelector((state) => state.jwtToken.value);
  const posts = useSelector((state) => state.posts.value);
  let navigate = useNavigate();
  let { postID } = useParams();

  useEffect(() => {
    const { title, body, comments } = posts.filter(
      (post) => post._id === postID
    )[0];
    setTitle(title);
    setBody(body);
  }, [posts, postID]);

  function formHandler(event) {
    event.preventDefault();
    const newPost = urlencoded({ title, body });
    fetch(`https://whispering-depths-29284.herokuapp.com/post/${postID}`, {
      method: 'PUT',
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
        setAnalysis(true);
        setErrors(errors);
      })
      .catch((error) => console.log(error));
  }

  return (
    <>
      <main className='individual_post'>
        <form onSubmit={formHandler}>
          <div className='individual_post_input_container'>
            <label htmlFor='individual_post_title'>title</label>
            <input
              type='text'
              id='individual_post_title'
              name='individual_post_title'
              required
              value={title}
              spellCheck='true'
              onChange={({ target }) => setTitle(target.value)}
            ></input>
          </div>
          <div className='individual_post_input_container'>
            <label htmlFor='individual_post_body'>body</label>
            <textarea
              type='textarea'
              id='individual_post_body'
              name='individual_post_body'
              required
              value={body}
              spellCheck='true'
              onChange={({ target }) => setBody(target.value)}
            ></textarea>
          </div>
          <div className='individual_post_button_container'>
            <button type='button' onClick={body ? analyzeHandler : undefined}>
              analyze
            </button>
            <button disabled={!body && !title} type='submit'>
              save
            </button>
          </div>
        </form>
      </main>
      {analysis && <Analysis data={{ errors, body, setBody, setAnalysis }} />}
    </>
  );
}

export default IndividualPost;
