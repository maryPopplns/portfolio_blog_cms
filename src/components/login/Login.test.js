import { rest } from 'msw';
import store from '../../store/store';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';

import loginResponse from '../testData/loginResponse.json';
import mockData from '../testData/allPosts.json';
import Login from './Login';
import App from '../../app/App';

describe('Login Page', () => {
  const loginSuccessResponse = rest.post(
    'https://whispering-depths-29284.herokuapp.com/user/login',
    (req, res, ctx) => {
      // parse req.body
      const { username, password } = req.body
        .split('&')
        .reduce((object, input) => {
          const [key, value] = input.split('=');
          object[key] = value;
          return object;
        }, {});
      const isCorrectUser = username === 'spencer';
      const isCorrectPassword = password === '123';
      const isAuthenticated = isCorrectUser && isCorrectPassword;
      if (isAuthenticated) {
        return res(ctx.json(loginResponse));
      } else {
        return res(ctx.status(401));
      }
    }
  );
  const allPostsResponse = rest.get(
    'https://whispering-depths-29284.herokuapp.com/post',
    (req, res, ctx) => {
      return res(ctx.json(mockData));
    }
  );
  const handlers = [loginSuccessResponse, allPostsResponse];

  const server = new setupServer(...handlers);

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('form contains 2 input elements', () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    const usernameInput = screen.getByTestId('login_password');
    const passwordInput = screen.getByTestId('login_username');

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });
  test('form contains submit button', () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    const submitButton = screen.getByRole('button', { name: /submit/i });

    expect(submitButton).toBeInTheDocument();
  });
  test('incorrect password yields visual que/goes away after 2 seconds', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    );

    const usernameInput = screen.getByTestId('login_username');
    const passwordInput = screen.getByTestId('login_password');

    userEvent.type(usernameInput, 'spencer1');
    userEvent.type(passwordInput, '123');

    const submitButton = screen.getByRole('button', { name: /submit/i });

    userEvent.click(submitButton);

    await waitFor(
      () => {
        const updatedInput = screen.getByTestId('login_password');
        expect(updatedInput).toHaveClass('login_input_error');
      },
      { timeout: 1000 }
    );
    await waitFor(
      () => {
        const updatedInput = screen.getByTestId('login_password');
        expect(updatedInput).not.toHaveClass('login_input_error');
      },
      { timeout: 3000 }
    );
  });
  test('superUser grants access', async () => {
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

    const submitButton = screen.getByRole('button', { name: /submit/i });

    userEvent.click(submitButton);
    await waitFor(
      () => {
        const heading = screen.getByRole('heading', { name: 'all posts' });
        expect(heading).toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  });
});
