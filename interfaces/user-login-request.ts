import * as z from 'zod';

export const UserRequestSchema = z.object({
  username: z.union([z.string(), z.number()]),
  password: z.union([z.string(), z.number()])
});

export type UserRequest = z.infer<typeof UserRequestSchema>;