'use client';

// React & Next.js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Redux Store
import { useAppDispatch } from '@/store/hooks';
import { setUser, clearUser } from '@/store/userSlice';

// Components & Services
import Loading from '@/components/common/Loading';
import { getMe } from '@/services/auth.service';

// Component Props
interface TokenLayoutProps {
  children: React.ReactNode;
}

export default function TokenLayout({ children }: TokenLayoutProps) {
  // Navigation & Redux
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Local Loading State
  const [loading, setLoading] = useState(true);

  // Authenticate Workspace via /me API
  useEffect(() => {
    getMe()
      .then((res) => {
        if (res?.user) {
          dispatch(setUser(res.user));
          setLoading(false);
        } else {
          dispatch(clearUser());
          router.push('/login');
        }
      })
      .catch(() => {
        dispatch(clearUser());
        router.push('/login');
      });
  }, [dispatch, router]);

  // Display Loader while verification is in progress
  if (loading) {
    return <Loading text="Loading..." />;
  }

  // Render Protected Workspace
  return <>{children}</>;
}
