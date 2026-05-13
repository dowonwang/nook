import { z } from 'zod';

export const OrganizationResponseSchemas = {
  create: z.object({
    message: z.string(),
  }),
  addMembers: z.object({
    message: z.string(),
  }),
};
