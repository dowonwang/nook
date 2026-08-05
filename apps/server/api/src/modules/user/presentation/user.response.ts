import { z } from 'zod';

export const UserResponseSchema = {
  me: z.object({
    id: z.uuidv7(),
    email: z.email(),
    name: z.string(),
  }),
};
