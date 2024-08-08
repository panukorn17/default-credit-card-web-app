// src/App.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders title', () => {
  render(<App />);
  const title = screen.getByText(/Gaussian Mixture Model to Explore Credit Card Default Data/i);
  expect(title).toBeInTheDocument();
});
