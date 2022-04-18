import store from '../../store/store';
import { Provider } from 'react-redux';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import data from '../testData.json';
import NewPost from './NewPost';

describe('NewPost', () => {
  const analyzeResponse = rest.post(
    'https://whispering-depths-29284.herokuapp.com/grammar',
    (req, res, ctx) => {
      return res(ctx.json(data));
    }
  );
  const submitResponse = rest.post(
    'https://whispering-depths-29284.herokuapp.com/grammar',
    (req, res, ctx) => {
      return res({ message: 'post created' });
    }
  );
  const handlers = [analyzeResponse, submitResponse];

  const server = new setupServer(...handlers);

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('renders proper visual elements', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <NewPost />
        </MemoryRouter>
      </Provider>
    );

    const header = screen.getByRole('heading', { name: 'new post' });
    const title = screen.getByLabelText('title');
    const body = screen.getByLabelText('body');
    const analyzeButton = screen.getByRole('button', { name: 'analyze' });
    const submitButton = screen.getByRole('button', { name: 'submit' });

    expect(header).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(body).toBeInTheDocument();
    expect(analyzeButton).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
  test('analyze renders analyze component', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <NewPost />
        </MemoryRouter>
      </Provider>
    );

    // write in textbox
    fireEvent.change(screen.getByRole('textbox', { name: 'body' }), {
      target: { value: 'body of the new post' },
    });

    fireEvent(
      screen.getByRole('button', { name: 'analyze' }),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );

    await waitFor(
      () => {
        const save = screen.getByRole('button', { name: 'save' });
        expect(save).toBeInTheDocument();
      },
      { timeout: 10000 }
    );
  });
});
