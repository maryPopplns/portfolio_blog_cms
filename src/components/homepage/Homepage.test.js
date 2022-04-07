import store from '../../store/store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';

import Homepage from './Homepage';

describe('Homepage', () => {
  test('renders homepage', () => {
    render(
      <Provider store={store}>
        <Homepage />
      </Provider>
    );
    const heading = screen.getByRole('heading', { name: /all\sposts/i });
    expect(heading).toBeInTheDocument();
  });
});
