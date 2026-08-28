'use client';

import React, { useState } from 'react';
import { useAuth } from '@/components/context/AuthContext';
import { User, Phone, Building, FileText, CheckCircle2, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const { user, refreshUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [company, setCompany] = useState(user?.company || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!user) {
    return (
      <div className="pt-32 text-center">
        <p className="text-sm text-stone-600">Please sign in to view profile settings.</p>
      </div>
    );
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);

    try {
      await fetch('/api/auth/me', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, company, phone, bio }),
      });
      await refreshUser();
      setSaved(true);
    } catch {}
    setSaving(false);
  };

  return (
    <div className="pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-stone-900">Account Settings</h1>
          <p className="text-xs text-stone-500">Manage client contact details and studio profile.</p>
        </div>
        <Link
          href="/dashboard"
          className="text-xs font-semibold px-4 py-2 border border-stone-300 rounded hover:bg-stone-50 text-stone-800"
        >
          Back to Dashboard
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 shadow-subtle p-8 space-y-6">
        <form onSubmit={handleSave} className="space-y-5 text-sm">
          <div>
            <label className="block text-xs font-mono uppercase text-stone-700 mb-1 font-semibold">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-600/30 focus:border-amber-600 bg-stone-50/50"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-stone-700 mb-1 font-semibold">
                Company / Organization
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-600/30 focus:border-amber-600 bg-stone-50/50"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase text-stone-700 mb-1 font-semibold">
                Direct Phone
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-600/30 focus:border-amber-600 bg-stone-50/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-stone-700 mb-1 font-semibold">
              Client Bio & Architectural Interests
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-600/30 focus:border-amber-600 bg-stone-50/50 text-xs"
            />
          </div>

          {saved && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Profile updated successfully.
            </div>
          )}

          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-stone-900 text-white rounded text-xs font-semibold hover:bg-stone-800 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
}
