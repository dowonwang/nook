import { z } from 'zod';

export const OrganizationHttpModel = {
  create: z.object({
    title: z.string().min(1).max(20),
  }),

  'create-invitation': z.object({
    email: z.email(),
    role: z.enum(['ADMIN', 'MAINTAINER', 'MEMBER']),
  }),
};

export type OrganizationHttpModel = {
  [K in keyof typeof OrganizationHttpModel]: z.infer<
    (typeof OrganizationHttpModel)[K]
  >;
};
