'use client';

import React, { useState } from 'react';
import type { UrlItem } from '@/types/url.types';
import { APP_CONFIG } from '@/constants/app.constants';
import Button from '@/components/ui/Button';

export interface RecentUrlsListProps {
  recentUrls: UrlItem[];
}

export const RecentUrlsList: React.FC<RecentUrlsListProps> = ({ recentUrls }) => {
  const [copiedId, setCopiedId] = useState<string | number | null>(null);

  // copy link to clipboard
  const handleCopy = async (item: UrlItem) => {
    const fullUrl =
      item.shortUrl || `https://${APP_CONFIG.DOMAIN}/${item.shortCode}`;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(fullUrl);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = fullUrl;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // copy failed
    }
  };

  if (!recentUrls || recentUrls.length === 0) return null;

  return (
    <div className="mt-10">
      <h2 className="text-xs font-semibold uppercase tracking-wider text-[#868685] mb-3">
        Recently Shortened URLs
      </h2>
      <div className="bg-white rounded-[24px] border border-[#0e0f0c]/5 overflow-hidden shadow-sm divide-y divide-[#e8ebe6]">
        {recentUrls.slice(0, 5).map((item) => (
          <div
            key={item.id}
            className="p-4 flex items-center justify-between gap-4 text-sm"
          >
            <div className="min-w-0">
              <p className="font-mono font-semibold text-[#0e0f0c] truncate">
                {item.shortUrl || `https://${APP_CONFIG.DOMAIN}/${item.shortCode}`}
              </p>
              <p className="text-xs text-[#868685] truncate mt-0.5">
                {item.title ? `${item.title} • ` : ''}
                {item.originalUrl}
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs font-semibold text-[#054d28] bg-[#e2f6d5] px-2.5 py-0.5 rounded-full">
                {item.clicks} clicks
              </span>
              <Button
                type="button"
                variant={copiedId === item.id ? 'secondary' : 'tertiary'}
                size="sm"
                onClick={() => handleCopy(item)}
              >
                {copiedId === item.id ? 'Copied!' : 'Copy'}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentUrlsList;
