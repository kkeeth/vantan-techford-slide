import type { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

export const Button = ({
  children,
  onClick,
  disabled = false,
}: ButtonProps) => (
  <button onClick={onClick} disabled={disabled}>
    {children}
  </button>
);
