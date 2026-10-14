'use client';

// React & Next.js
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Redux Store
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearUser } from '@/store/userSlice';

// UI Components
import BrandLogo from '@/components/ui/BrandLogo';

// Constants & Utilities
import { token_key } from '@/constants/api.constants';
import { getInitials } from '@/utils/auth.utils';

export interface NavbarProps {
  currentPage?: 'home' | 'login' | 'signup' | 'create' | 'dashboard';
  loading?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage = 'home',
  loading: propLoading,
}) => {
  // Routing & DOM References
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Redux Authentication State
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const isAuthenticated = !!user;

  // Component-Level UI States
  const [isMounted, setIsMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Determine active loading state: only active if explicitly passed by parent (e.g. landing page)
  const isAuthChecking = propLoading ?? false;

  // Effect: Mark as mounted on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Close Dropdown on Outside Click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // User Logout - token is removed ONLY on explicit logout action
  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(token_key);
      localStorage.removeItem('token');
    }
    dispatch(clearUser());
    setMenuOpen(false);
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#0e0f0c]/8 shadow-xs">
      <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">
        {/* Brand Logo */}
        <BrandLogo size="md" />

        {/* Desktop In-Page Navigation (Home Page Only) */}
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

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {!isMounted || isAuthChecking ? (
            /* Skeleton Loading State: Pulsing pills while /me check is in flight */
            <div className="flex items-center gap-2 sm:gap-3 animate-pulse" aria-hidden="true">
              <div className="w-16 h-8 rounded-full bg-[#0e0f0c]/6 hidden sm:block" />
              <div className="w-24 sm:w-28 h-8 rounded-full bg-[#0e0f0c]/6" />
            </div>
          ) : isAuthenticated && user ? (
            /* Logged-In State: Connected to Redux userSlice */
            <div className="flex items-center gap-2 sm:gap-3">
              {currentPage !== 'dashboard' && (
                <Link
                  href="/dashboard"
                  className="hidden sm:inline-flex items-center text-xs font-semibold text-[#454745] hover:text-[#0e0f0c] px-3.5 py-2 rounded-full hover:bg-[#f4f6f2] transition"
                >
                  Dashboard
                </Link>
              )}

              {currentPage !== 'create' && (
                <Link
                  href="/create"
                  className="bg-[#9fe870] hover:bg-[#cdffad] text-[#0e0f0c] font-semibold text-xs py-2 px-3.5 sm:px-4 rounded-full transition-colors inline-flex items-center gap-1.5"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <span>New Link</span>
                </Link>
              )}

              {/* User Account Trigger & Popover */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setMenuOpen((prev) => !prev)}
                  className={`group flex items-center gap-2 p-1 sm:pl-1.5 sm:pr-2.5 sm:py-1 rounded-full transition-all cursor-pointer select-none ${
                    menuOpen
                      ? 'bg-[#f4f6f2] ring-1 ring-[#0e0f0c]/10'
                      : 'hover:bg-[#f4f6f2]'
                  }`}
                  aria-label="User account menu"
                  aria-expanded={menuOpen}
                >
                  {/* Subtle Initial Avatar */}
                  <div className="w-8 h-8 rounded-full bg-[#0e0f0c] text-[#9fe870] font-black text-xs flex items-center justify-center uppercase tracking-wider shrink-0 shadow-xs">
                    {getInitials(user?.name)}
                  </div>

                  {/* Name Label */}
                  <span className="text-xs font-semibold text-[#0e0f0c] hidden sm:block max-w-[120px] truncate">
                    {user?.name || 'Account'}
                  </span>

                  {/* Minimalist Chevron */}
                  <svg
                    className={`w-3.5 h-3.5 text-[#868685] transition-transform duration-200 hidden sm:block ${
                      menuOpen ? 'rotate-180 text-[#0e0f0c]' : 'group-hover:text-[#0e0f0c]'
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Popover Dropdown */}
                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-[0_16px_40px_rgba(14,15,12,0.12)] border border-[#0e0f0c]/8 p-2 z-50">
                    {/* User Identity Header Card */}
                    <div className="p-3 bg-[#f4f6f2]/80 rounded-xl mb-1 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#0e0f0c] text-[#9fe870] font-black text-xs flex items-center justify-center uppercase tracking-wider shrink-0 shadow-xs">
                        {getInitials(user?.name)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-[#0e0f0c] truncate leading-tight">
                          {user?.name || 'Account'}
                        </p>
                        <p className="text-[11px] text-[#868685] truncate leading-tight mt-0.5">
                          {user?.email || 'Logged in'}
                        </p>
                      </div>
                    </div>

                    {/* Navigation Actions */}
                    <div className="space-y-0.5">
                      <Link
                        href="/dashboard"
                        onClick={() => setMenuOpen(false)}
                        className="group flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-[#454745] hover:text-[#0e0f0c] hover:bg-[#f4f6f2] rounded-xl transition"
                      >
                        <svg
                          className="w-4 h-4 text-[#868685] group-hover:text-[#0e0f0c] transition"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <rect x="3" y="3" width="7" height="9" rx="1.5" strokeWidth="1.75" />
                          <rect x="14" y="3" width="7" height="5" rx="1.5" strokeWidth="1.75" />
                          <rect x="14" y="12" width="7" height="9" rx="1.5" strokeWidth="1.75" />
                          <rect x="3" y="16" width="7" height="5" rx="1.5" strokeWidth="1.75" />
                        </svg>
                        <span>Dashboard</span>
                      </Link>

                      <Link
                        href="/create"
                        onClick={() => setMenuOpen(false)}
                        className="group flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-[#454745] hover:text-[#0e0f0c] hover:bg-[#f4f6f2] rounded-xl transition"
                      >
                        <svg
                          className="w-4 h-4 text-[#868685] group-hover:text-[#0e0f0c] transition"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.75}
                            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                          />
                        </svg>
                        <span>Shorten URL</span>
                      </Link>
                    </div>

                    {/* Divider & Sign Out */}
                    <div className="mt-1 pt-1 border-t border-[#0e0f0c]/6">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="group w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-[#868685] hover:text-[#d03238] hover:bg-red-50/70 rounded-xl transition cursor-pointer"
                      >
                        <svg
                          className="w-4 h-4 text-[#868685] group-hover:text-[#d03238] transition"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.75}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        <span>Sign out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : currentPage === 'signup' ? (
            /* Logged-Out State: On Signup Page */
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
            /* Logged-Out State: On Login Page */
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
            /* Logged-Out State: Default / Home Page */
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
