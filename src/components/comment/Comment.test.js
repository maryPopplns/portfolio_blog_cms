import { rest } from 'msw';
import store from '../../store/store';
import { Provider } from 'react-redux';
import { setupServer } from 'msw/node';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import Comment from './Comment';
import allPosts from './allPosts.json';

const postID = allPosts[2]._id;
const commentID = allPosts[2].comments[0]._id;

// describe('Login Page', () => {
//   const deleteComment = rest.delete(
//     `https://whispering-depths-29284.herokuapp.com/post/comment/${postID}/${commentID}`,
//     (req, res, ctx) => {
//       return res(ctx.json({ message: 'comment has been deleted' }));
//     }
//   );

//   const server = new setupServer(deleteComment);

//   beforeAll(() => server.listen());
//   afterEach(() => server.resetHandlers());
//   afterAll(() => server.close());
//   const setup = () => {
//     render(
//       <Provider store={store}>
//         <Comment />
//       </Provider>
//     );
//   };

//   test('form contains 2 input elements', () => {
//     setup();
//   });
// });
