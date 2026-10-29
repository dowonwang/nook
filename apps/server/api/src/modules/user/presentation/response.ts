import { z } from 'zod';

export const UserResponseSchemas = {
  me: z.object({
    id: z.uuidv7(),
    email: z.email(),
    name: z.string(),
  }),

  'get-user': z.object({
    id: z.uuidv7(),
    email: z.email(),
    name: z.string(),
  }),
};
