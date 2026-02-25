import { z } from 'zod';

export const createUserSchema = z.object({
  profilePicture: z.string().url().optional(),
  name: z.string().optional(),
  lastName: z.string().optional(),
  username: z.string().min(4).max(20),
  email: z.string().email().optional(),
  password: z.string().min(6),
});

export type CreateUserDTO = z.infer<typeof createUserSchema>;
