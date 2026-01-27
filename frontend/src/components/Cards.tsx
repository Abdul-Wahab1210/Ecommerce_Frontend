// src/components/Cards.tsx
import type { ReactNode, HTMLAttributes } from "react";

interface ChildrenProps {
  children: ReactNode;
  className?: string;
}

export const ProductCard = ({
  children,
  className = "",
  ...props
}: ChildrenProps & HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`bg-card rounded-lg shadow-medium p-4 hover:shadow-large hover:scale-105 transform transition-all duration-300 ${className}`}
    {...props}
  >
    {children}
  </div>
);

export const SellerCard = ({
  children,
  className = "",
  ...props
}: ChildrenProps & HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`bg-card rounded-lg shadow-small p-4 hover:shadow-medium transition-shadow duration-300 ${className}`}
    {...props}
  >
    {children}
  </div>
);

export const OrderCard = ({
  children,
  className = "",
  ...props
}: ChildrenProps & HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`bg-card rounded-lg shadow-small p-4 border border-gray-200 hover:shadow-medium transition-shadow duration-300 ${className}`}
    {...props}
  >
    {children}
  </div>
);
