import {
  HeroSection,
  HeroSectionDescription,
  HeroSectionTitle,
} from '@packages/ui/components/hero-section';
import { Separator } from '@packages/ui/components/separator';

import type { SearchParams } from '$shared/types';

interface Props {
  searchParams: Promise<SearchParams>;
}

export function OrganizationSentInvitationPage(props: Props) {
  console.log(props);

  // const queryClient = new QueryClient();
  // const pagination = await getOffsetPaginationQuery(searchParams);

  return (
    <>
      <HeroSection className='mb-page'>
        <HeroSectionTitle>보낸 초대 목록</HeroSectionTitle>
        <HeroSectionDescription>보낸 초대 목록입니다.</HeroSectionDescription>
      </HeroSection>

      <Separator className='mb-page' />
    </>
  );
}
