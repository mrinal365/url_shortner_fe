import React from 'react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'outline'
    | 'dark'
    | 'danger'
    | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantStyles: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'bg-[#9fe870] hover:bg-[#b0f283] active:bg-[#8ee05b] text-[#0e0f0c] font-bold shadow-xs hover:shadow-sm disabled:shadow-none',
  secondary:
    'bg-[#f4f6f2] hover:bg-[#e8ebe6] active:bg-[#dfe3dc] text-[#0e0f0c] border border-[#0e0f0c]/10',
  tertiary:
    'bg-white hover:bg-[#f4f6f2] active:bg-[#e8ebe6] text-[#0e0f0c] border border-[#0e0f0c]/20',
  outline:
    'bg-transparent hover:bg-[#0e0f0c]/5 text-[#0e0f0c] border border-[#0e0f0c]',
  dark:
    'bg-[#0e0f0c] hover:bg-[#163300] active:bg-[#1f4700] text-[#9fe870] shadow-[0_4px_14px_rgba(14,15,12,0.15)]',
  danger:
    'bg-[#d03238] hover:bg-[#a72027] active:bg-[#85181e] text-white shadow-sm',
  ghost:
    'bg-transparent hover:bg-[#0e0f0c]/5 text-[#0e0f0c] border-transparent',
};

const sizeStyles: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'text-xs font-semibold py-1.5 px-3.5 rounded-[20px] gap-1.5',
  md: 'text-sm font-bold py-2.5 px-5 rounded-[24px] gap-2',
  lg: 'text-base font-black py-3.5 px-7 rounded-[24px] gap-2.5',
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center transition-all duration-200 cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none transform active:scale-[0.98]';

  return (
    <button
      className={`${baseClasses} ${variantStyles[variant]} ${sizeStyles[size]} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
          <span>Loading...</span>
        </>
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};

export default Button;
