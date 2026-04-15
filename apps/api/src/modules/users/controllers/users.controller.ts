import { Router } from 'express';
import { ok } from '../../../common/http/envelope';
import { validateCreateUserRequest } from '../validators/create-user.validator';
import { UsersService } from '../services/users.service';

export function buildUsersController(usersService: UsersService) {
  const router = Router();

  router.post('/', async (req, res) => {
    const input = validateCreateUserRequest(req.body);
    const result = await usersService.createUser(input);

    return res.status(201).json(ok(result.user, 'User created successfully.'));
  });

  return router;
}
