import store from '../../store/store';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';

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
