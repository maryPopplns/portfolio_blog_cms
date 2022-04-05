import store from '../../store/store';
import { Provider } from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';

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
});
