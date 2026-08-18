import { z } from 'zod';

export const OrganizationResponseSchemas = {
  create: z.object({
    id: z.uuidv7(),
    title: z.string(),
  }),
  'create-invitation': z.null(),

  'find-sent-invitations': z.array(
    z.object({
      id: z.uuidv7(),
      organizationId: z.uuidv7(),
      invitee: z
        .object({
          id: z.uuidv7(),
          name: z.string(),
          email: z.email(),
        })
        .nullable(),
      role: z.string(),
      status: z.string(),
      expiresAt: z.date(),
    }),
  ),
};
