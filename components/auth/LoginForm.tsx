'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { login } from '@/services/auth.service';
import { getApiErrorMessage } from '@/services/apiClient';
import { STORAGE_KEYS } from '@/constants/api.constants';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Alert from '@/components/ui/Alert';

export const LoginForm: React.FC = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await login({ email: email.trim(), password });
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, res.token);
        localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(res.user));
      }
      router.push('/dashboard');
    } catch (err: unknown) {
      const msg = getApiErrorMessage(err);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[460px] bg-white rounded-[24px] p-8 sm:p-10 shadow-[0_8px_32px_rgba(14,15,12,0.04)] border border-[#0e0f0c]/5">
      <div className="mb-6">
        <h2 className="font-black text-3xl text-[#0e0f0c] tracking-tight">
          Log in
        </h2>
        <p className="text-sm text-[#454745] mt-1.5">
          Enter your email and password to access your dashboard.
        </p>
      </div>

      {error && (
        <div className="mb-6">
          <Alert variant="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email address"
          id="login-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@domain.com"
        />

        <div>
          <Input
            label="Password"
            id="login-password"
            type={showPassword ? 'text' : 'password'}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            rightElement={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-xs font-semibold text-[#454745] hover:text-[#0e0f0c] p-1 cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            }
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          isLoading={loading}
          className="mt-2"
        >
          Log in
        </Button>
      </form>

      <div className="mt-6 pt-5 border-t border-[#e8ebe6] text-center">
        <p className="text-sm text-[#454745]">
          Don&apos;t have an account?{' '}
          <Link
            href="/signup"
            className="font-bold text-[#0e0f0c] hover:underline transition"
          >
            Sign up
          </Link>
        </p>
      </div>

      <p className="mt-4 text-center text-xs text-[#868685]">
        By logging in, you agree to our{' '}
        <span className="underline cursor-pointer">Terms of Use</span> and{' '}
        <span className="underline cursor-pointer">Privacy Policy</span>.
      </p>
    </div>
  );
};

export default LoginForm;
