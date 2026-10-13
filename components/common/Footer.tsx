import React from 'react';
import Link from 'next/link';
import { APP_CONFIG } from '@/constants/app.constants';
import BrandLogo from '@/components/ui/BrandLogo';

export interface FooterProps {
  simplified?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ simplified = false }) => {
  const currentYear = new Date().getFullYear();

  if (simplified) {
    return (
      <footer className="w-full max-w-7xl mx-auto px-6 py-6 text-center text-xs text-[#868685]">
        &copy; {currentYear} {APP_CONFIG.APP_NAME}. All rights reserved.
      </footer>
    );
  }

  return (
    <footer className="border-t border-[#0e0f0c]/10 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <BrandLogo size="sm" />
          <span className="text-xs text-[#868685]">
            &copy; {currentYear} {APP_CONFIG.APP_NAME}. All rights reserved. Connecting the web, one link at a time.
          </span>
        </div>

        <div className="flex items-center gap-6 text-xs font-semibold text-[#454745]">
          <Link href="#hero" className="hover:text-[#0e0f0c] transition">
            Privacy Policy
          </Link>
          <Link href="#hero" className="hover:text-[#0e0f0c] transition">
            Terms of Service
          </Link>
          <Link href="#hero" className="hover:text-[#0e0f0c] transition">
            API Documentation
          </Link>
          <Link href="#hero" className="hover:text-[#0e0f0c] transition">
            System Status
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
