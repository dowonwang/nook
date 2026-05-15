import { Footer } from '$widgets/footer';
import { PrivateHeader } from '$widgets/private-header';
import { Sidebar } from '$widgets/sidebar';

interface Props {
  children: React.ReactNode;
}

export function PrivateLayout({ children }: Props) {
  return (
    <div id='root' className='flex min-h-dvh'>
      <Sidebar />
      <div className='flex min-w-0 flex-1 flex-col'>
        <PrivateHeader />
        <main className='flex-1 p-4 md:p-6 lg:p-8'>{children}</main>
        <Footer />
      </div>
    </div>
  );
}
