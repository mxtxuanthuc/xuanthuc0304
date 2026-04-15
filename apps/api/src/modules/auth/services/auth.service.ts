import { createHash, randomBytes } from 'node:crypto';
import { AppError } from '../../../common/errors/app-error';
import { UsersRepository } from '../../users/repositories/users.repository';
import { UsersService } from '../../users/services/users.service';
import { ACCESS_TOKEN_TTL_SECONDS, AUTH_ERROR_CODES, REFRESH_TOKEN_TTL_DAYS } from '../constants/auth.constants';
import type { AuthLoggedInEvent } from '../events/auth-logged-in.event';
import { toAuthTokensResponse } from '../mappers/auth.mapper';
import { SessionsRepository } from '../repositories/sessions.repository';
import type { LoginRequest } from '../dto/requests/login.request';
import type { RegisterRequest } from '../dto/requests/register.request';

export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly usersRepository: UsersRepository,
    private readonly sessionsRepository: SessionsRepository,
  ) {}

  async register(input: RegisterRequest) {
    const created = await this.usersService.createUser(input);
    const tokens = await this.issueTokens(created.user.id);
    return {
      user: created.user,
      tokens,
      events: [created.event],
    };
  }

  async login(input: LoginRequest) {
    const user = await this.usersRepository.findByEmail(input.email);
    if (!user) {
      throw new AppError(AUTH_ERROR_CODES.INVALID_CREDENTIALS, 401, 'Invalid credentials.');
    }

    const passwordHash = createHash('sha256').update(input.password).digest('hex');
    if (passwordHash !== user.passwordHash) {
      throw new AppError(AUTH_ERROR_CODES.INVALID_CREDENTIALS, 401, 'Invalid credentials.');
    }

    const tokens = await this.issueTokens(user.id);
    const event: AuthLoggedInEvent = {
      name: 'auth.logged_in',
      payload: {
        user_id: user.id,
        session_id: tokens.sessionId,
        occurred_at: new Date().toISOString(),
      },
    };

    return {
      tokens: tokens.response,
      events: [event],
    };
  }

  private async issueTokens(userId: string) {
    const accessToken = randomBytes(32).toString('hex');
    const refreshToken = randomBytes(48).toString('hex');
    const session = await this.sessionsRepository.create(userId, refreshToken, REFRESH_TOKEN_TTL_DAYS);

    return {
      sessionId: session.id,
      response: toAuthTokensResponse(accessToken, refreshToken, ACCESS_TOKEN_TTL_SECONDS),
    };
  }
}
