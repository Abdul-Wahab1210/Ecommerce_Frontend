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
    className={`bg-card border border-card-border rounded-2xl p-5 hover:shadow-lg hover:border-primary/20 transition-all duration-300 ${className}`}
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
    className={`bg-card border border-card-border rounded-xl p-5 hover:shadow-md transition-all duration-300 ${className}`}
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
    className={`bg-card border border-card-border rounded-2xl p-6 hover:shadow-md transition-all duration-300 ${className}`}
    {...props}
  >
    {children}
  </div>
);
