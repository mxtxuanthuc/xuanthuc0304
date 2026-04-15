import assert from 'node:assert/strict';
import test from 'node:test';
import { UsersRepository } from '../../users/repositories/users.repository';
import { UsersService } from '../../users/services/users.service';
import { SessionsRepository } from '../repositories/sessions.repository';
import { AuthService } from '../services/auth.service';

test('AuthService register and login flow', async () => {
  const usersRepository = new UsersRepository();
  const usersService = new UsersService(usersRepository);
  const authService = new AuthService(usersService, usersRepository, new SessionsRepository());

  const registerResult = await authService.register({
    email: 'candidate@example.com',
    password: 'password123',
    role: 'candidate',
  });

  assert.equal(registerResult.user.email, 'candidate@example.com');
  assert.equal(registerResult.tokens.response.expires_in, 900);

  const loginResult = await authService.login({
    email: 'candidate@example.com',
    password: 'password123',
  });

  assert.equal(Boolean(loginResult.tokens.access_token), true);
});
