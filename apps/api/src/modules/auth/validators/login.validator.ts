import { loginRequestSchema, type LoginRequest } from '../dto/requests/login.request';

export function validateLoginRequest(input: unknown): LoginRequest {
  return loginRequestSchema.parse(input);
}
