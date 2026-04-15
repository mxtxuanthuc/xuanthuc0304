import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
}

export function Button({ children, variant = 'primary', ...props }: PropsWithChildren<ButtonProps>) {
  return (
    <button className={`ui-btn ui-btn--${variant}`} {...props}>
      {children}
    </button>
  );
}
