import type { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
}

export const PrimaryButton = ({
  children,
  className = "",
  ...props
}: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary-hover shadow-sm hover:shadow-md transition-all duration-300 ${className}`}
    {...props}
  >
    {children}
  </button>
);

export const SecondaryButton = ({
  children,
  className = "",
  ...props
}: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-card-border text-foreground font-medium hover:bg-secondary transition-all duration-300 ${className}`}
    {...props}
  >
    {children}
  </button>
);

export const GradientButton = ({
  children,
  className = "",
  ...props
}: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold shadow-sm hover:shadow-md transition-all duration-300 ${className}`}
    {...props}
  >
    {children}
  </button>
);

export const DisabledButton = ({
  children,
  className = "",
  ...props
}: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-muted text-muted-foreground cursor-not-allowed ${className}`}
    disabled
    {...props}
  >
    {children}
  </button>
);
