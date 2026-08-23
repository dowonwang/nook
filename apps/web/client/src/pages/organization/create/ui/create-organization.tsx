import {
  HeroSection,
  HeroSectionDescription,
  HeroSectionTitle,
} from '@packages/ui/components/hero-section';

import { CreateOrganizationFlow } from '$widgets/create-organization-flow';

export function CreateOrganizationPage() {
  return (
    <>
      <HeroSection className='mb-6'>
        <HeroSectionTitle>Create Organization</HeroSectionTitle>
        <HeroSectionDescription>
          Create Organization and add members
        </HeroSectionDescription>
      </HeroSection>

      <CreateOrganizationFlow />
    </>
  );
}
