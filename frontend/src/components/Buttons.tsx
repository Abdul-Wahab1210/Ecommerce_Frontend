// src/components/Buttons.tsx
import type { ReactNode, ButtonHTMLAttributes } from "react";

interface ChildrenProps {
  children: ReactNode;
  className?: string;
}

export const PrimaryButton = ({
  children,
  className = "",
  ...props
}: ChildrenProps & ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className={`bg-primary text-white px-6 py-2 rounded-lg shadow-medium hover:shadow-large hover:scale-105 transition-transform duration-300 ${className}`}
    {...props}
  >
    {children}
  </button>
);

export const SecondaryButton = ({
  children,
  className = "",
  ...props
}: ChildrenProps & ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className={`border border-primary text-primary px-6 py-2 rounded-lg hover:bg-primary hover:text-white transition-colors duration-300 ${className}`}
    {...props}
  >
    {children}
  </button>
);

export const GradientButton = ({
  children,
  className = "",
  ...props
}: ChildrenProps & ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className={`bg-gradient-primary text-white px-6 py-2 rounded-lg shadow-medium hover:shadow-large hover:scale-105 transition-transform duration-300 ${className}`}
    {...props}
  >
    {children}
  </button>
);

export const DisabledButton = ({
  children,
  className = "",
  ...props
}: ChildrenProps & ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className={`bg-gray-300 text-gray-500 px-6 py-2 rounded-lg cursor-not-allowed ${className}`}
    disabled
    {...props}
  >
    {children}
  </button>
);
