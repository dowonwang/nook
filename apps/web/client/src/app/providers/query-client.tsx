'use client';

import {
  environmentManager,
  QueryClientProvider as Provider,
  QueryClient,
} from '@tanstack/react-query';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (environmentManager.isServer()) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export function QueryClientProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const queryClient = getQueryClient();

  return <Provider client={queryClient}>{children}</Provider>;
}
