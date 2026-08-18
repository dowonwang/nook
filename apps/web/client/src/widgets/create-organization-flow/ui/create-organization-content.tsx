'use client';

import {
  Card,
  CardBody,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@packages/ui/components/card';
import { Separator } from '@packages/ui/components/separator';

import { CreateOrganizationForm } from '$features/organization/create';
import { CreateOrganizationInvitationForm } from '$features/organization/create-invitation';

import { useCreateOrganizationFlow } from '../model/flow-provider';

export function CreateOrganizationFlowContent() {
  const { isOrganizationCreated, setOrganization, organization } =
    useCreateOrganizationFlow();

  return (
    <div className='space-y-6'>
      <Card focus={!isOrganizationCreated} disabled={isOrganizationCreated}>
        <CardHeader>
          <CardTitle>Step1: Create Organization</CardTitle>

          <CardDescription>'Create Organization</CardDescription>
        </CardHeader>
        <CardBody>
          <CreateOrganizationForm onSuccess={setOrganization} />
        </CardBody>
      </Card>

      <Card disabled={!isOrganizationCreated} focus={isOrganizationCreated}>
        <CardHeader>
          <CardTitle>Step2: Add Organization Members</CardTitle>
          <CardDescription>'Please invite members'</CardDescription>
        </CardHeader>

        <CardBody>
          <CreateOrganizationInvitationForm
            organization={organization}
            disabled={!isOrganizationCreated}
          />
          <Separator className='my-6' />
          여기는 리스트
        </CardBody>
      </Card>
    </div>
  );
}
