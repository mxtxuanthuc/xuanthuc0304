import { z } from 'zod';

export const createUserRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(['candidate', 'recruiter', 'employer_admin', 'moderator', 'admin', 'super_admin']).default('candidate'),
});

export type CreateUserRequest = z.infer<typeof createUserRequestSchema>;
