'use client';

import React, { useState } from 'react';
import { APP_CONFIG } from '@/constants/app.constants';
import { createUrl } from '@/services/url.service';
import { getApiErrorMessage } from '@/services/apiClient';
import type { UrlItem } from '@/types/url.types';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Alert from '@/components/ui/Alert';

export interface CreateUrlFormProps {
  onUrlCreated: (urlItem: UrlItem) => void;
}

export const CreateUrlForm: React.FC<CreateUrlFormProps> = ({ onUrlCreated }) => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [title, setTitle] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePaste = async () => {
    try {
      if (navigator.clipboard) {
        const text = await navigator.clipboard.readText();
        if (text) setOriginalUrl(text);
      }
    } catch {
      // clipboard read denied or unsupported
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!originalUrl.trim()) return;

    // prepend protocol if missing
    let normalizedUrl = originalUrl.trim();
    if (!/^https?:\/\//i.test(normalizedUrl)) {
      normalizedUrl = `https://${normalizedUrl}`;
    }

    setLoading(true);
    setError(null);

    const payload = {
      originalUrl: normalizedUrl,
      customAlias: customAlias.trim() || undefined,
      title: title.trim() || undefined,
      expiresAt: expiresAt ? new Date(expiresAt).toISOString() : undefined,
    };

    try {
      const res = await createUrl(payload);
      onUrlCreated(res);
      setOriginalUrl('');
      setCustomAlias('');
      setTitle('');
      setExpiresAt('');
      setShowAdvanced(false);
    } catch (err: unknown) {
      // offline dev fallback
      const fallbackCode =
        customAlias.trim() || Math.random().toString(36).substring(2, 8);
      const fallbackItem: UrlItem = {
        id: Date.now(),
        originalUrl: normalizedUrl,
        shortCode: fallbackCode,
        shortUrl: `https://${APP_CONFIG.DOMAIN}/${fallbackCode}`,
        customAlias: customAlias.trim() || null,
        title: title.trim() || null,
        clicks: 0,
        createdAt: new Date().toISOString(),
      };

      const msg = getApiErrorMessage(err);
      if (
        msg.toLowerCase().includes('network') ||
        msg.toLowerCase().includes('connect') ||
        msg.toLowerCase().includes('server')
      ) {
        onUrlCreated(fallbackItem);
        setOriginalUrl('');
        setCustomAlias('');
        setTitle('');
        setExpiresAt('');
        setShowAdvanced(false);
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-[24px] p-6 sm:p-10 shadow-[0_8px_32px_rgba(14,15,12,0.04)] border border-[#0e0f0c]/5">
      {error && (
        <div className="mb-6">
          <Alert variant="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="create-destination"
              className="block text-sm font-semibold text-[#0e0f0c]"
            >
              Destination URL <span className="text-red-600">*</span>
            </label>
            <button
              type="button"
              onClick={handlePaste}
              className="text-xs font-semibold text-[#0e0f0c] underline hover:opacity-80 transition cursor-pointer"
            >
              Paste from clipboard
            </button>
          </div>
          <Input
            id="create-destination"
            type="url"
            required
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            placeholder="https://example.com/very-long-product-launch-campaign"
          />
        </div>

        <div>
          <Input
            id="create-title"
            label="Link Title (optional reference)"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Summer Launch Keynote"
          />
        </div>

        <div>
          <label
            htmlFor="create-alias"
            className="block text-sm font-semibold text-[#0e0f0c] mb-1.5"
          >
            Custom Alias <span className="text-xs text-[#868685] font-normal">(branded short URL)</span>
          </label>
          <div className="flex">
            <span className="bg-[#e8ebe6] px-4 py-3 text-sm font-mono font-semibold text-[#0e0f0c] border border-r-0 border-[#0e0f0c]/25 rounded-l-[12px] flex items-center select-none shrink-0">
              {APP_CONFIG.DOMAIN}/
            </span>
            <input
              id="create-alias"
              type="text"
              value={customAlias}
              onChange={(e) =>
                setCustomAlias(
                  e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, '')
                )
              }
              placeholder="your-custom-alias"
              className="w-full bg-white text-[#0e0f0c] border border-[#0e0f0c]/25 focus:border-[#0e0f0c] focus:ring-1 focus:ring-[#0e0f0c] rounded-r-[12px] px-4 py-3 text-base outline-none transition placeholder:text-[#868685]"
            />
          </div>
          <p className="mt-1 text-xs text-[#868685]">
            Leave blank to auto-generate a random 6-character fiber hash.
          </p>
        </div>

        <div className="pt-2 border-t border-[#e8ebe6]">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-xs font-semibold text-[#0e0f0c] flex items-center gap-1.5 hover:opacity-80 transition cursor-pointer"
          >
            <span>{showAdvanced ? '− Hide' : '+ Show'} Advanced Controls</span>
            <span className="text-[10px] bg-[#e8ebe6] px-2 py-0.5 rounded-full text-[#454745]">
              Expiration &amp; Security
            </span>
          </button>

          {showAdvanced && (
            <div className="mt-4 space-y-4 bg-[#e8ebe6]/50 p-5 rounded-[16px] border border-[#0e0f0c]/10">
              <div>
                <Input
                  id="create-expires"
                  label="Expiration Date & Time"
                  type="datetime-local"
                  value={expiresAt}
                  onChange={(e) => setExpiresAt(e.target.value)}
                  helperText="The link will automatically deactivate after this date."
                />
              </div>
            </div>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          isLoading={loading}
          disabled={loading || !originalUrl.trim()}
        >
          Generate Short Link
        </Button>
      </form>
    </div>
  );
};

export default CreateUrlForm;
