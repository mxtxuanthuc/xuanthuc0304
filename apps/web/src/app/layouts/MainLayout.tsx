import { PropsWithChildren } from 'react';

export function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className="main-layout">
      <header className="app-header">TopCV Career Platform</header>
      <main>{children}</main>
    </div>
  );
}
