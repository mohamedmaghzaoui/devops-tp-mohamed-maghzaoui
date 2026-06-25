import { renderHook, waitFor } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { useGenerations } from '../../src/hooks/useGenerations';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// MOCK API
vi.mock('../../src/api/generator.api', () => ({
  fetchGenerations: vi.fn(() => Promise.resolve([{ id: 1 }])),
}));

const wrapper = ({ children }) => {
  const client = new QueryClient();
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

test('fetch generations success', async () => {
  const { result } = renderHook(() => useGenerations(), { wrapper });

  await waitFor(() => {
    expect(result.current.isSuccess).toBe(true);
  });
});
