'use client';

import { Button } from '@packages/ui/components/button';
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
} from '@packages/ui/components/card';
import { Separator } from '@packages/ui/components/separator';
import { useQuery } from '@tanstack/react-query';

import { OrganizationMemberRoleBadge } from '$entities/organization-member/ui/role-badge';

import { myOrganizationListQueryOptions } from '../model/my-list-query';

export function MyOrganizationList() {
  const { data: organizations } = useQuery(myOrganizationListQueryOptions);

  return (
    <div className='grid grid-cols-3 gap-4'>
      {organizations?.map((organization) => (
        <Card key={organization.id}>
          <CardHeader className='flex items-center justify-between'>
            <CardTitle>{organization.title}</CardTitle>
            <OrganizationMemberRoleBadge role={organization.userRole} />
          </CardHeader>

          <CardBody>
            <p>멤버 수: {organization.memberCount}</p>

            <Separator className='my-4' />

            <Button size='small' className='ml-auto block'>
              더보기
            </Button>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
