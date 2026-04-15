import { registerRequestSchema, type RegisterRequest } from '../dto/requests/register.request';

export function validateRegisterRequest(input: unknown): RegisterRequest {
  return registerRequestSchema.parse(input);
}
