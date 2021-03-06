import trashcan from './trashcan.svg';
import { useSelector } from 'react-redux';

function Comment({ comment, id, allComments, setAllComments, postID }) {
  const jwtToken = useSelector((state) => state.jwtToken.value);
  function deleteComment() {
    const filteredComments = allComments.filter(({ _id }) => _id !== id);
    fetch(
      `https://whispering-depths-29284.herokuapp.com/post/comment/${postID}/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    )
      .then((response) => {
        response.status === 200 && setAllComments(filteredComments);
      })
      .catch(() => console.log('error deleting comment'));
  }
  return (
    <li className='individual_post_comment'>
      <p className='individual_post_comment_body'>{comment}</p>
      <img
        onClick={deleteComment}
        src={trashcan}
        className='remove_individual_post_comment_icon'
        alt='remove_comment_icon'
      />
    </li>
  );
}

export default Comment;
