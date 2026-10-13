import React from 'react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import AuthEditorialSection from '@/components/auth/AuthEditorialSection';
import SignupForm from '@/components/auth/SignupForm';

export default function SignupPage() {
  return (
    <div className="min-h-screen text-[#0e0f0c] flex flex-col justify-between selection:bg-[#9fe870] selection:text-[#0e0f0c]">
      <Navbar currentPage="signup" />

      <main className="w-full max-w-7xl mx-auto px-6 py-8 sm:py-12 flex-1 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
        <AuthEditorialSection
          badgeText="FAST & FREE ONBOARDING"
          headline="Fast URLs for modern teams and creators."
          description="Shorten long parameters, protect your brand with custom aliases, and inspect every visitor click with real-time analytics."
        />
        <SignupForm />
      </main>

      <Footer simplified />
    </div>
  );
}