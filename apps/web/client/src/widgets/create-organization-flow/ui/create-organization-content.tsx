'use client';

import {
  Card,
  CardBody,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@packages/ui/components/card';
import { Separator } from '@packages/ui/components/separator';
import { useT } from 'next-i18next/client';

import { CreateOrganizationForm } from '$features/organization/create';
import { CreateOrganizationInvitationForm } from '$features/organization-invitation/create';
import { OrganizationInvitationSentList } from '$features/organization-invitation/sent-list';

import { WIDGET_CREATE_ORGANIZATION_FLOW_I18N_NAMESPACE } from '../i18n';
import { useCreateOrganizationFlow } from '../model/flow-provider';

export function CreateOrganizationFlowContent() {
  const { t } = useT(WIDGET_CREATE_ORGANIZATION_FLOW_I18N_NAMESPACE);
  const { isOrganizationCreated, setOrganization, organization } =
    useCreateOrganizationFlow();

  return (
    <div className='space-y-6'>
      <Card focus={!isOrganizationCreated} disabled={isOrganizationCreated}>
        <CardHeader>
          <CardTitle>{t('step_1.title')}</CardTitle>

          <CardDescription>{t('step_1.description')}</CardDescription>
        </CardHeader>
        <CardBody>
          <CreateOrganizationForm onSuccess={setOrganization} />
        </CardBody>
      </Card>

      <Card disabled={!isOrganizationCreated} focus={isOrganizationCreated}>
        <CardHeader>
          <CardTitle>{t('step_2.title')}</CardTitle>
          <CardDescription>{t('step_2.description')}</CardDescription>
        </CardHeader>

        <CardBody>
          <CreateOrganizationInvitationForm
            organization={organization}
            disabled={!isOrganizationCreated}
          />
          <Separator className='my-6' />
          <OrganizationInvitationSentList organizationId={organization?.id} />
        </CardBody>
      </Card>
    </div>
  );
}
