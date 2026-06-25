import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { test, expect, vi } from 'vitest';
import App from '../../src/App';
import { renderWithClient } from '../test-utils';

vi.mock('../../src/assets/Try our AiGen.png', () => ({
  default: 'test-image.png',
}));

vi.mock('../../src/components/form', () => ({
  Form: () => <div data-testid="form">Form Mock</div>,
}));

vi.mock('../../src/components/data', () => ({
  Data: () => <div data-testid="data">Data Mock</div>,
}));

test('renders App layout correctly', () => {
  renderWithClient(<App />);

  expect(
    screen.getByText(/Design Your Data, Powered by AI/i)
  ).toBeInTheDocument();

  expect(screen.getByAltText('Try our AiGen')).toBeInTheDocument();

  expect(screen.getByTestId('form')).toBeInTheDocument();
  expect(screen.getByTestId('data')).toBeInTheDocument();
});
