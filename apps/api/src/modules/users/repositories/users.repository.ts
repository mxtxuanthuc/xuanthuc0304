import { randomUUID } from 'node:crypto';
import type { CreateUserRequest } from '../dto/requests/create-user.request';
import type { UserEntity } from '../entities/user.entity';

export class UsersRepository {
  private readonly users = new Map<string, UserEntity>();

  async create(input: CreateUserRequest, passwordHash: string): Promise<UserEntity> {
    const now = new Date();
    const user: UserEntity = {
      id: randomUUID(),
      email: input.email.toLowerCase(),
      passwordHash,
      role: input.role,
      emailVerifiedAt: null,
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
    };

    this.users.set(user.id, user);
    return user;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    for (const user of this.users.values()) {
      if (user.email === email.toLowerCase() && !user.deletedAt) {
        return user;
      }
    }

    return null;
  }
}
