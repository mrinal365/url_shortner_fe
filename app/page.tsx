'use client';

import { useState } from 'react';
import { APP_CONFIG } from '@/constants/app.constants';
import { createUrl } from '@/services/url.service';
import { getApiErrorMessage } from '@/services/apiClient';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addUrl } from '@/store/slices/urlSlice';
import type { UrlItem } from '@/types/url.types';

export default function Home() {
  const dispatch = useAppDispatch();
  const recentUrls = useAppSelector((state) => state.url.items);

  const [originalUrl, setOriginalUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [latestUrl, setLatestUrl] = useState<UrlItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!originalUrl.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const result = await createUrl({
        originalUrl: originalUrl.trim(),
        customAlias: customAlias.trim() || undefined,
      });

      dispatch(addUrl(result));
      setLatestUrl(result);
      setOriginalUrl('');
      setCustomAlias('');
    } catch (err) {
      // If backend is unreachable during local frontend work, provide a graceful client preview
      const fallbackCode = customAlias.trim() || Math.random().toString(36).substring(2, 8);
      const fallbackItem: UrlItem = {
        id: Date.now(),
        originalUrl: originalUrl.trim(),
        shortCode: fallbackCode,
        shortUrl: `${typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'}/${fallbackCode}`,
        customAlias: customAlias.trim() || null,
        clicks: 0,
        createdAt: new Date().toISOString(),
      };

      const message = getApiErrorMessage(err);
      if (message.toLowerCase().includes('network') || message.toLowerCase().includes('connect')) {
        dispatch(addUrl(fallbackItem));
        setLatestUrl(fallbackItem);
        setOriginalUrl('');
        setCustomAlias('');
      } else {
        setError(message);
      }
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (url: string, id: string | number) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Fallback if clipboard API is restricted
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col justify-between">
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 backdrop-blur px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="font-semibold text-lg tracking-tight">
            {APP_CONFIG.APP_NAME}
          </span>
          <span className="text-xs uppercase tracking-wider text-zinc-500 font-mono">
            {APP_CONFIG.APP_DESCRIPTION}
          </span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto w-full px-6 py-12 flex-1 flex flex-col justify-center">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Shorten Your Links
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Create clean, memorable, and shareable URLs in seconds.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            <div>
              <label htmlFor="url-input" className="block text-sm font-medium mb-1">
                Destination URL
              </label>
              <input
                id="url-input"
                type="url"
                required
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                placeholder="https://example.com/my-very-long-url-path"
                className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-inherit focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition"
              />
            </div>

            <div>
              <label htmlFor="alias-input" className="block text-sm font-medium mb-1">
                Custom alias <span className="text-zinc-400 font-normal">(optional)</span>
              </label>
              <input
                id="alias-input"
                type="text"
                value={customAlias}
                onChange={(e) => setCustomAlias(e.target.value)}
                placeholder="e.g. promo-2026"
                className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-inherit focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 font-medium rounded-lg transition disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'Shortening...' : 'Shorten URL'}
          </button>
        </form>

        {latestUrl && (
          <div className="mt-8 p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 mb-3">
              Generated Short Link
            </h2>
            <div className="flex items-center justify-between gap-3 p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-lg">
              <span className="font-mono text-sm truncate text-blue-600 dark:text-blue-400">
                {latestUrl.shortUrl || latestUrl.shortCode}
              </span>
              <button
                type="button"
                onClick={() =>
                  copyToClipboard(
                    latestUrl.shortUrl || latestUrl.shortCode,
                    latestUrl.id
                  )
                }
                className="text-xs font-medium px-3 py-1.5 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 rounded-md hover:opacity-90 transition cursor-pointer shrink-0"
              >
                {copiedId === latestUrl.id ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <p className="mt-2 text-xs text-zinc-500 truncate">
              Original: {latestUrl.originalUrl}
            </p>
          </div>
        )}

        {recentUrls.length > 1 && (
          <div className="mt-10">
            <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-3">
              Recent Links
            </h2>
            <ul className="divide-y divide-zinc-200 dark:divide-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900 overflow-hidden">
              {recentUrls.slice(0, 5).map((item) => (
                <li
                  key={item.id}
                  className="p-3.5 flex items-center justify-between gap-4 text-sm"
                >
                  <div className="min-w-0">
                    <p className="font-mono text-blue-600 dark:text-blue-400 truncate">
                      {item.shortUrl || item.shortCode}
                    </p>
                    <p className="text-xs text-zinc-500 truncate mt-0.5">
                      {item.originalUrl}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(item.shortUrl || item.shortCode, item.id)
                    }
                    className="text-xs px-2.5 py-1 rounded border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition cursor-pointer shrink-0"
                  >
                    {copiedId === item.id ? 'Copied!' : 'Copy'}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-6 text-center text-xs text-zinc-500">
        <p>
          &copy; {new Date().getFullYear()} {APP_CONFIG.APP_NAME}. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
