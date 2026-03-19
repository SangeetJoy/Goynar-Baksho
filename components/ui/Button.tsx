import React from 'react';
import { COLORS } from '@/lib/constants/colors';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'font-medium rounded-full transition-all duration-300 hover:scale-105 active:scale-95 uppercase tracking-wide';
  
  const variants = {
    primary: 'text-white hover:opacity-90',
    secondary: 'text-white hover:opacity-80',
    outline: 'border-2 hover:opacity-90',
  };
  
  const sizes = {
    sm: 'px-6 py-2 text-sm',
    md: 'px-10 py-3 text-base',
    lg: 'px-14 py-4 text-base',
  };

  const getBackgroundColor = () => {
    if (variant === 'primary') return COLORS.accentPrimary;
    if (variant === 'secondary') return COLORS.bgSecondary;
    return 'transparent';
  };

  const getBorderColor = () => {
    if (variant === 'outline') return COLORS.accentPrimary;
    return 'transparent';
  };
  
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      style={{
        backgroundColor: getBackgroundColor(),
        borderColor: getBorderColor(),
      }}
      {...props}
    >
      {children}
    </button>
  );
};
