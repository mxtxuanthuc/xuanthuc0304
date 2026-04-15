import assert from 'node:assert/strict';
import test from 'node:test';
import { UsersRepository } from '../repositories/users.repository';
import { UsersService } from '../services/users.service';

test('UsersService creates a user and emits event', async () => {
  const service = new UsersService(new UsersRepository());

  const result = await service.createUser({
    email: 'user@example.com',
    password: 'password123',
    role: 'candidate',
  });

  assert.equal(result.user.email, 'user@example.com');
  assert.equal(result.event.name, 'user.created');
});
