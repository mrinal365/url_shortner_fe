import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'sage' | 'green' | 'dark';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

const variantStyles: Record<NonNullable<CardProps['variant']>, string> = {
  default:
    'bg-[#f8faf7] text-[#0e0f0c] border border-[#0e0f0c]/8 shadow-xs hover:border-[#0e0f0c]/15',
  elevated:
    'bg-white text-[#0e0f0c] border border-[#0e0f0c]/10 shadow-[0_20px_50px_rgba(14,15,12,0.06),0_1px_3px_rgba(14,15,12,0.03)]',
  sage:
    'bg-[#f4f6f2] text-[#0e0f0c] border border-[#0e0f0c]/8',
  green:
    'bg-[#e2f6d5] text-[#0e0f0c] border border-[#c5edab]',
  dark:
    'bg-[#0e0f0c] text-white border border-white/10 shadow-lg',
};

const paddingStyles: Record<NonNullable<CardProps['padding']>, string> = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8 sm:p-10',
  xl: 'p-10 sm:p-14',
};

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
  ...props
}) => {
  return (
    <div
      className={`rounded-[24px] transition-all ${variantStyles[variant]} ${paddingStyles[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
