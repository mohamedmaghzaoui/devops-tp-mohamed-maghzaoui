import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { test, expect, vi } from 'vitest';
import { Data } from '../../src/components/data';
import { renderWithClient } from '../test-utils';

vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual('@tanstack/react-query');

  return {
    ...actual,
    useQuery: (opts) => {
      if (opts.queryKey[0] === 'loading') {
        return { data: false };
      }

      if (opts.queryKey[0] === 'generated-json') {
        return {
          data: {
            generated_data: {
              name: 'john',
              age: 25,
              active: true,
              tags: ['a', 'b'],
              nested: {
                city: 'Paris',
              },
            },
          },
        };
      }

      return { data: null };
    },
  };
});

test('Data - renders title', () => {
  renderWithClient(<Data />);

  expect(screen.getByText(/JSON/i)).toBeInTheDocument();
});

test('Data - renders generated JSON structure', () => {
  renderWithClient(<Data />);

  expect(screen.getByText(/"name"/i)).toBeInTheDocument();
  expect(screen.getByText(/"john"/i)).toBeInTheDocument();

  // bool / number
  expect(screen.getByText(/25/)).toBeInTheDocument();
  expect(screen.getByText(/true/)).toBeInTheDocument();

  // array + nested object
  expect(screen.getByText(/"tags"/i)).toBeInTheDocument();
  expect(screen.getByText(/"nested"/i)).toBeInTheDocument();
});
