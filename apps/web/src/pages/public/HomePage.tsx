import { useContext } from 'react';
import { Button } from '@career/ui-kit';
import { AppI18nContext } from '../../app/providers/AppProviders';

export function HomePage() {
  const { t } = useContext(AppI18nContext);

  return (
    <section className="hero-grid">
      <div className="hero-content">
        <h1>{t('home_title')}</h1>
        <p>{t('home_subtitle')}</p>
        <div className="hero-actions">
          <Button>{t('auth_register')}</Button>
          <Button variant="secondary">Explore jobs</Button>
        </div>
      </div>
      <aside className="hero-card">
        <h3>Platform foundation</h3>
        <ul>
          <li>Design tokens integrated</li>
          <li>Shared UI kit wired</li>
          <li>Router + providers ready</li>
        </ul>
      </aside>
    </section>
  );
}
