import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'sage' | 'green' | 'dark';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

const variantStyles: Record<NonNullable<CardProps['variant']>, string> = {
  default:
    'bg-white text-[#0e0f0c] border border-[#0e0f0c]/5 shadow-[0_2px_12px_rgba(0,0,0,0.02)]',
  elevated:
    'bg-white text-[#0e0f0c] border border-[#0e0f0c]/10 shadow-[0_20px_50px_rgba(14,15,12,0.06),0_1px_3px_rgba(14,15,12,0.03)]',
  sage:
    'bg-[#e8ebe6] text-[#0e0f0c] border border-[#0e0f0c]/10',
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
