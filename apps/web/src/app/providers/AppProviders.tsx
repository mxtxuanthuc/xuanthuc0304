import { PropsWithChildren, createContext, useMemo, useState } from 'react';
import { dictionaries, Locale } from '../../i18n/resources';

interface AppI18nContextValue {
  locale: Locale;
  t: (key: keyof (typeof dictionaries)['en']) => string;
  setLocale: (locale: Locale) => void;
}

export const AppI18nContext = createContext<AppI18nContextValue>({
  locale: 'en',
  t: (key) => key,
  setLocale: () => undefined,
});

export function AppProviders({ children }: PropsWithChildren) {
  const [locale, setLocale] = useState<Locale>('en');

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t: (key: keyof (typeof dictionaries)['en']) => dictionaries[locale][key] ?? key,
    }),
    [locale],
  );

  return <AppI18nContext.Provider value={value}>{children}</AppI18nContext.Provider>;
}
