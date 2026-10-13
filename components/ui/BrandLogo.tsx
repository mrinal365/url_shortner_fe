import React from 'react';
import Link from 'next/link';
import { APP_CONFIG } from '@/constants/app.constants';

export interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  asLink?: boolean;
  className?: string;
}

const sizeStyles = {
  sm: {
    icon: 'w-8 h-8 rounded-[10px] text-lg',
    text: 'text-lg',
  },
  md: {
    icon: 'w-10 h-10 rounded-[12px] text-xl',
    text: 'text-xl',
  },
  lg: {
    icon: 'w-12 h-12 rounded-[14px] text-2xl',
    text: 'text-2xl',
  },
};

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  asLink = true,
  className = '',
}) => {
  const { icon, text } = sizeStyles[size];

  const content = (
    <div className={`inline-flex items-center gap-2.5 group ${className}`}>
      <div
        className={`${icon} bg-[#0e0f0c] text-[#9fe870] flex items-center justify-center font-black tracking-tighter group-hover:bg-[#163300] transition-colors`}
      >
        F
      </div>
      <span className={`font-black tracking-tight text-[#0e0f0c] ${text}`}>
        {APP_CONFIG.APP_NAME}
      </span>
    </div>
  );

  if (asLink) {
    return (
      <Link href="/" aria-label="Home">
        {content}
      </Link>
    );
  }

  return content;
};

export default BrandLogo;
