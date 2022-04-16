import store from '../../store/store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import ErrorText from './ErrorText';

describe('Error Text', () => {
  test('renders the title of the post', () => {
    const error = {
      id: 'e1636898912',
      offset: 0,
      length: 1,
      description: {
        en: 'The personal pronoun “I” should be uppercase.',
      },
      bad: 'i',
      better: ['I'],
      type: 'spelling',
    };

    const { bad, better } = error;
    render(<ErrorText data={{ better, text: bad }} />);

    const text = screen.getByText('i');
    expect(text).toBeInTheDocument();
  });
});
