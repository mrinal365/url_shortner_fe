import React from 'react';
import Card from '@/components/ui/Card';

export const AnalyticsSection: React.FC = () => {
  return (
    <section id="analytics" className="max-w-7xl mx-auto px-6 py-20 border-t border-[#0e0f0c]/5">
      <div className="max-w-2xl mx-auto text-center mb-16">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#868685] block mb-2">
          TELEMETRY &amp; VISIBILITY
        </span>
        <h2 className="font-black text-3xl sm:text-5xl text-[#0e0f0c] tracking-tight leading-[1.08]">
          Real-time analytics. Ultimate visibility.
        </h2>
        <p className="mt-4 text-base sm:text-lg text-[#454745] leading-relaxed">
          Don&apos;t just shorten your links—understand them. Track your traffic through our high-precision telemetry dashboard.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card variant="default" padding="md" className="flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-[16px] bg-[#e2f6d5] text-[#054d28] flex items-center justify-center text-xl mb-5">
              ⚡
            </div>
            <h3 className="font-bold text-lg text-[#0e0f0c]">
              Pulse Tracking
            </h3>
            <p className="mt-2 text-sm text-[#454745] leading-relaxed">
              Watch clicks stream in live with millisecond accuracy as users interact with your shared links.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-[#e8ebe6] flex items-center justify-between text-xs text-[#868685]">
            <span>Telemetry stream</span>
            <span className="text-[#054d28] font-semibold bg-[#e2f6d5] px-2 py-0.5 rounded-full">
              Sub-ms
            </span>
          </div>
        </Card>

        <Card variant="default" padding="md" className="flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-[16px] bg-[#e8ebe6] text-[#0e0f0c] flex items-center justify-center text-xl mb-5">
              🌍
            </div>
            <h3 className="font-bold text-lg text-[#0e0f0c]">
              Network Geometry
            </h3>
            <p className="mt-2 text-sm text-[#454745] leading-relaxed">
              Map out exactly where your traffic is coming from globally across countries, continents, and cities.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-[#e8ebe6] flex items-center justify-between text-xs text-[#868685]">
            <span>Global footprint</span>
            <span className="font-semibold text-[#0e0f0c]">190+ Countries</span>
          </div>
        </Card>

        <Card variant="default" padding="md" className="flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-[16px] bg-[#e8ebe6] text-[#0e0f0c] flex items-center justify-center text-xl mb-5">
              📱
            </div>
            <h3 className="font-bold text-lg text-[#0e0f0c]">
              Device Diagnostics
            </h3>
            <p className="mt-2 text-sm text-[#454745] leading-relaxed">
              Identify if your users are on mobile, desktop, iOS, or Android to optimize their destination experience.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-[#e8ebe6] flex items-center justify-between text-xs text-[#868685]">
            <span>Platform split</span>
            <span className="font-semibold text-[#0e0f0c]">OS &amp; Browser</span>
          </div>
        </Card>

        <Card variant="default" padding="md" className="flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-[16px] bg-[#e2f6d5] text-[#054d28] flex items-center justify-center text-xl mb-5">
              🔗
            </div>
            <h3 className="font-bold text-lg text-[#0e0f0c]">
              Referrer Routing
            </h3>
            <p className="mt-2 text-sm text-[#454745] leading-relaxed">
              See precisely which websites, apps, or social platforms are pulling the strings and driving conversions.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-[#e8ebe6] flex items-center justify-between text-xs text-[#868685]">
            <span>Origin attribution</span>
            <span className="text-[#054d28] font-semibold bg-[#e2f6d5] px-2 py-0.5 rounded-full">
              Accurate
            </span>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default AnalyticsSection;
