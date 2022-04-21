import './individualPost.css';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Analysis from '../analysis/Analysis';
import urlencoded from '../../helpers/urlencoded';
import { useNavigate, useParams } from 'react-router-dom';
import Comment from '../comment/Comment';

function IndividualPost() {
  const [body, setBody] = useState('');
  const [title, setTitle] = useState('');
  const [errors, setErrors] = useState([{}]);
  const [analysisModal, setAnalysisModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [allComments, setAllComments] = useState([]);
  const posts = useSelector((state) => state.posts.value);
  const jwtToken = useSelector((state) => state.jwtToken.value);
  let navigate = useNavigate();
  let { postID } = useParams();
  const {
    title: postTitle,
    body: postBody,
    comments,
  } = posts.filter((post) => post._id === postID)[0];

  useEffect(() => {
    setAllComments(comments);
    setBody(postBody);
    setTitle(postTitle);
  }, [postTitle, postBody, comments]);

  const commentComponents = allComments.map(({ comment, _id }) => {
    return (
      <Comment
        comment={comment}
        key={_id}
        id={_id}
        postID={postID}
        allComments={allComments}
        setAllComments={setAllComments}
      />
    );
  });

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
        if (errors.length !== 0) {
          setErrors(errors);
          setAnalysisModal(true);
        }
      })
      .catch((error) => console.log(error));
  }

  function deleteHandler(event) {
    event.preventDefault();
    fetch(`https://whispering-depths-29284.herokuapp.com/post/${postID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${jwtToken}`,
      },
      body: postBody,
    })
      .then((result) => navigate('/'))
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
            <button
              className='delete_post_buton'
              onClick={(event) => {
                event.preventDefault();
                setDeleteModal(true);
              }}
            >
              delete
            </button>
          </div>
        </form>
        <ul className='comments_container'>{commentComponents}</ul>
      </main>
      {analysisModal && (
        <Analysis
          data={{ errors, body, setBody, setAnalysis: setAnalysisModal }}
        />
      )}
      {deleteModal && (
        <div className='delete_modal'>
          <h2>Delete?</h2>
          <div>
            <button onClick={deleteHandler}>delete</button>
            <button
              onClick={(event) => {
                event.preventDefault();
                setDeleteModal(false);
              }}
            >
              cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default IndividualPost;
