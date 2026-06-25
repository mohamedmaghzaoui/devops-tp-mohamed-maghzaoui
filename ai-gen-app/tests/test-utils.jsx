import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

export const renderWithClient = (ui) => {
  const client = createTestQueryClient();

  return render(
    <QueryClientProvider client={client}>{ui}</QueryClientProvider>
  );
};
