import { AppError } from '../../../common/errors/app-error';

export function assertUserReadAccess(requesterUserId: string, targetUserId: string) {
  if (requesterUserId !== targetUserId) {
    throw new AppError('FORBIDDEN', 403, 'You cannot access another user resource.');
  }
}
