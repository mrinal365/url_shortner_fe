import React from 'react';
import Badge from '@/components/ui/Badge';
import HeroShortenerCard from '@/components/landing/HeroShortenerCard';

export const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="max-w-5xl mx-auto px-6 pt-16 pb-20 sm:pt-24 sm:pb-28 text-center">
      <div className="mb-6">
        <Badge variant="positive" hasDot pulseDot>
          FIBER-OPTIC LINK ROUTING
        </Badge>
      </div>

      <h1 className="font-black text-4xl sm:text-6xl lg:text-[76px] text-[#0e0f0c] tracking-tight leading-[1.03] max-w-4xl mx-auto">
        Shorten your URLs at fiber-optic speed.
      </h1>

      <p className="mt-6 text-lg sm:text-xl text-[#454745] max-w-2xl mx-auto leading-relaxed">
        Transform long, messy URLs into clean, fast links. Instantly shorten, share, and track your links across the web.
      </p>

      <HeroShortenerCard />
    </section>
  );
};

export default HeroSection;
