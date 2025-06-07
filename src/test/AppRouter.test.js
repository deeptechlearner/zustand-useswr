import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppRouter from '../AppRouter';

describe('AppRouter component', () => {
  it('renders navigation links', () => {
    render(
      <MemoryRouter>
        <AppRouter />
      </MemoryRouter>
    );
    expect(screen.getByRole('link', { name: /All Crypto/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Favourites/i })).toBeInTheDocument();
  });

  it('renders AllCrypto page by default (route "/")', () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AppRouter />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /All Crypto/i })).toBeInTheDocument();
  });

  it('renders FavCrypto page for /favourites route', () => {
    render(
      <MemoryRouter initialEntries={["/favourites"]}>
        <AppRouter />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /Fav Crypto/i })).toBeInTheDocument();
  });
});
