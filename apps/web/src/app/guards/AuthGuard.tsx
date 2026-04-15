import { Navigate } from 'react-router-dom';
import { PropsWithChildren } from 'react';
import { ROUTES } from '../config/routes';

interface AuthGuardProps {
  isAuthed: boolean;
}

export function AuthGuard({ isAuthed, children }: PropsWithChildren<AuthGuardProps>) {
  if (!isAuthed) {
    return <Navigate to={ROUTES.login} replace />;
  }

  return <>{children}</>;
}
