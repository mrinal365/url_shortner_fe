import React from 'react';
import Link from 'next/link';

export const CtaBanner: React.FC = () => {
  return (
    <section className="max-w-5xl mx-auto px-6 py-20 text-center">
      <div className="bg-white border border-[#0e0f0c]/10 rounded-[28px] p-10 sm:p-16 shadow-[0_20px_50px_-12px_rgba(14,15,12,0.08),0_4px_16px_rgba(14,15,12,0.03)]">
        <h2 className="font-black text-3xl sm:text-5xl text-[#0e0f0c] tracking-tight leading-[1.08] max-w-2xl mx-auto">
          Ready to clean up your connection?
        </h2>
        <p className="mt-4 text-base sm:text-lg text-[#454745] max-w-xl mx-auto leading-relaxed">
          Start shortening smarter URLs today. Upgrade your links with advanced analytics and control.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/signup"
            className="bg-[#0e0f0c] hover:bg-[#163300] text-white font-semibold text-base py-3.5 px-8 rounded-[24px] transition-colors inline-block"
          >
            Create Free Account
          </Link>
          <Link
            href="/create"
            className="bg-white hover:bg-[#f4f6f2] text-[#0e0f0c] border border-[#0e0f0c]/20 font-semibold text-base py-3 px-7 rounded-[24px] transition-colors inline-block"
          >
            Try Link Builder &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;
