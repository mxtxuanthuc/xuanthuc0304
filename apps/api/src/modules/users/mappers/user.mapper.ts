import type { UserEntity } from '../entities/user.entity';
import type { UserResponse } from '../dto/responses/user.response';

export function toUserResponse(user: UserEntity): UserResponse {
  return {
    id: user.id,
    email: user.email,
    role: user.role,
    email_verified: Boolean(user.emailVerifiedAt),
    created_at: user.createdAt.toISOString(),
  };
}
