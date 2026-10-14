'use client';

// React & Next.js
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// UI Components
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Alert from '@/components/ui/Alert';

// Custom Components
import PasswordStrengthIndicator from '@/components/auth/PasswordStrengthIndicator';

// Redux Store
import { useAppDispatch } from '@/store/hooks';
import { setUser } from '@/store/userSlice';

// Services & API Client
import { signup } from '@/services/auth.service';
import { getApiErrorMessage } from '@/services/apiClient';

// Constants & Utilities
import { token_key } from '@/constants/api.constants';
import { getPasswordStrength } from '@/utils/auth.utils';

export const SignupForm: React.FC = () => {
  // Routing & Redux Dispatch
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Status State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Computed Values
  const strength = getPasswordStrength(password);

  // Form Submission Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Client-Side Validation
    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    setError(null);

    // 2. Submit Signup Request
    try {
      const res = await signup({
        name: name.trim(),
        email: email.trim(),
        password,
      });

      // 3. Persist Auth Token in LocalStorage & Update Redux
      if (typeof window !== 'undefined') {
        localStorage.setItem(token_key, res.token);
      }
      dispatch(setUser(res.user));
      router.push('/dashboard');
    } catch (err: unknown) {
      // 4. Handle API Error
      const msg = getApiErrorMessage(err);
      setError(msg);
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[460px] bg-white rounded-[24px] p-8 sm:p-10 shadow-[0_8px_32px_rgba(14,15,12,0.04)] border border-[#0e0f0c]/5">
      {/* Header */}
      <div className="mb-6">
        <h2 className="font-black text-3xl text-[#0e0f0c] tracking-tight">
          Create an account
        </h2>
        <p className="text-sm text-[#454745] mt-1.5">
          Start shortening and measuring your links today.
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-6">
          <Alert variant="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        </div>
      )}

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <Input
          label="Full name"
          id="signup-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Jane Doe"
        />

        {/* Email Address */}
        <Input
          label="Email address"
          id="signup-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@domain.com"
        />

        {/* Password */}
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

          {/* Password Strength Indicator */}
          {password.length > 0 && (
            <PasswordStrengthIndicator strength={strength} />
          )}
        </div>

        {/* Submit Button */}
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

      {/* Login Switch */}
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

      {/* Legal Disclaimer */}
      <p className="mt-4 text-center text-xs text-[#868685]">
        By registering, you agree to our{' '}
        <span className="underline cursor-pointer">Terms of Use</span> and{' '}
        <span className="underline cursor-pointer">Privacy Policy</span>.
      </p>
    </div>
  );
};

export default SignupForm;
