import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../common/errors/app-error';

export interface AuthContext {
  userId: string;
  role: 'guest' | 'candidate' | 'recruiter' | 'employer_admin' | 'moderator' | 'admin' | 'super_admin';
}

export function authGuard(req: Request, _res: Response, next: NextFunction) {
  const userId = req.header('x-user-id');
  const role = req.header('x-user-role') as AuthContext['role'] | undefined;

  if (!userId || !role) {
    throw new AppError('UNAUTHORIZED', 401, 'Authentication required.');
  }

  (req as Request & { auth?: AuthContext }).auth = { userId, role };
  next();
}
