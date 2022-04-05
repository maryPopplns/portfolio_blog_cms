import store from '../../store/store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';

import Login from './Login';
import App from '../../app/App';

describe('Login Page', () => {
  test('form contains 2 input elements', () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    const usernameInput = screen.getByTestId('loginPassword');
    const passwordInput = screen.getByTestId('loginUsername');

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
  test('incorrect password yields visual que', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    );

    const usernameInput = screen.getByTestId('loginUsername');
    const passwordInput = screen.getByTestId('loginPassword');

    userEvent.type(usernameInput, 'spencer1');
    userEvent.type(passwordInput, '123');

    const submitButton = screen.getByRole('button', { name: /submit/i });

    userEvent.click(submitButton);

    await waitFor(() => {
      const updatedInput = screen.getByTestId('loginPassword');
      expect(updatedInput).toHaveClass('login_input_error');
    });
  });
  test('correct password grants access', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    );

    const usernameInput = screen.getByTestId('loginUsername');
    const passwordInput = screen.getByTestId('loginPassword');

    userEvent.type(usernameInput, 'spencer');
    userEvent.type(passwordInput, '123');

    const submitButton = screen.getByRole('button', { name: /submit/i });

    userEvent.click(submitButton);

    await waitFor(() => {
      const homepage = screen.getByText(/homepage/i);
      expect(homepage).toBeInTheDocument();
    });
  });
  // TODO test for setting JWT in store
});
