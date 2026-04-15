import { z } from 'zod';

export const registerRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(['candidate', 'recruiter', 'employer_admin']).default('candidate'),
});

export type RegisterRequest = z.infer<typeof registerRequestSchema>;
