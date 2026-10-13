'use client';

import React, { useState } from 'react';
import type { UrlItem } from '@/types/url.types';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import Badge from '@/components/ui/Badge';
import CreateUrlForm from '@/components/create/CreateUrlForm';
import CreatedUrlCard from '@/components/create/CreatedUrlCard';
import RecentUrlsList from '@/components/create/RecentUrlsList';

export default function CreateLinkPage() {
  const [createdUrl, setCreatedUrl] = useState<UrlItem | null>(null);
  const [recentUrls, setRecentUrls] = useState<UrlItem[]>([]);

  const handleUrlCreated = (item: UrlItem) => {
    setCreatedUrl(item);
    setRecentUrls((prev) => [item, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#e8ebe6] text-[#0e0f0c] flex flex-col justify-between selection:bg-[#9fe870] selection:text-[#0e0f0c]">
      <Navbar currentPage="create" />

      <main className="w-full max-w-3xl mx-auto px-6 py-8 sm:py-12 flex-1">
        <div className="text-center mb-8">
          <div className="mb-3">
            <Badge variant="positive" hasDot pulseDot>
              FIBER-OPTIC LINK BUILDER
            </Badge>
          </div>
          <h1 className="font-black text-3xl sm:text-5xl text-[#0e0f0c] tracking-tight leading-[1.08]">
            Create a short URL.
          </h1>
          <p className="mt-3 text-base sm:text-lg text-[#454745] max-w-xl mx-auto leading-relaxed">
            Transform long, cluttered URLs into clean, fast links. Instantly shorten, share, and track your links across the web.
          </p>
        </div>

        <CreateUrlForm onUrlCreated={handleUrlCreated} />

        {createdUrl && <CreatedUrlCard createdUrl={createdUrl} />}

        <RecentUrlsList recentUrls={recentUrls} />
      </main>

      <Footer simplified />
    </div>
  );
}