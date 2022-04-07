import store from '../../store/store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import Post from './Post';

describe('Post', () => {
  test('renders the title of the post', () => {
    const post = {
      _id: '624e3b2f1c2d910e04309e28',
      title: 'blog post 1',
      body: 'the body of the post',
      likes: 0,
      comments: [],
      date: '2022-04-07T01:15:27.714Z',
      __v: 0,
    };
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Post data={post} />
        </MemoryRouter>
      </Provider>
    );
    const heading = screen.getByRole('heading', { name: /blog\spost\s1/i });
    expect(heading).toBeInTheDocument();
  });
});
