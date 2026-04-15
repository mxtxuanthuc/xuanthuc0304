import type { CreateUserRequest } from '../dto/requests/create-user.request';
import { createUserRequestSchema } from '../dto/requests/create-user.request';

export function validateCreateUserRequest(input: unknown): CreateUserRequest {
  return createUserRequestSchema.parse(input);
}
