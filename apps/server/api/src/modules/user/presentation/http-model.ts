import { z } from 'zod';

export const UserHttpModel = {
  'get-user': z.object({
    email: z.string().trim().toLowerCase().pipe(z.email()),
  }),
};

export type UserHttpModel = {
  [K in keyof typeof UserHttpModel]: z.infer<(typeof UserHttpModel)[K]>;
};
