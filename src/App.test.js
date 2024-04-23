import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Graph Test Path Coverage, Home, Tool links', () => {
   render(<App />);
  const linkElement = screen.getByText(/Graph Test Path Coverage/i);
  expect(linkElement).toBeInTheDocument();
  expect(screen.getByText(/Home/)).toBeInTheDocument()
  expect(screen.getByText(/Tool/)).toBeInTheDocument()
});
