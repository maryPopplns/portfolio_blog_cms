import { rest } from 'msw';
import store from '../../store/store';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import allPosts from '../testData/allPosts.json';
import data from '../testData/grammarData.json';
import Navbar from '../navbar/Navbar';
import Homepage from '../homepage/Homepage';
import NewPost from './NewPost';

describe('NewPost', () => {
  const analyzeResponse = rest.post(
    'https://whispering-depths-29284.herokuapp.com/grammar',
    (req, res, ctx) => {
      return res(ctx.json(data));
    }
  );
  const submitResponse = rest.post(
    'https://whispering-depths-29284.herokuapp.com/post',
    (req, res, ctx) => {
      return res(ctx.json({ message: 'post created' }));
    }
  );
  const allPostsResponse = rest.get(
    'https://whispering-depths-29284.herokuapp.com/post',
    (req, res, ctx) => {
      return res(ctx.json(allPosts));
    }
  );
  const handlers = [analyzeResponse, submitResponse, allPostsResponse];

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
  test('submit routes to homepage', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/new']}>
          <Routes>
            <Route path='/' element={<Navbar />}>
              <Route index element={<Homepage />} />
              <Route path='new' element={<NewPost />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByRole('textbox', { name: 'title' }), {
      target: { value: 'title of the new post' },
    });
    fireEvent.change(screen.getByRole('textbox', { name: 'body' }), {
      target: { value: 'body of the new post' },
    });

    fireEvent(
      screen.getByRole('button', { name: 'submit' }),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );
    await waitFor(() => {
      const heading = screen.getByRole('heading', { name: 'all posts' });
      expect(heading).toBeInTheDocument();
    });
  });
});
