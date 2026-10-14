import React from 'react';
import { getPasswordStrength } from '@/utils/auth.utils';

export interface PasswordStrengthIndicatorProps {
  strength?: number;
  password?: string;
  className?: string;
}

export const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({
  strength: propStrength,
  password,
  className = '',
}) => {
  if (password !== undefined && password.length === 0) {
    return null;
  }

  const score =
    propStrength !== undefined
      ? propStrength
      : password !== undefined
      ? getPasswordStrength(password)
      : 0;

  const getLabel = () => {
    if (score <= 1) return 'Weak';
    if (score === 2) return 'Fair';
    if (score === 3) return 'Good';
    return 'Strong';
  };

  return (
    <div className={`mt-2 flex items-center gap-1.5 ${className}`}>
      <div
        className={`h-1 flex-1 rounded-full transition-colors ${
          score >= 1 ? 'bg-[#2ead4b]' : 'bg-[#e8ebe6]'
        }`}
      />
      <div
        className={`h-1 flex-1 rounded-full transition-colors ${
          score >= 2 ? 'bg-[#2ead4b]' : 'bg-[#e8ebe6]'
        }`}
      />
      <div
        className={`h-1 flex-1 rounded-full transition-colors ${
          score >= 3 ? 'bg-[#2ead4b]' : 'bg-[#e8ebe6]'
        }`}
      />
      <div
        className={`h-1 flex-1 rounded-full transition-colors ${
          score >= 4 ? 'bg-[#2ead4b]' : 'bg-[#e8ebe6]'
        }`}
      />
      <span className="text-[11px] text-[#454745] font-medium ml-1">
        {getLabel()}
      </span>
    </div>
  );
};

export default PasswordStrengthIndicator;
