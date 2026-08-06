import { z } from 'zod';

export const OrganizationResponseSchemas = {
  create: z.object({
    id: z.uuidv7(),
    title: z.string(),
  }),
  addMembers: z.object({
    message: z.string(),
  }),
};
