import { Footer } from '$widgets/footer';
import { PublicHeader } from '$widgets/public-header';

interface Props {
  children: React.ReactNode;
}

export function PublicLayout({ children }: Props) {
  return (
    <div id='root' className='flex min-h-dvh flex-col'>
      <PublicHeader />
      <main className='container mx-auto flex-1 p-6'>{children}</main>
      <Footer />
    </div>
  );
}
