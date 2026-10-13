import React from 'react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightElement?: React.ReactNode;
  variant?: 'default' | 'card';
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightElement,
      variant = 'default',
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    const variantStyles =
      variant === 'card'
        ? 'bg-[#f8faf7] border-2 border-[#0e0f0c]/10 focus-within:border-[#0e0f0c] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0e0f0c]/10'
        : 'bg-white border border-[#0e0f0c]/25 focus-within:border-[#0e0f0c] focus-within:ring-1 focus-within:ring-[#0e0f0c]';

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-semibold text-[#0e0f0c] mb-1.5"
          >
            {label}
          </label>
        )}

        <div
          className={`relative rounded-[12px] flex items-center transition-all ${variantStyles} ${
            error ? 'border-[#d03238] focus-within:border-[#d03238] focus-within:ring-[#d03238]' : ''
          }`}
        >
          {leftIcon && (
            <div className="pl-3.5 pr-1 flex items-center justify-center shrink-0 text-[#868685]">
              {leftIcon}
            </div>
          )}

          <input
            id={inputId}
            ref={ref}
            className={`w-full bg-transparent text-[#0e0f0c] text-base outline-none px-4 py-3 placeholder:text-[#868685] ${
              leftIcon ? 'pl-2' : ''
            } ${rightElement ? 'pr-11' : ''} ${className}`}
            {...props}
          />

          {rightElement && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
              {rightElement}
            </div>
          )}
        </div>

        {error && (
          <p className="mt-1.5 text-xs text-[#d03238] font-medium">{error}</p>
        )}

        {!error && helperText && (
          <p className="mt-1.5 text-xs text-[#868685]">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
