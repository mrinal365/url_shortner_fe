import React from 'react';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'error' | 'warning' | 'success' | 'info';
  onClose?: () => void;
}

const variantStyles: Record<NonNullable<AlertProps['variant']>, { container: string; iconColor: string; icon: string }> = {
  error: {
    container: 'bg-[#320707] border-[#a72027]/40 text-[#ffc091]',
    iconColor: 'text-[#ffd11a]',
    icon: '!',
  },
  warning: {
    container: 'bg-[#fff8db] border-[#ffd11a]/50 text-[#4a3b1c]',
    iconColor: 'text-[#b86700]',
    icon: '⚠',
  },
  success: {
    container: 'bg-[#e2f6d5] border-[#c5edab] text-[#054d28]',
    iconColor: 'text-[#2ead4b]',
    icon: '✓',
  },
  info: {
    container: 'bg-[#e8ebe6] border-[#0e0f0c]/10 text-[#0e0f0c]',
    iconColor: 'text-[#0e0f0c]',
    icon: 'ℹ',
  },
};

export const Alert: React.FC<AlertProps> = ({
  children,
  variant = 'error',
  onClose,
  className = '',
  ...props
}) => {
  const { container, iconColor, icon } = variantStyles[variant];

  return (
    <div
      className={`p-4 rounded-[14px] border text-sm flex items-start justify-between gap-3 transition-all ${container} ${className}`}
      role="alert"
      {...props}
    >
      <div className="flex items-start gap-2.5 min-w-0">
        <span className={`font-bold shrink-0 ${iconColor}`}>{icon}</span>
        <div className="flex-1 font-medium">{children}</div>
      </div>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="text-current opacity-60 hover:opacity-100 font-bold text-xs p-1 rounded cursor-pointer transition shrink-0"
          aria-label="Dismiss alert"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default Alert;
