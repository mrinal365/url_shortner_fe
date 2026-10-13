'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { STORAGE_KEYS } from '@/constants/api.constants';
import BrandLogo from '@/components/ui/BrandLogo';

export interface NavbarProps {
  currentPage?: 'home' | 'login' | 'signup' | 'create' | 'dashboard';
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage = 'home' }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      setIsAuthenticated(!!token);
    }
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#0e0f0c]/8 shadow-xs">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <BrandLogo size="md" />

        {currentPage === 'home' && (
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#454745]">
            <a href="#hero" className="hover:text-[#0e0f0c] transition">
              Overview
            </a>
            <a href="#analytics" className="hover:text-[#0e0f0c] transition">
              Fiber Optics
            </a>
            <a href="#features" className="hover:text-[#0e0f0c] transition">
              Core Engine
            </a>
            <a href="#performance" className="hover:text-[#0e0f0c] transition">
              Why Fibr
            </a>
          </nav>
        )}

        <div className="flex items-center gap-3">
          {currentPage === 'signup' ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-[#454745] hidden sm:inline">
                Already have an account?
              </span>
              <Link
                href="/login"
                className="bg-[#f4f6f2] hover:bg-[#e8ebe6] text-[#0e0f0c] border border-[#0e0f0c]/20 font-semibold text-sm py-2 px-4 rounded-[8px] transition-colors inline-flex items-center"
              >
                Log in
              </Link>
            </div>
          ) : currentPage === 'login' ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-[#454745] hidden sm:inline">
                Don&apos;t have an account?
              </span>
              <Link
                href="/signup"
                className="bg-[#9fe870] hover:bg-[#cdffad] text-[#0e0f0c] font-semibold text-sm py-2 px-4 rounded-[8px] transition-colors inline-flex items-center"
              >
                Create Account
              </Link>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-semibold text-[#0e0f0c] px-3.5 py-2 hover:opacity-80 transition"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="bg-[#9fe870] hover:bg-[#cdffad] text-[#0e0f0c] font-semibold text-sm py-2 px-4 rounded-[8px] transition-colors inline-flex items-center"
              >
                Create Free Account
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
