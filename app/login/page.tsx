import React from 'react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import AuthEditorialSection from '@/components/auth/AuthEditorialSection';
import LoginForm from '@/components/auth/LoginForm';
import GuestGuard from '@/components/auth/GuestGuard';

export default function LoginPage() {
  return (
    <GuestGuard>
      <div className="min-h-screen text-[#0e0f0c] flex flex-col justify-between selection:bg-[#9fe870] selection:text-[#0e0f0c]">
        <Navbar currentPage="login" />

        <main className="w-full max-w-7xl mx-auto px-6 py-8 sm:py-12 flex-1 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          <AuthEditorialSection
            badgeText="TELEMETRY DASHBOARD ACCESS"
            headline="Sign in to your link control center."
            description="Access real-time click telemetry, manage branded custom aliases, and inspect destination traffic at fiber-optic speed."
          />
          <LoginForm />
        </main>

        <Footer simplified />
      </div>
    </GuestGuard>
  );
}