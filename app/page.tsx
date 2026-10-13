import React from 'react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import HeroSection from '@/components/landing/HeroSection';
import AnalyticsSection from '@/components/landing/AnalyticsSection';
import EngineFeaturesSection from '@/components/landing/EngineFeaturesSection';
import TrustSection from '@/components/landing/TrustSection';
import CtaBanner from '@/components/landing/CtaBanner';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#e8ebe6] text-[#0e0f0c] flex flex-col justify-between selection:bg-[#9fe870] selection:text-[#0e0f0c]">
      <Navbar currentPage="home" />

      <main className="flex-1">
        <HeroSection />
        <AnalyticsSection />
        <EngineFeaturesSection />
        <TrustSection />
        <CtaBanner />
      </main>

      <Footer />
    </div>
  );
}
