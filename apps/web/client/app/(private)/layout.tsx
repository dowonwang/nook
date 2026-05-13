import { PrivateLayout } from '$widgets/layouts/private-layout';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return <PrivateLayout>{children}</PrivateLayout>;
}
