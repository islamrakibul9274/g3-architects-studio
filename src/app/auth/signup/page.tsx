'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/context/AuthContext';
import { ArrowRight, Loader2 } from 'lucide-react';

export default function SignUpPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState<'client' | 'architect'>('client');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, company, role }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to create account');
      }

      login(data.user);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-16 bg-stone-50/50">
      <div className="max-w-md w-full bg-white rounded-xl border border-stone-200 shadow-elevated p-8 space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-10 h-10 bg-stone-900 text-white rounded font-bold flex items-center justify-center mx-auto text-lg">
            G3
          </div>
          <h1 className="text-2xl font-bold text-stone-900">Create Client Studio Account</h1>
          <p className="text-xs text-stone-500">Join our architectural platform for BIM downloads and direct consultation.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div>
            <label className="block text-xs font-mono uppercase text-stone-700 mb-1 font-semibold">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Julian Henderson"
              className="w-full px-3.5 py-2.5 rounded border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-600/30 focus:border-amber-600 bg-stone-50/50"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-stone-700 mb-1 font-semibold">
              Email Address *
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
              Company / Estate Name
            </label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. Henderson Development Group"
              className="w-full px-3.5 py-2.5 rounded border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-600/30 focus:border-amber-600 bg-stone-50/50"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-stone-700 mb-1 font-semibold">
              Account Type
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as any)}
              className="w-full px-3.5 py-2.5 rounded border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-600/30 focus:border-amber-600 bg-stone-50/50"
            >
              <option value="client">Client / Developer / Private Owner</option>
              <option value="architect">Visiting Architect / Collaborator</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-stone-700 mb-1 font-semibold">
              Password (min 6 chars) *
            </label>
            <input
              type="password"
              required
              minLength={6}
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
            className="w-full py-3.5 bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs rounded transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <span>Complete Registration</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-xs text-stone-500">
          Already have an account?{' '}
          <Link href="/auth/signin" className="text-stone-900 font-semibold hover:underline">
            Sign in
          </Link>
        </p>

      </div>
    </div>
  );
}
