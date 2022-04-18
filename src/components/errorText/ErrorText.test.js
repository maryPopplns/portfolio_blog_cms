import store from '../../store/store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';

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
  test('clicking text renders better choices', () => {
    const error = {
      id: 'e1242242292',
      offset: 2,
      length: 2,
      description: {
        en: 'Did you mean “am” or “will be”?',
      },
      bad: 'is',
      better: ['am', 'will be'],
      type: 'grammar',
    };

    const { bad, better } = error;
    render(<ErrorText data={{ better, text: bad }} />);

    fireEvent(
      screen.getByText('is'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );

    const suggestion1 = screen.getByText('am');
    const suggestion2 = screen.getByText('will be');
    expect(suggestion1).toBeInTheDocument();
    expect(suggestion2).toBeInTheDocument();
  });
  test('clicking suggestion changes text', () => {
    const error = {
      id: 'e1242242292',
      offset: 2,
      length: 2,
      description: {
        en: 'Did you mean “am” or “will be”?',
      },
      bad: 'is',
      better: ['am', 'will be'],
      type: 'grammar',
    };

    const { bad, better } = error;
    render(<ErrorText data={{ better, text: bad }} />);

    fireEvent(
      screen.getByText('is'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );
    // click suggestion
    fireEvent(
      screen.getByText('am'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );

    const changedText = screen.getAllByText('am');
    expect(changedText.length).toBe(2);
  });
});
