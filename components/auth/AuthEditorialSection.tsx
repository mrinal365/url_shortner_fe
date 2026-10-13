import React from 'react';
import Badge from '@/components/ui/Badge';

export interface AuthEditorialSectionProps {
  badgeText?: string;
  headline?: string;
  description?: string;
  features?: Array<{
    number: string;
    title: string;
    description: string;
    variant?: 'sage' | 'green';
  }>;
}

export const AuthEditorialSection: React.FC<AuthEditorialSectionProps> = ({
  badgeText = 'FAST & SECURE ACCESS',
  headline = 'Fiber-optic link management at your fingertips.',
  description = 'Shorten long URLs, deploy branded custom aliases, and inspect real-time click analytics with zero latency.',
  features = [
    {
      number: '01',
      title: 'Custom Domain & Alias Branding',
      description:
        'Replace messy query strings with memorable, branded links that increase click-through rates.',
      variant: 'sage',
    },
    {
      number: '02',
      title: 'Live Click Tracking Engine',
      description:
        'Inspect visitor locations, referral sources, operating systems, and click timestamps in real-time.',
      variant: 'green',
    },
  ],
}) => {
  return (
    <div className="flex-1 max-w-xl">
      <div className="mb-6">
        <Badge variant="positive" hasDot pulseDot>
          {badgeText}
        </Badge>
      </div>

      <h1 className="font-black text-4xl sm:text-5xl lg:text-[56px] text-[#0e0f0c] tracking-tight leading-[1.08]">
        {headline}
      </h1>

      <p className="mt-5 text-lg text-[#454745] leading-relaxed">
        {description}
      </p>

      <div className="mt-8 space-y-3.5">
        {features.map((feat) => (
          <div
            key={feat.number}
            className={`rounded-[24px] p-5 flex items-start gap-4 ${
              feat.variant === 'green'
                ? 'bg-[#e2f6d5] border border-[#c5edab]'
                : 'bg-white rounded-[24px] border border-[#0e0f0c]/10 shadow-[0_2px_12px_rgba(0,0,0,0.02)]'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
                feat.variant === 'green'
                  ? 'bg-white text-[#054d28]'
                  : 'bg-[#e8ebe6] text-[#0e0f0c]'
              }`}
            >
              {feat.number}
            </div>
            <div>
              <h3 className="font-semibold text-sm text-[#0e0f0c]">
                {feat.title}
              </h3>
              <p className="text-xs text-[#454745] mt-0.5 leading-relaxed">
                {feat.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuthEditorialSection;
