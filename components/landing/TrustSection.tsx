import React from 'react';

// performance and infrastructure stats
export const TrustSection: React.FC = () => {
  return (
    <section id="performance" className="max-w-7xl mx-auto px-6 py-20 border-t border-[#0e0f0c]/5">
      <div className="bg-[#0e0f0c] text-white rounded-[24px] p-8 sm:p-14">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-[#163300] text-[#9fe870] font-semibold text-xs tracking-wider uppercase px-3.5 py-1.5 rounded-full mb-6">
            <span>●</span> GLOBAL FIBER INFRASTRUCTURE
          </div>

          <h2 className="font-black text-3xl sm:text-5xl text-[#9fe870] tracking-tight leading-[1.08]">
            Zero bloat. Pure connectivity.
          </h2>

          <div className="mt-8 space-y-6 text-base sm:text-lg text-[#e8ebe6]/90 leading-relaxed">
            <div className="flex items-start gap-4">
              <div className="w-6 h-6 rounded-full bg-[#9fe870] text-[#0e0f0c] flex items-center justify-center font-bold text-xs shrink-0 mt-1">
                ✓
              </div>
              <p>
                <strong className="text-white font-semibold">Every millisecond counts.</strong> Our globally distributed edge network ensures redirects happen instantly, keeping bounce rates at absolute zero.
              </p>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-6 h-6 rounded-full bg-[#9fe870] text-[#0e0f0c] flex items-center justify-center font-bold text-xs shrink-0 mt-1">
                ✓
              </div>
              <p>
                <strong className="text-white font-semibold">Privacy by design.</strong> We securely route your data without tracking or selling your users&apos; personal identifiable information (PII).
              </p>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <span className="font-black text-3xl sm:text-4xl text-[#9fe870] block">
                &lt; 12ms
              </span>
              <span className="text-xs text-[#868685] uppercase tracking-wider mt-1 block">
                Edge Redirect Latency
              </span>
            </div>
            <div>
              <span className="font-black text-3xl sm:text-4xl text-[#9fe870] block">
                99.99%
              </span>
              <span className="text-xs text-[#868685] uppercase tracking-wider mt-1 block">
                Network Uptime SLA
              </span>
            </div>
            <div>
              <span className="font-black text-3xl sm:text-4xl text-[#9fe870] block">
                Zero PII
              </span>
              <span className="text-xs text-[#868685] uppercase tracking-wider mt-1 block">
                Collected or Sold
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
