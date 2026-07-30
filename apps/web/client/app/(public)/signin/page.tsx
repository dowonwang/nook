import { SignInPage } from '$pages/sign-in';
import { APP_CONSTANT } from '$shared/config';

export default async function Page({ searchParams }: PageProps<'/signin'>) {
  const data = await searchParams;
  const redirectTo = data[APP_CONSTANT.redirectQueryKey];

  return <SignInPage redirectTo={redirectTo} />;
}
