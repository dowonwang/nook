import { PrivateLayout } from '$app/layouts/server';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return <PrivateLayout>{children}</PrivateLayout>;
}
