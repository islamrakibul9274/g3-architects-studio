'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/context/AuthContext';
import { ArrowRight, Loader2, ShieldCheck, User } from 'lucide-react';

export default function SignInPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Invalid credentials');
      }

      login(data.user);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoDirector = () => {
    setEmail('director@g3architects.com');
    setPassword('Architect2026!');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-16 bg-stone-50/50">
      <div className="max-w-md w-full bg-white rounded-xl border border-stone-200 shadow-elevated p-8 space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-10 h-10 bg-stone-900 text-white rounded font-bold flex items-center justify-center mx-auto text-lg">
            G3
          </div>
          <h1 className="text-2xl font-bold text-stone-900">Sign in to G3 Portal</h1>
          <p className="text-xs text-stone-500">Access your architectural briefs, CAD blueprints, and consultation tickets.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div>
            <label className="block text-xs font-mono uppercase text-stone-700 mb-1 font-semibold">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@domain.com"
              className="w-full px-3.5 py-2.5 rounded border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-600/30 focus:border-amber-600 bg-stone-50/50"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-stone-700 mb-1 font-semibold">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 rounded border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-600/30 focus:border-amber-600 bg-stone-50/50"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs rounded transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Sign In to Account</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Quick Demo Login Helper */}
        <div className="pt-2 border-t border-stone-100">
          <button
            type="button"
            onClick={handleDemoDirector}
            className="w-full py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded text-xs font-mono transition-colors"
          >
            Fill Demo Studio Director Credentials
          </button>
        </div>

        <p className="text-center text-xs text-stone-500">
          Don’t have an account?{' '}
          <Link href="/auth/signup" className="text-amber-800 font-semibold hover:underline">
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
}
