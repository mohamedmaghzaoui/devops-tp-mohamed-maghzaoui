import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { test, expect, vi, beforeEach } from 'vitest';
import { Form } from '../../src/components/form';

const mutateMock = vi.fn();

vi.mock('../../src/hooks/useGenerateJson', () => ({
  useGenerateJson: () => ({
    mutate: mutateMock,
    isPending: false,
  }),
}));

beforeEach(() => {
  mutateMock.mockClear();
});

test('Form - add and delete field works correctly', () => {
  render(<Form />);

  const initialInputs = screen.getAllByPlaceholderText('field name');
  expect(initialInputs).toHaveLength(1);

  fireEvent.click(screen.getByText('+ Add Root Field'));

  let inputs = screen.getAllByPlaceholderText('field name');
  expect(inputs.length).toBe(2);

  fireEvent.click(screen.getByText('+ Add Root Field'));

  inputs = screen.getAllByPlaceholderText('field name');
  expect(inputs.length).toBe(3);

  const deleteButtons = screen.getAllByText('🗑');
  fireEvent.click(deleteButtons[0]);

  const inputsAfterDelete = screen.getAllByPlaceholderText('field name');
  expect(inputsAfterDelete.length).toBeLessThan(3);
});
