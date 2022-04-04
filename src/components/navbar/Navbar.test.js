import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';

describe('Navbar', () => {
  test('navbar includes "home" button', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();
  });
  test('navbar includes "new post +" button', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    const newPost = screen.getByRole('link', { name: /new\spost\s\+/i });
    expect(newPost).toBeInTheDocument();
  });
  test('home button routes to homepage', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    fireEvent(
      screen.getByRole('link', { name: /home/i }),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );
    // TODO finish once the homepage is complete
    // expect(homeLink).toBeInTheDocument();
  });
});
