'use client';

// React
import React from 'react';

export interface LoadingProps {
  /** Optional loading message displayed beneath the bouncing balls */
  text?: string;
  /** Whether the loader should overlay the entire screen */
  fullScreen?: boolean;
  /** Additional custom classes for the container */
  className?: string;
}

export const Loading: React.FC<LoadingProps> = ({
  text = 'Loading...',
  fullScreen = true,
  className = '',
}) => {
  const containerClasses = fullScreen
    ? `fixed inset-0 z-50 bg-white flex flex-col items-center justify-center ${className}`
    : `min-h-[300px] w-full bg-white flex flex-col items-center justify-center ${className}`;

  return (
    <div className={containerClasses} role="status" aria-label="Loading">
      <style>{`
        @keyframes fibrBallBounce {
          0%, 100% {
            transform: translateY(0);
            opacity: 0.75;
          }
          50% {
            transform: translateY(-22px);
            opacity: 1;
          }
        }

        @keyframes fibrShadowScale {
          0%, 100% {
            transform: scale(1);
            opacity: 0.45;
          }
          50% {
            transform: scale(0.35);
            opacity: 0.1;
          }
        }

        .fibr-ball-1 { animation: fibrBallBounce 0.85s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite both 0s; }
        .fibr-ball-2 { animation: fibrBallBounce 0.85s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite both 0.14s; }
        .fibr-ball-3 { animation: fibrBallBounce 0.85s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite both 0.28s; }
        .fibr-ball-4 { animation: fibrBallBounce 0.85s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite both 0.42s; }

        .fibr-shadow-1 { animation: fibrShadowScale 0.85s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite both 0s; }
        .fibr-shadow-2 { animation: fibrShadowScale 0.85s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite both 0.14s; }
        .fibr-shadow-3 { animation: fibrShadowScale 0.85s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite both 0.28s; }
        .fibr-shadow-4 { animation: fibrShadowScale 0.85s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite both 0.42s; }
      `}</style>

      {/* 4 Green Bouncing Balls with Reactive Shadows */}
      <div className="flex items-center gap-3.5">
        {/* Ball 1 */}
        <div className="flex flex-col items-center">
          <div className="w-[26px] h-[26px] rounded-full bg-[#9fe870] shadow-[0_4px_14px_rgba(159,232,112,0.5)] border border-[#2ead4b]/20 fibr-ball-1" />
          <div className="w-[16px] h-[4px] rounded-full bg-[#0e0f0c]/15 mt-2.5 fibr-shadow-1" />
        </div>

        {/* Ball 2 */}
        <div className="flex flex-col items-center">
          <div className="w-[26px] h-[26px] rounded-full bg-[#9fe870] shadow-[0_4px_14px_rgba(159,232,112,0.5)] border border-[#2ead4b]/20 fibr-ball-2" />
          <div className="w-[16px] h-[4px] rounded-full bg-[#0e0f0c]/15 mt-2.5 fibr-shadow-2" />
        </div>

        {/* Ball 3 */}
        <div className="flex flex-col items-center">
          <div className="w-[26px] h-[26px] rounded-full bg-[#9fe870] shadow-[0_4px_14px_rgba(159,232,112,0.5)] border border-[#2ead4b]/20 fibr-ball-3" />
          <div className="w-[16px] h-[4px] rounded-full bg-[#0e0f0c]/15 mt-2.5 fibr-shadow-3" />
        </div>

        {/* Ball 4 */}
        <div className="flex flex-col items-center">
          <div className="w-[26px] h-[26px] rounded-full bg-[#9fe870] shadow-[0_4px_14px_rgba(159,232,112,0.5)] border border-[#2ead4b]/20 fibr-ball-4" />
          <div className="w-[16px] h-[4px] rounded-full bg-[#0e0f0c]/15 mt-2.5 fibr-shadow-4" />
        </div>
      </div>

      {/* Loading Status Label */}
      {text && (
        <p className="mt-5 text-sm font-bold text-[#0e0f0c] tracking-tight">
          {text}
        </p>
      )}
    </div>
  );
};

export default Loading;
