import { rest } from 'msw';
import store from '../../store/store';
import { Provider } from 'react-redux';
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';

import App from '../../app/App';
import allPosts from '../testData/allPosts.json';
import loginResponse from '../loginResponse.json';
import grammarData from '../testData/grammarData.json';

const postID = allPosts[2]._id;
const postTitle = allPosts[2].title;
// const allComments = allPosts[2].comments;
// const commentID = allPosts[2].comments[0]._id;
const postComment = allPosts[2].comments[0].comment;

describe('Login Page', () => {
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

  async function loginAndClickPost() {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    );

    const usernameInput = screen.getByTestId('loginPassword');
    const passwordInput = screen.getByTestId('loginUsername');

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
  }

  test('renders proper visual elements', async () => {
    await loginAndClickPost();

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
  });
  test.skip('analyze renders "analyze" modal', async () => {
    await loginAndClickPost();

    // write in textbox
    // fireEvent.change(screen.getByRole('textbox', { name: 'body' }), {
    //   target: { value: 'body of the new post' },
    // });

    // fireEvent(
    //   screen.getByRole('button', { name: 'analyze' }),
    //   new MouseEvent('click', {
    //     bubbles: true,
    //     cancelable: true,
    //   })
    // );

    // await waitFor(
    //   () => {
    //     const save = screen.getByRole('button', { name: 'save' });
    //     expect(save).toBeInTheDocument();
    //   },
    //   { timeout: 10000 }
    // );
  });
});
