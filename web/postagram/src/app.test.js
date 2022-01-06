import { render, screen } from '@testing-library/react';
import App from './app';

test('renders not authed', () => {
  render(<App />);
  const element = screen.getByText(/not-authed/i);
  expect(element).toBeInTheDocument();
});
