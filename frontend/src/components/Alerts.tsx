import type { ReactNode, HTMLAttributes } from "react";

interface ChildrenProps {
  children: ReactNode;
  className?: string;
}

export const SuccessAlert = ({
  children,
  className = "",
  ...props
}: ChildrenProps & HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`bg-success-bg text-success px-4 py-3 rounded-xl text-sm font-medium border border-success/20 ${className}`}
    {...props}
  >
    {children}
  </div>
);

export const WarningAlert = ({
  children,
  className = "",
  ...props
}: ChildrenProps & HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`bg-warning-bg text-warning px-4 py-3 rounded-xl text-sm font-medium border border-warning/20 ${className}`}
    {...props}
  >
    {children}
  </div>
);

export const ErrorAlert = ({
  children,
  className = "",
  ...props
}: ChildrenProps & HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`bg-danger-bg text-danger px-4 py-3 rounded-xl text-sm font-medium border border-danger/20 ${className}`}
    {...props}
  >
    {children}
  </div>
);
