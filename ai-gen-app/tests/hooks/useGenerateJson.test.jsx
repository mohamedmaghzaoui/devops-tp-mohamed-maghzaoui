import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { expect, test, vi } from 'vitest';
import { useGenerateJson } from '../../src/hooks/useGenerateJson';

// MOCK API
vi.mock('../../src/api/generator.api', () => ({
  generateJson: vi.fn(() =>
    Promise.resolve({
      generated_data: { hello: 'world' },
    })
  ),
}));

const wrapper = ({ children }) => {
  const client = new QueryClient();
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

test('mutation updates cache on success', async () => {
  const { result } = renderHook(() => useGenerateJson(), { wrapper });

  act(() => {
    result.current.mutate({ schema: [], count: 1 });
  });

  await waitFor(() => {
    expect(result.current.isSuccess).toBe(true);
  });
});
