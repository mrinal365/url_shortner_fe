import React from 'react';
import Card from '@/components/ui/Card';

export const EngineFeaturesSection: React.FC = () => {
  return (
    <section id="features" className="max-w-7xl mx-auto px-6 py-20 border-t border-[#0e0f0c]/5">
      <div className="max-w-2xl mx-auto text-center mb-16">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#868685] block mb-2">
          POWER &amp; PRECISION
        </span>
        <h2 className="font-black text-3xl sm:text-5xl text-[#0e0f0c] tracking-tight leading-[1.08]">
          Built for power. Engineered for speed.
        </h2>
        <p className="mt-4 text-base sm:text-lg text-[#454745] leading-relaxed">
          Every feature designed to give you total control over how connections are distributed and secured.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card variant="default" padding="lg" className="flex items-start gap-5">
          <div className="w-12 h-12 rounded-[16px] bg-[#f4f6f2] text-[#0e0f0c] flex items-center justify-center text-xl shrink-0">
            🧬
          </div>
          <div>
            <h3 className="font-bold text-xl text-[#0e0f0c]">
              Custom Splicing
            </h3>
            <p className="mt-2 text-base text-[#454745] leading-relaxed">
              Override random characters and create branded, memorable aliases (e.g.,{' '}
              <code className="bg-[#f4f6f2] px-1.5 py-0.5 rounded text-sm font-mono text-[#0e0f0c]">
                fibr.click/your-brand
              </code>
              ) to elevate brand recognition.
            </p>
          </div>
        </Card>

        <Card variant="default" padding="lg" className="flex items-start gap-5">
          <div className="w-12 h-12 rounded-[16px] bg-[#e2f6d5] text-[#054d28] flex items-center justify-center text-xl shrink-0">
            ⏳
          </div>
          <div>
            <h3 className="font-bold text-xl text-[#0e0f0c]">
              Link Expiration
            </h3>
            <p className="mt-2 text-base text-[#454745] leading-relaxed">
              Set custom expiration dates or click limits so your links securely self-destruct when they are no longer needed or past promo windows.
            </p>
          </div>
        </Card>

        <Card variant="default" padding="lg" className="flex items-start gap-5">
          <div className="w-12 h-12 rounded-[16px] bg-[#e2f6d5] text-[#054d28] flex items-center justify-center text-xl shrink-0">
            📲
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h3 className="font-bold text-xl text-[#0e0f0c]">
                Smart Device Routing
              </h3>
              <span className="bg-[#ffd11a] text-[#4a3b1c] text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Coming Soon
              </span>
            </div>
            <p className="mt-2 text-base text-[#454745] leading-relaxed">
              Program a single short URL to redirect iOS users to the App Store and Android users to Google Play automatically with zero friction.
            </p>
          </div>
        </Card>

        <Card variant="default" padding="lg" className="flex items-start gap-5">
          <div className="w-12 h-12 rounded-[16px] bg-[#f4f6f2] text-[#0e0f0c] flex items-center justify-center text-xl shrink-0">
            🔒
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h3 className="font-bold text-xl text-[#0e0f0c]">
                Encrypted Node (Password Protection)
              </h3>
              <span className="bg-[#ffd11a] text-[#4a3b1c] text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Coming Soon
              </span>
            </div>
            <p className="mt-2 text-base text-[#454745] leading-relaxed">
              Lock sensitive links behind a password layer to ensure only authorized clients, teammates, or subscribers access your destination.
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default EngineFeaturesSection;
