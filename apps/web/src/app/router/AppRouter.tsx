import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ROUTES } from '../config/routes';
import { MainLayout } from '../layouts/MainLayout';
import { HomePage } from '../../pages/public/HomePage';
import { LoginPage } from '../../pages/auth/LoginPage';
import { PageLoading } from '../../features/system-states/PageLoading';

const RegisterPage = lazy(() => import('../../pages/auth/RegisterPage').then((m) => ({ default: m.RegisterPage })));

export function AppRouter() {
  return (
    <MainLayout>
      <Routes>
        <Route path={ROUTES.home} element={<HomePage />} />
        <Route path={ROUTES.login} element={<LoginPage />} />
        <Route
          path={ROUTES.register}
          element={
            <Suspense fallback={<PageLoading />}>
              <RegisterPage />
            </Suspense>
          }
        />
      </Routes>
    </MainLayout>
  );
}
