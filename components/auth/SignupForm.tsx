'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signup } from '@/services/auth.service';
import { getApiErrorMessage } from '@/services/apiClient';
import { STORAGE_KEYS } from '@/constants/api.constants';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Alert from '@/components/ui/Alert';

export const SignupForm: React.FC = () => {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // calculate password strength score
  const getPasswordStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 6) score += 1;
    if (pwd.length >= 10) score += 1;
    if (/[A-Z]/.test(pwd) || /[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;
    return score;
  };

  const strength = getPasswordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await signup({
        name: name.trim(),
        email: email.trim(),
        password,
      });

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
          Create an account
        </h2>
        <p className="text-sm text-[#454745] mt-1.5">
          Start shortening and measuring your links today.
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
          label="Full name"
          id="signup-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Jane Doe"
        />

        <Input
          label="Email address"
          id="signup-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@domain.com"
        />

        <div>
          <Input
            label="Password"
            id="signup-password"
            type={showPassword ? 'text' : 'password'}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
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

          {password.length > 0 && (
            <div className="mt-2 flex items-center gap-1.5">
              <div
                className={`h-1 flex-1 rounded-full transition-colors ${
                  strength >= 1 ? 'bg-[#2ead4b]' : 'bg-[#e8ebe6]'
                }`}
              />
              <div
                className={`h-1 flex-1 rounded-full transition-colors ${
                  strength >= 2 ? 'bg-[#2ead4b]' : 'bg-[#e8ebe6]'
                }`}
              />
              <div
                className={`h-1 flex-1 rounded-full transition-colors ${
                  strength >= 3 ? 'bg-[#2ead4b]' : 'bg-[#e8ebe6]'
                }`}
              />
              <div
                className={`h-1 flex-1 rounded-full transition-colors ${
                  strength >= 4 ? 'bg-[#2ead4b]' : 'bg-[#e8ebe6]'
                }`}
              />
              <span className="text-[11px] text-[#454745] font-medium ml-1">
                {strength <= 1 && 'Weak'}
                {strength === 2 && 'Fair'}
                {strength === 3 && 'Good'}
                {strength >= 4 && 'Strong'}
              </span>
            </div>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          isLoading={loading}
          className="mt-3"
        >
          Create account
        </Button>
      </form>

      <div className="mt-6 pt-5 border-t border-[#e8ebe6] text-center">
        <p className="text-sm text-[#454745]">
          Already have an account?{' '}
          <Link
            href="/login"
            className="font-bold text-[#0e0f0c] hover:underline transition"
          >
            Log in
          </Link>
        </p>
      </div>

      <p className="mt-4 text-center text-xs text-[#868685]">
        By registering, you agree to our{' '}
        <span className="underline cursor-pointer">Terms of Use</span> and{' '}
        <span className="underline cursor-pointer">Privacy Policy</span>.
      </p>
    </div>
  );
};

export default SignupForm;
