import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const variantStyles = {
  primary: "bg-brand-accent text-white hover:opacity-90",
  secondary: "bg-brand-card text-white hover:opacity-80",
  outline:
    "bg-transparent border-2 border-brand-accent text-brand-accent hover:opacity-90",
};

const sizeStyles = {
  sm: "px-6 py-2 text-sm",
  md: "px-10 py-3 text-base",
  lg: "px-14 py-4 text-base",
};

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}) => (
  <button
    className={`font-medium rounded-full transition-all duration-300 hover:scale-105 active:scale-95 uppercase tracking-wide ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    {...props}
  >
    {children}
  </button>
);
