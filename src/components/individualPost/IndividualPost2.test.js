import { rest } from 'msw';
import store from '../../store/store';
import { Provider } from 'react-redux';
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';

import App from '../../app/App';
import allPosts from '../testData/allPosts.json';
import loginResponse from '../testData/loginResponse.json';
import grammarData from '../testData/grammarData.json';

const postID = allPosts[2]._id;
const postTitle = allPosts[2].title;

describe('Individual Post', () => {
  const loginSuccessResponse = rest.post(
    'https://whispering-depths-29284.herokuapp.com/user/login',
    (req, res, ctx) => res(ctx.json(loginResponse))
  );
  const editPostResponse = rest.put(
    `https://whispering-depths-29284.herokuapp.com/post/${postID}`,
    (req, res, ctx) => res(ctx.json({ message: 'post has been updated' }))
  );
  const grammarResponse = rest.post(
    'https://whispering-depths-29284.herokuapp.com/grammar',
    (req, res, ctx) => res(ctx.json(grammarData))
  );
  const allPostsResponse = rest.get(
    'https://whispering-depths-29284.herokuapp.com/post',
    (req, res, ctx) => res(ctx.json(allPosts))
  );

  const handlers = [
    loginSuccessResponse,
    editPostResponse,
    grammarResponse,
    allPostsResponse,
  ];

  const server = new setupServer(...handlers);

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('post edits save', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    );
    const usernameInput = screen.getByTestId('login_username');
    const passwordInput = screen.getByTestId('login_password');
    userEvent.type(usernameInput, 'spencer');
    userEvent.type(passwordInput, '123');

    const submitButton = screen.getByRole('button', { name: 'submit' });
    userEvent.click(submitButton);

    let heading;
    await waitFor(() => {
      heading = screen.getByRole('heading', { name: postTitle });
      expect(heading).toBeInTheDocument();
    });
    userEvent.click(heading);

    const saveButton = screen.getByRole('button', { name: 'save' });
    userEvent.click(saveButton);

    await waitFor(() => {
      const allPosts = screen.getByRole('heading', { name: 'all posts' });
      expect(allPosts).toBeInTheDocument();
    });
  });
});
