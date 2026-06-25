import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { test, expect, vi } from 'vitest';
import { Popup } from '../../src/components/popup';

const field = {
  type: 'string',
  required: false,
  defaultValue: '',
  format: '',
  regex: '',
};

test('updates all fields and submits', () => {
  const updateFieldData = vi.fn();

  render(
    <Popup
      field={field}
      hidePopUp={() => {}}
      updateFieldData={updateFieldData}
    />
  );

  fireEvent.change(screen.getByPlaceholderText('Default value'), {
    target: { value: 'hello' },
  });

  fireEvent.change(screen.getByPlaceholderText('Regex validation'), {
    target: { value: '.*' },
  });

  fireEvent.click(screen.getByText('Save Field'));

  expect(updateFieldData).toHaveBeenCalled();
});
