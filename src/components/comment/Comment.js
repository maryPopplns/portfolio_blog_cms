import trashcan from './trashcan.svg';

function Comment({ comment, id, allComments, setAllComments }) {
  function clickHandler() {
    const filteredComments = allComments.filter(({ _id }) => _id !== id);
    setAllComments(filteredComments);
  }
  return (
    <li className='individual_post_comment'>
      <p className='individual_post_comment_body'>{comment}</p>
      <img
        onClick={clickHandler}
        src={trashcan}
        className='remove_individual_post_comment_icon'
        alt='remove_comment_icon'
      />
    </li>
  );
}

export default Comment;
