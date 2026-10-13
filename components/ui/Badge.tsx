import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | 'white'
    | 'positive'
    | 'neutral'
    | 'dark'
    | 'brand'
    | 'warning'
    | 'negative';
  size?: 'sm' | 'md';
  hasDot?: boolean;
  pulseDot?: boolean;
}

const variantStyles: Record<NonNullable<BadgeProps['variant']>, string> = {
  white: 'bg-white text-[#0e0f0c] border-[#0e0f0c]/10 shadow-[0_1px_3px_rgba(14,15,12,0.06)]',
  positive: 'bg-[#e2f6d5] text-[#054d28] border-transparent',
  neutral: 'bg-[#f4f6f2] text-[#0e0f0c] border-[#0e0f0c]/10',
  dark: 'bg-[#0e0f0c] text-[#9fe870] border-transparent',
  brand: 'bg-[#9fe870] text-[#0e0f0c] border-transparent',
  warning: 'bg-[#fff8db] text-[#b86700] border-transparent',
  negative: 'bg-[#320707] text-[#ffc091] border-[#a72027]/40',
};

const dotColors: Record<NonNullable<BadgeProps['variant']>, string> = {
  white: 'bg-[#2ead4b]',
  positive: 'bg-[#2ead4b]',
  neutral: 'bg-[#868685]',
  dark: 'bg-[#9fe870]',
  brand: 'bg-[#0e0f0c]',
  warning: 'bg-[#ffd11a]',
  negative: 'bg-[#ffc091]',
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'positive',
  size = 'md',
  hasDot = false,
  pulseDot = false,
  className = '',
  ...props
}) => {
  const sizeClasses =
    size === 'sm'
      ? 'text-[10px] font-bold tracking-wider uppercase px-2.5 py-1'
      : 'text-xs font-semibold tracking-wider uppercase px-3.5 py-1.5';

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border transition-colors ${variantStyles[variant]} ${sizeClasses} ${className}`}
      {...props}
    >
      {hasDot && (
        <span className="relative flex h-2 w-2">
          {pulseDot && (
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dotColors[variant]}`}
            />
          )}
          <span
            className={`relative inline-flex rounded-full h-2 w-2 ${dotColors[variant]}`}
          />
        </span>
      )}
      {children}
    </span>
  );
};

export default Badge;
