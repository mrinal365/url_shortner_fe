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
interface GuestGuardProps {
  children: React.ReactNode;
}

export default function GuestGuard({ children }: GuestGuardProps) {
  // Navigation & Redux
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Local Loading State - active while checking authentication
  const [loading, setLoading] = useState(true);

  // Check /me API: Redirect to dashboard if logged in, otherwise display guest page
  useEffect(() => {
    getMe()
      .then((res) => {
        if (res?.user) {
          dispatch(setUser(res.user));
          router.replace('/dashboard');
        } else {
          dispatch(clearUser());
          setLoading(false);
        }
      })
      .catch(() => {
        dispatch(clearUser());
        setLoading(false);
      });
  }, [dispatch, router]);

  // Display Loader while /me verification is in progress
  if (loading) {
    return <Loading text="Loading..." />;
  }

  // Render Guest Page (Login / Signup)
  return <>{children}</>;
}
