'use client';

// React & Next.js
import React, { useState, useEffect } from 'react';

// Redux Store
import { useAppDispatch } from '@/store/hooks';
import { setUser, clearUser } from '@/store/userSlice';

// Services
import { getMe } from '@/services/auth.service';

// Layout & Common Components
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';

// Landing Page Sections
import HeroSection from '@/components/landing/HeroSection';
import AnalyticsSection from '@/components/landing/AnalyticsSection';
import EngineFeaturesSection from '@/components/landing/EngineFeaturesSection';
import TrustSection from '@/components/landing/TrustSection';
import CtaBanner from '@/components/landing/CtaBanner';

export default function LandingPage() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  // Check /me API on page load and sync user details with Redux
  useEffect(() => {
    getMe()
      .then((res) => {
        if (res?.user) {
          dispatch(setUser(res.user));
        } else {
          dispatch(clearUser());
        }
      })
      .catch(() => {
        dispatch(clearUser());
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  return (
    <div className="min-h-screen text-[#0e0f0c] flex flex-col justify-between selection:bg-[#9fe870] selection:text-[#0e0f0c]">
      <Navbar currentPage="home" loading={loading} />

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
