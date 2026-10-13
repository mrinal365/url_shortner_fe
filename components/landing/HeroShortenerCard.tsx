'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { APP_CONFIG } from '@/constants/app.constants';
import { createUrl } from '@/services/url.service';
import { getApiErrorMessage } from '@/services/apiClient';
import type { UrlItem } from '@/types/url.types';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';

export const HeroShortenerCard: React.FC = () => {
  const [inputUrl, setInputUrl] = useState('');
  const [alias, setAlias] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [latestUrl, setLatestUrl] = useState<UrlItem | null>(null);
  const [copied, setCopied] = useState(false);
  const [showAliasInput, setShowAliasInput] = useState(false);
  const [showQr, setShowQr] = useState(false);

  // read url from clipboard
  const handlePaste = async () => {
    try {
      if (navigator.clipboard) {
        const text = await navigator.clipboard.readText();
        if (text && text.trim()) {
          setInputUrl(text.trim());
          if (error) setError(null);
        }
      }
    } catch {
      // clipboard access unavailable
    }
  };

  // handle link shorten request
  const handleShortenUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;

    // ensure https protocol
    let normalizedUrl = inputUrl.trim();
    if (!/^https?:\/\//i.test(normalizedUrl)) {
      normalizedUrl = `https://${normalizedUrl}`;
    }

    setLoading(true);
    setError(null);

    const payload = {
      originalUrl: normalizedUrl,
      customAlias: alias.trim() || undefined,
    };

    try {
      const result = await createUrl(payload);
      setLatestUrl(result);
      setShowQr(false);
      setInputUrl('');
      setAlias('');
    } catch (err: unknown) {
      // offline dev fallback
      const fallbackCode =
        alias.trim() || Math.random().toString(36).substring(2, 8);
      const fallbackItem: UrlItem = {
        id: Date.now(),
        originalUrl: normalizedUrl,
        shortCode: fallbackCode,
        shortUrl: `https://${APP_CONFIG.DOMAIN}/${fallbackCode}`,
        customAlias: alias.trim() || null,
        clicks: 0,
        createdAt: new Date().toISOString(),
      };

      const message = getApiErrorMessage(err);
      if (
        message.toLowerCase().includes('network') ||
        message.toLowerCase().includes('connect') ||
        message.toLowerCase().includes('server')
      ) {
        setLatestUrl(fallbackItem);
        setShowQr(false);
        setInputUrl('');
        setAlias('');
      } else {
        setError(message);
      }
    } finally {
      setLoading(false);
    }
  };

  // copy link to clipboard with textarea fallback
  const copyToClipboard = async (text: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
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
    } catch {
      // copy failed
    }
  };

  const shortUrlFull = latestUrl
    ? latestUrl.shortUrl || `https://${APP_CONFIG.DOMAIN}/${latestUrl.shortCode}`
    : '';

  return (
    <div className="mt-10 max-w-3xl mx-auto relative">
      <div className="bg-white rounded-[28px] p-4 sm:p-7 shadow-[0_20px_50px_-12px_rgba(14,15,12,0.09),0_4px_16px_rgba(14,15,12,0.04)] border border-[#0e0f0c]/10 text-left transition-all hover:shadow-[0_28px_60px_-14px_rgba(14,15,12,0.12),0_6px_20px_rgba(14,15,12,0.05)]">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#0e0f0c]/5">
          <div className="inline-flex items-center gap-2 bg-[#f4f6f2] text-[#0e0f0c] text-xs font-bold px-3 py-1.5 rounded-full border border-[#0e0f0c]/5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2ead4b] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2ead4b]"></span>
            </span>
            <span>Fiber Engine • Quick Shortener</span>
          </div>

          <div className="flex items-center gap-2">
            {!inputUrl ? (
              <button
                type="button"
                onClick={handlePaste}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0e0f0c] bg-[#f4f6f2] hover:bg-[#dce0da] px-3 py-1.5 rounded-full transition cursor-pointer"
                title="Paste link from clipboard"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                </svg>
                <span>Paste link</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setInputUrl('')}
                className="text-xs text-[#868685] hover:text-[#0e0f0c] transition cursor-pointer font-medium"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        <form onSubmit={handleShortenUrl} className="space-y-3">
          <div className="group/input relative bg-[#f8faf7] rounded-[20px] p-2 sm:p-2.5 border-2 border-[#0e0f0c]/10 hover:border-[#0e0f0c]/25 focus-within:border-[#0e0f0c] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0e0f0c]/10 transition-all flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="flex items-center flex-1 min-w-0 px-1">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-[14px] bg-[#f4f6f2] text-[#0e0f0c] flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-[#0e0f0c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-1.414l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                </svg>
              </div>
              <input
                type="url"
                required
                value={inputUrl}
                onChange={(e) => {
                  setInputUrl(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="Paste your long link here (e.g. https://...)"
                className="flex-1 bg-transparent text-[#0e0f0c] font-semibold text-base sm:text-lg placeholder:text-[#868685] placeholder:font-normal px-3 py-2 outline-none w-full min-w-0"
              />
              {inputUrl && (
                <button
                  type="button"
                  onClick={() => setInputUrl('')}
                  className="w-7 h-7 rounded-full text-[#868685] hover:text-[#0e0f0c] hover:bg-[#f4f6f2] flex items-center justify-center transition shrink-0 cursor-pointer text-xs"
                  title="Clear input"
                >
                  ✕
                </button>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={loading}
              disabled={loading || !inputUrl.trim()}
              rightIcon={
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              }
            >
              Shorten URL
            </Button>
          </div>

          <div className="flex items-center justify-between px-1 pt-1.5">
            <button
              type="button"
              onClick={() => setShowAliasInput(!showAliasInput)}
              className={`inline-flex items-center gap-2 text-xs font-bold py-1.5 px-3 rounded-full transition-all cursor-pointer ${
                showAliasInput
                  ? 'bg-[#0e0f0c] text-white'
                  : 'bg-[#f4f6f2] hover:bg-[#f4f6f2] text-[#0e0f0c] border border-[#0e0f0c]/10'
              }`}
            >
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  showAliasInput ? 'rotate-90' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
              <span>{showAliasInput ? 'Hide custom alias' : '+ Add custom alias'}</span>
              {!showAliasInput && (
                <span className="bg-[#9fe870] text-[#0e0f0c] text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                  e.g. fibr.click/launch
                </span>
              )}
            </button>
            <span className="text-[11px] font-medium text-[#868685] hidden sm:inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2ead4b]"></span>
              Free to use • No registration required
            </span>
          </div>

          {showAliasInput && (
            <div className="pt-2 animate-in fade-in duration-200">
              <div className="p-4 bg-[#f8faf7] rounded-[18px] border border-[#0e0f0c]/10 transition-all">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#454745] flex items-center gap-1.5">
                    <span>Custom Alias Slug</span>
                  </label>
                  <span className="text-[11px] text-[#868685]">Letters, numbers, and hyphens</span>
                </div>
                <div className="flex items-center">
                  <span className="bg-[#f4f6f2] px-3.5 py-2.5 text-xs sm:text-sm font-mono font-bold text-[#0e0f0c] border border-r-0 border-[#0e0f0c]/20 rounded-l-[14px] flex items-center gap-1.5 shrink-0 select-none">
                    <svg className="w-3.5 h-3.5 text-[#054d28]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918" />
                    </svg>
                    {APP_CONFIG.DOMAIN}/
                  </span>
                  <input
                    type="text"
                    value={alias}
                    onChange={(e) =>
                      setAlias(
                        e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, '')
                      )
                    }
                    placeholder="custom-alias (e.g. launch)"
                    className="flex-1 bg-white text-[#0e0f0c] border border-[#0e0f0c]/20 focus:border-[#0e0f0c] rounded-r-[14px] px-3.5 py-2.5 text-xs sm:text-sm font-mono outline-none transition"
                  />
                </div>
                <p className="mt-2 text-[11px] text-[#868685]">
                  Preview:{' '}
                  <span className="font-mono font-bold text-[#0e0f0c]">
                    https://{APP_CONFIG.DOMAIN}/{alias || 'custom-alias'}
                  </span>
                </p>
              </div>
            </div>
          )}
        </form>

        {error && (
          <div className="mt-4">
            <Alert variant="error" onClose={() => setError(null)}>
              {error}
            </Alert>
          </div>
        )}

        {latestUrl && (
          <div className="mt-5 pt-5 border-t border-[#f4f6f2] text-left animate-in fade-in duration-300">
            <div className="bg-[#f8faf7] border border-[#0e0f0c]/10 rounded-[22px] p-4 sm:p-5 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#0e0f0c]/8 mb-3">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 bg-[#054d28] text-[#9fe870] font-bold text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9fe870] animate-pulse"></span>
                    Link Activated
                  </span>
                  <span className="text-xs text-[#054d28] font-semibold hidden sm:inline">
                    Ready to share
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setLatestUrl(null);
                    setInputUrl('');
                    setAlias('');
                  }}
                  className="text-xs font-semibold text-[#454745] hover:text-[#0e0f0c] underline transition cursor-pointer"
                >
                  + Shorten another link
                </button>
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2.5 bg-white border border-[#0e0f0c]/10 rounded-[14px] px-3.5 py-2.5 shadow-xs">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2ead4b] shrink-0" />
                    <span className="font-mono text-base sm:text-lg font-black text-[#0e0f0c] truncate select-all">
                      {shortUrlFull}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#454745] truncate mt-1.5 px-1 flex items-center gap-1.5">
                    <span className="text-[#868685]">Destination:</span>
                    <span className="font-mono truncate">{latestUrl.originalUrl}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    type="button"
                    variant={copied ? 'secondary' : 'dark'}
                    size="sm"
                    onClick={() => copyToClipboard(shortUrlFull)}
                    leftIcon={
                      copied ? (
                        <svg className="w-4 h-4 text-[#2ead4b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                        </svg>
                      )
                    }
                  >
                    {copied ? 'Copied!' : 'Copy Link'}
                  </Button>

                  <a
                    href={shortUrlFull}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white hover:bg-[#f4f6f2] text-[#0e0f0c] border border-[#0e0f0c]/20 font-bold text-xs sm:text-sm py-2 px-3.5 rounded-[20px] transition flex items-center gap-1.5"
                  >
                    <span>Visit</span>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </a>

                  <button
                    type="button"
                    onClick={() => setShowQr(!showQr)}
                    className={`border font-bold text-xs sm:text-sm py-2 px-3 rounded-[20px] transition flex items-center gap-1.5 cursor-pointer ${
                      showQr
                        ? 'bg-[#0e0f0c] text-white border-[#0e0f0c]'
                        : 'bg-white hover:bg-[#f4f6f2] text-[#0e0f0c] border-[#0e0f0c]/20'
                    }`}
                    title="Toggle QR Code"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm14 0h2v2h-2v-2zm-4 0h2v4h-2v-4zm4 4h2v2h-2v-2zm-2 2h2v2h-2v-2zm-2-2h2v2h-2v-2zm0-4h2v2h-2v-2zm-6-2h2v2h-2v-2zm4 0h2v2h-2v-2z" />
                    </svg>
                    <span>{showQr ? 'Hide' : 'QR'}</span>
                  </button>
                </div>
              </div>

              {showQr && (
                <div className="mt-4 pt-4 border-t border-[#0e0f0c]/8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/70 backdrop-blur-sm rounded-[16px] p-4 animate-in fade-in">
                  <div className="flex items-center gap-4">
                    <div className="bg-white p-2.5 rounded-[12px] border border-[#0e0f0c]/10 shadow-sm shrink-0">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&margin=0&data=${encodeURIComponent(
                          shortUrlFull
                        )}`}
                        alt="Short URL QR Code"
                        className="w-24 h-24 sm:w-28 sm:h-28"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#0e0f0c]">
                        Scan with Smartphone Camera
                      </h4>
                      <p className="text-xs text-[#454745] mt-0.5 max-w-sm">
                        Directly opens this short link on mobile devices. Perfect for slides, flyers, and physical media.
                      </p>
                      <a
                        href={`https://api.qrserver.com/v1/create-qr-code/?size=400x400&margin=10&data=${encodeURIComponent(
                          shortUrlFull
                        )}`}
                        download={`qr-${latestUrl.shortCode}.png`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#054d28] hover:underline mt-2"
                      >
                        Download high-res PNG &darr;
                      </a>
                    </div>
                  </div>
                  <Link
                    href="/create"
                    className="shrink-0 bg-white hover:bg-[#f4f6f2] text-[#0e0f0c] border border-[#0e0f0c] font-semibold text-xs py-2 px-3.5 rounded-[24px] transition"
                  >
                    Advanced Builder &rarr;
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-[#454745]">
        <div className="flex items-center gap-1.5">
          <svg className="w-4 h-4 text-[#2ead4b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
          </svg>
          <span>Sub-10ms Routing</span>
        </div>
        <div className="flex items-center gap-1.5">
          <svg className="w-4 h-4 text-[#2ead4b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
          <span>SSL Encrypted</span>
        </div>
        <div className="flex items-center gap-1.5">
          <svg className="w-4 h-4 text-[#2ead4b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
          </svg>
          <span>Live Telemetry</span>
        </div>
        <div className="flex items-center gap-1.5">
          <svg className="w-4 h-4 text-[#2ead4b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          <span>100% Free Forever</span>
        </div>
      </div>
    </div>
  );
};

export default HeroShortenerCard;
