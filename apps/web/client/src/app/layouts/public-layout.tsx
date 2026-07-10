import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { serverSessionQueryOptions } from '$entities/session/index.server';
import { Footer } from '$widgets/footer';
import { PublicHeader } from '$widgets/public-header';

interface Props {
  children: React.ReactNode;
}

export async function PublicLayout({ children }: Props) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(serverSessionQueryOptions);

  return (
    <div id='root' className='flex min-h-dvh flex-col'>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PublicHeader />
      </HydrationBoundary>
      <main className='container mx-auto flex flex-1 flex-col p-6'>
        {children}
      </main>
      <Footer />
    </div>
  );
}
