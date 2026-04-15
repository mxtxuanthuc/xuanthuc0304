import { AppError } from '../../../common/errors/app-error';

export function assertAllowedSelfAuthAction(requesterId: string, targetUserId: string) {
  if (requesterId !== targetUserId) {
    throw new AppError('FORBIDDEN', 403, 'Cannot perform auth action for another user.');
  }
}
