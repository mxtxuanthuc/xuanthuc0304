import { createHash } from 'node:crypto';
import { AppError } from '../../../common/errors/app-error';
import { USERS_ERROR_CODES } from '../constants/users.constants';
import type { CreateUserRequest } from '../dto/requests/create-user.request';
import type { UserCreatedEvent } from '../events/user-created.event';
import { toUserResponse } from '../mappers/user.mapper';
import { UsersRepository } from '../repositories/users.repository';

export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(input: CreateUserRequest) {
    const existingUser = await this.usersRepository.findByEmail(input.email);
    if (existingUser) {
      throw new AppError(USERS_ERROR_CODES.DUPLICATE_EMAIL, 409, 'Email is already in use.');
    }

    const passwordHash = createHash('sha256').update(input.password).digest('hex');
    const user = await this.usersRepository.create(input, passwordHash);

    const event: UserCreatedEvent = {
      name: 'user.created',
      payload: {
        user_id: user.id,
        email: user.email,
        role: user.role,
        occurred_at: new Date().toISOString(),
      },
    };

    return {
      user: toUserResponse(user),
      event,
    };
  }
}
