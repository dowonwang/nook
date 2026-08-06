'use client';

import {
  Card,
  CardBody,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@packages/ui/components/card';

import { CreateOrganizationForm } from '$features/organization/create';

import { useCreateOrganizationFlow } from '../model/flow-provider';

export function CreateOrganizationFlowContent() {
  const { isOrganizationCreated, organization, setOrganization } =
    useCreateOrganizationFlow();

  console.log(isOrganizationCreated, organization);
  return (
    <div className='space-y-6'>
      <Card focus={!isOrganizationCreated} disabled={isOrganizationCreated}>
        <CardHeader>
          <CardTitle>Step1: Create Organization</CardTitle>

          <CardDescription>
            {isOrganizationCreated
              ? 'Organization create success!'
              : 'Create Organization'}
          </CardDescription>
        </CardHeader>
        <CardBody>
          <CreateOrganizationForm onSuccess={setOrganization} />
        </CardBody>
      </Card>

      <Card disabled={!isOrganizationCreated} focus={isOrganizationCreated}>
        <CardHeader>
          <CardTitle>Step2: Add Organization Members</CardTitle>
          <CardDescription>
            {isOrganizationCreated
              ? 'Please add members'
              : 'Must create organization'}
          </CardDescription>
        </CardHeader>

        <CardBody>member form</CardBody>
      </Card>
    </div>
  );
}
