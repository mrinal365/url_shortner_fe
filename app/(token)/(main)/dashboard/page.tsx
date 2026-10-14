'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import Badge from '@/components/ui/Badge';
import { useAppSelector } from '@/store/hooks';

export default function DashboardPage() {
  const { user } = useAppSelector((state) => state.user);

  return (
    <div className="min-h-screen text-[#0e0f0c] flex flex-col justify-between selection:bg-[#9fe870] selection:text-[#0e0f0c]">
      <Navbar currentPage="dashboard" />

      <main className="w-full max-w-5xl mx-auto px-6 py-8 sm:py-12 flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-[#0e0f0c]/8">
          <div>
            <div className="mb-2">
              <Badge variant="positive" hasDot pulseDot>
                ACTIVE WORKSPACE
              </Badge>
            </div>
            <h1 className="font-black text-3xl sm:text-4xl text-[#0e0f0c] tracking-tight">
              Welcome, {user?.name || 'Creator'}!
            </h1>
            <p className="text-sm text-[#454745] mt-1">
              {user?.email ? user.email : 'N/A'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/create"
              className="bg-[#9fe870] hover:bg-[#cdffad] text-[#0e0f0c] font-semibold text-sm py-2.5 px-5 rounded-[24px] transition-colors inline-flex items-center gap-2"
            >
              <span>+ Create Short URL</span>
            </Link>
          </div>
        </div>

        {/* Dashboard quick metric cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          <div className="bg-white border border-[#0e0f0c]/10 rounded-[20px] p-5 shadow-xs">
            <span className="text-xs font-bold text-[#868685] uppercase tracking-wider">
              Total Links
            </span>
            <div className="mt-2 text-3xl font-black text-[#0e0f0c]">0</div>
            <p className="text-xs text-[#454745] mt-1">Links shortened on your account</p>
          </div>

          <div className="bg-white border border-[#0e0f0c]/10 rounded-[20px] p-5 shadow-xs">
            <span className="text-xs font-bold text-[#868685] uppercase tracking-wider">
              Total Clicks
            </span>
            <div className="mt-2 text-3xl font-black text-[#0e0f0c]">0</div>
            <p className="text-xs text-[#454745] mt-1">Real-time visitor redirects</p>
          </div>

          <div className="bg-white border border-[#0e0f0c]/10 rounded-[20px] p-5 shadow-xs">
            <span className="text-xs font-bold text-[#868685] uppercase tracking-wider">
              Routing Latency
            </span>
            <div className="mt-2 text-3xl font-black text-[#2ead4b]">&lt; 8ms</div>
            <p className="text-xs text-[#454745] mt-1">Fiber-optic edge distribution</p>
          </div>
        </div>

        {/* Action card */}
        <div className="mt-8 bg-white border border-[#0e0f0c]/10 rounded-[24px] p-8 text-center shadow-xs">
          <h3 className="font-bold text-xl text-[#0e0f0c]">
            Ready to deploy your first short link?
          </h3>
          <p className="text-sm text-[#454745] mt-2 max-w-md mx-auto">
            Use our high-speed shortener or advanced builder with custom aliases and real-time QR generation.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link
              href="/create"
              className="bg-[#0e0f0c] hover:bg-[#163300] text-white font-semibold text-sm py-2.5 px-6 rounded-[24px] transition-colors inline-block"
            >
              Open Link Builder &rarr;
            </Link>
            <Link
              href="/"
              className="bg-white hover:bg-[#f4f6f2] text-[#0e0f0c] border border-[#0e0f0c]/20 font-semibold text-sm py-2.5 px-5 rounded-[24px] transition-colors inline-block"
            >
              Go to Home
            </Link>
          </div>
        </div>
      </main>

      <Footer simplified />
    </div>
  );
}