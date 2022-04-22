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

  test('renders proper visual elements', async () => {
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

    const title = screen.getByLabelText('title');
    const body = screen.getByLabelText('body');
    const analyzeButton = screen.getByRole('button', { name: 'analyze' });
    const saveButton = screen.getByRole('button', { name: 'save' });
    const deleteButton = screen.getByRole('button', { name: 'delete' });
    expect(title).toBeInTheDocument();
    expect(body).toBeInTheDocument();
    expect(analyzeButton).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();

    const titleInput = screen.getByRole('textbox', { name: 'title' });
    userEvent.type(titleInput, ' 1');
    const bodyInput = screen.getByRole('textbox', { name: 'body' });
    userEvent.type(bodyInput, ' 1');

    const titleValue = screen.getByDisplayValue('post title 1');
    const bodyValue = screen.getByDisplayValue('post body 1');

    expect(titleValue).toBeInTheDocument();
    expect(bodyValue).toBeInTheDocument();
  });
});
