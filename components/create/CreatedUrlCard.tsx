'use client';

import React, { useState } from 'react';
import type { UrlItem } from '@/types/url.types';
import { APP_CONFIG } from '@/constants/app.constants';
import Button from '@/components/ui/Button';

export interface CreatedUrlCardProps {
  createdUrl: UrlItem;
  onCopy?: (url: string) => void;
}

export const CreatedUrlCard: React.FC<CreatedUrlCardProps> = ({
  createdUrl,
  onCopy,
}) => {
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);

  const shortUrl =
    createdUrl.shortUrl ||
    `https://${APP_CONFIG.DOMAIN}/${createdUrl.shortCode}`;

  // copy generated link with textarea fallback
  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shortUrl);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = shortUrl;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      if (onCopy) onCopy(shortUrl);
    } catch {
      // copy failed
    }
  };

  return (
    <div className="mt-8 pt-8 border-t border-[#e8ebe6]">
      <div className="bg-[#e2f6d5] border border-[#c5edab] rounded-[24px] p-6">
        <div className="flex items-center justify-between pb-3 border-b border-[#c5edab]">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#054d28]">
            Short URL Active &amp; Routed
          </span>
          <span className="bg-[#2ead4b] text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
            &lt; 10ms Latency
          </span>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="min-w-0">
            <span className="font-mono text-xl sm:text-2xl font-black text-[#0e0f0c] block truncate select-all">
              {shortUrl}
            </span>
            <span className="text-xs text-[#054d28] truncate block mt-0.5">
              Destination: {createdUrl.originalUrl}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              type="button"
              variant={copied ? 'secondary' : 'dark'}
              size="sm"
              onClick={handleCopy}
            >
              {copied ? 'Copied!' : 'Copy URL'}
            </Button>
            <Button
              type="button"
              variant={showQr ? 'dark' : 'tertiary'}
              size="sm"
              onClick={() => setShowQr(!showQr)}
            >
              {showQr ? 'Hide QR' : 'QR Code'}
            </Button>
          </div>
        </div>

        {showQr && (
          <div className="mt-4 pt-4 border-t border-[#c5edab] flex flex-col items-center">
            <div className="bg-white p-3 rounded-[16px] shadow-sm border border-[#0e0f0c]/10">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&margin=0&data=${encodeURIComponent(
                  shortUrl
                )}`}
                alt="Short URL QR Code"
                className="w-32 h-32"
                loading="lazy"
              />
            </div>
            <span className="text-xs text-[#054d28] font-mono mt-2">
              Scan with phone camera to open short URL
            </span>
            <a
              href={`https://api.qrserver.com/v1/create-qr-code/?size=400x400&margin=10&data=${encodeURIComponent(
                shortUrl
              )}`}
              download={`qr-${createdUrl.shortCode}.png`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-[#054d28] underline hover:opacity-80 mt-1"
            >
              Download QR Image &darr;
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatedUrlCard;
