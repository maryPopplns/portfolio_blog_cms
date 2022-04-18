import store from '../../store/store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';

import Analysis from './Analysis';
import data from '../testData.json';

describe('Analysis', () => {
  const errors = data.errors;
  const body = data.body;
  const setBody = jest.fn();
  const setAnalysis = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders save/cancel buttons', () => {
    render(<Analysis data={{ errors, body, setBody, setAnalysis }} />);

    const save = screen.getByRole('button', { name: 'save' });
    expect(save).toBeInTheDocument();
  });
});
