import { useContext } from 'react';
import { Button, Input } from '@career/ui-kit';
import { AppI18nContext } from '../../app/providers/AppProviders';

export function LoginPage() {
  const { t } = useContext(AppI18nContext);

  return (
    <section className="auth-shell">
      <h1>{t('auth_login')}</h1>
      <form className="auth-form">
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Button type="submit">{t('auth_login')}</Button>
      </form>
    </section>
  );
}
