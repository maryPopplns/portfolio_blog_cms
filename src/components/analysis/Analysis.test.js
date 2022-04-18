import { render, screen, fireEvent } from '@testing-library/react';

import Analysis from './Analysis';
import data from '../testData.json';

describe('Analysis', () => {
  const { errors1, errors2, body1, body2 } = data;
  const setBody = jest.fn();
  const setAnalysis = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders save/cancel buttons', () => {
    render(
      <Analysis data={{ errors: errors1, body: body1, setBody, setAnalysis }} />
    );

    const save = screen.getByRole('button', { name: 'save' });
    const cancel = screen.getByRole('button', { name: 'cancel' });
    expect(save).toBeInTheDocument();
    expect(cancel).toBeInTheDocument();
  });

  test('clicking cancel triggers "setAnalysis', () => {
    render(
      <Analysis data={{ errors: errors1, body: body1, setBody, setAnalysis }} />
    );

    fireEvent(
      screen.getByRole('button', { name: 'cancel' }),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );
    expect(setAnalysis).toHaveBeenCalled();
  });
  test('clicking save triggers "setAnalysis" and "setBody"', () => {
    render(
      <Analysis data={{ errors: errors2, body: body2, setBody, setAnalysis }} />
    );

    fireEvent(
      screen.getByRole('button', { name: 'save' }),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(setAnalysis).toHaveBeenCalled();
    expect(setBody).toHaveBeenCalled();
  });
});
