import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App component', () => {
  it('renders without crashing', () => {
    render(<App />);
      expect(screen.getByRole('link', { name: /All Crypto/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /Favourites/i })).toBeInTheDocument();
  });
});