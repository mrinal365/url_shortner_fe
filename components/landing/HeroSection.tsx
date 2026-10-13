import React from 'react';
import Badge from '@/components/ui/Badge';
import HeroShortenerCard from '@/components/landing/HeroShortenerCard';

export const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="max-w-5xl mx-auto px-6 pt-16 pb-20 sm:pt-24 sm:pb-28 text-center">
      <div className="mb-6">
        <Badge variant="white" hasDot pulseDot>
          FIBER-OPTIC LINK ROUTING
        </Badge>
      </div>

      <h1 className="font-black text-4xl sm:text-6xl lg:text-[76px] text-[#0e0f0c] tracking-tight leading-[1.08] max-w-4xl mx-auto">
        <span className="relative inline-block mx-1">
          <span className="relative z-10 px-1">Shorten</span>
          <svg
            className="absolute -inset-x-2 -bottom-1 top-1.5 w-[calc(100%+16px)] h-[calc(100%-2px)] -z-0 pointer-events-none -rotate-1"
            viewBox="0 0 200 60"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M 4 48 Q 50 43, 105 48 T 196 45 C 201 32, 199 15, 194 9 Q 135 15, 80 8 T 6 12 C 1 24, 2 36, 4 48 Z"
              fill="#9fe870"
            />
            <path
              d="M 8 52 Q 55 47, 110 52 T 191 48 C 196 36, 194 20, 189 14 Q 130 19, 75 13 T 10 16 C 5 28, 6 40, 8 52 Z"
              fill="#82e63e"
              opacity="0.35"
            />
          </svg>
        </span>{' '}
        your{' '}
        <span className="relative inline-block mx-1">
          <span className="relative z-10 px-1">URLs</span>
          <svg
            className="absolute -inset-x-2 -bottom-1 top-1.5 w-[calc(100%+16px)] h-[calc(100%-2px)] -z-0 pointer-events-none rotate-1"
            viewBox="0 0 140 60"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M 3 47 Q 35 42, 75 47 T 136 44 C 141 30, 139 14, 134 8 Q 90 14, 50 7 T 5 11 C 1 23, 1 36, 3 47 Z"
              fill="#9fe870"
            />
            <path
              d="M 7 51 Q 40 46, 80 51 T 131 47 C 136 34, 134 18, 129 13 Q 85 18, 45 12 T 9 15 C 4 27, 5 39, 7 51 Z"
              fill="#82e63e"
              opacity="0.35"
            />
          </svg>
        </span>{' '}
        at fiber-optic speed.
      </h1>

      <p className="mt-6 text-lg sm:text-xl text-[#454745] max-w-2xl mx-auto leading-relaxed">
        Transform long, messy URLs into clean, fast links. Instantly shorten, share, and track your links across the web.
      </p>

      <HeroShortenerCard />
    </section>
  );
};

export default HeroSection;
