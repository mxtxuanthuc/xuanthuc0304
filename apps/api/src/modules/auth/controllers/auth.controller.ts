import { Router } from 'express';
import { ok } from '../../../common/http/envelope';
import { AuthService } from '../services/auth.service';
import { validateLoginRequest } from '../validators/login.validator';
import { validateRegisterRequest } from '../validators/register.validator';

export function buildAuthController(authService: AuthService) {
  const router = Router();

  router.post('/register', async (req, res) => {
    const input = validateRegisterRequest(req.body);
    const result = await authService.register(input);

    return res.status(201).json(ok(result, 'Registration successful.'));
  });

  router.post('/login', async (req, res) => {
    const input = validateLoginRequest(req.body);
    const result = await authService.login(input);

    return res.status(200).json(ok(result, 'Login successful.'));
  });

  return router;
}
