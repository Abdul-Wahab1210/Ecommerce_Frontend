// src/components/Alerts.tsx
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
    className={`bg-success text-white px-4 py-2 rounded-md shadow-small ${className}`}
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
    className={`bg-warning text-white px-4 py-2 rounded-md shadow-small ${className}`}
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
    className={`bg-error text-white px-4 py-2 rounded-md shadow-small ${className}`}
    {...props}
  >
    {children}
  </div>
);
