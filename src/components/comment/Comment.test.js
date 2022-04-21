import { rest } from 'msw';
import store from '../../store/store';
import { Provider } from 'react-redux';
import { setupServer } from 'msw/node';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Comment from './Comment';
import allPosts from './allPosts.json';

const postID = allPosts[2]._id;
const allComments = allPosts[2].comments;
const commentID = allPosts[2].comments[0]._id;
const comment = allPosts[2].comments[0].comment;

describe('Login Page', () => {
  const deleteComment = rest.delete(
    `https://whispering-depths-29284.herokuapp.com/post/comment/${postID}/${commentID}`,
    (req, res, ctx) => {
      // 200 response
      return res.once(ctx.json({ message: 'comment has been deleted' }));
    }
  );

  const server = new setupServer(deleteComment);

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  const setAllComments = jest.fn();

  const setup = () => {
    render(
      <Provider store={store}>
        <Comment
          comment={comment}
          id={commentID}
          postID={postID}
          setAllComments={setAllComments}
          allComments={allComments}
        />
      </Provider>
    );
  };

  test('renders comment text', () => {
    setup();
    const commentText = screen.getByText(comment);
    expect(commentText).toBeInTheDocument();
  });
  test('deleting comment calls setAllComments upon 200 response', async () => {
    setup();
    fireEvent(
      screen.getByAltText('remove_comment_icon'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );

    await waitFor(() => {
      expect(setAllComments).toBeCalled();
    });
  });
});
