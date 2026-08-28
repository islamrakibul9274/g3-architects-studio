'use client';

import React, { useState } from 'react';
import { useAuth } from '@/components/context/AuthContext';
import { Calendar, Clock, Mail, Phone, MapPin, CheckCircle2, Loader2, Sparkles, Building, ArrowRight } from 'lucide-react';

export const ConsultationBooking: React.FC = () => {
  const { user } = useAuth();
  const [clientName, setClientName] = useState(user?.name || '');
  const [clientEmail, setClientEmail] = useState(user?.email || '');
  const [clientPhone, setClientPhone] = useState(user?.phone || '');
  const [projectType, setProjectType] = useState('Luxury Residential Villa');
  const [budgetRange, setBudgetRange] = useState('$2M - $5M');
  const [preferredDate, setPreferredDate] = useState('2026-09-15');
  const [preferredTimeSlot, setPreferredTimeSlot] = useState('14:00 UTC (10:00 AM EDT / 4:00 PM CEST)');
  const [notes, setNotes] = useState('');

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName,
          clientEmail,
          clientPhone,
          projectType,
          budgetRange,
          preferredDate,
          preferredTimeSlot,
          notes,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit consultation booking');
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Consultation booking failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-stone-100 border border-stone-200 text-xs font-mono text-stone-700">
          <Calendar className="w-3.5 h-3.5 text-amber-700" />
          <span>RESEND TRANSACTIONAL DISPATCH</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
          Book Studio Architectural Consultation
        </h1>
        <p className="text-stone-600 text-base leading-relaxed">
          Schedule an initial spatial programming and site feasibility review with G3 Design Principals. You will receive an automated confirmation package via email.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Form Column */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-xl border border-stone-200 shadow-elevated">
          {success ? (
            <div className="text-center py-12 space-y-4 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-stone-900">Consultation Session Booked!</h3>
              <p className="text-stone-600 text-sm max-w-md mx-auto">
                A formal consultation calendar invitation and preparation brief has been dispatched to{' '}
                <strong className="text-stone-900">{clientEmail}</strong> via Resend.
              </p>
              <div className="p-4 rounded-lg bg-stone-50 border border-stone-200 text-xs text-stone-700 font-mono max-w-md mx-auto text-left space-y-1.5">
                <p>Project: <strong className="text-stone-900">{projectType}</strong></p>
                <p>Date: <strong className="text-stone-900">{preferredDate}</strong></p>
                <p>Time: <strong className="text-stone-900">{preferredTimeSlot}</strong></p>
              </div>
              <button
                onClick={() => setSuccess(false)}
                className="px-6 py-2.5 bg-stone-900 text-white rounded text-xs font-semibold hover:bg-stone-800"
              >
                Book Another Session
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-stone-700 mb-1 font-semibold">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Dr. Arthur Pendelton"
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
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="e.g. arthur@estate.com"
                    className="w-full px-3.5 py-2.5 rounded border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-600/30 focus:border-amber-600 bg-stone-50/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-stone-700 mb-1 font-semibold">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="e.g. +1 (415) 000-0000"
                    className="w-full px-3.5 py-2.5 rounded border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-600/30 focus:border-amber-600 bg-stone-50/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-stone-700 mb-1 font-semibold">
                    Project Typology *
                  </label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-600/30 focus:border-amber-600 bg-stone-50/50"
                  >
                    <option value="Luxury Residential Villa">Luxury Residential Villa</option>
                    <option value="Mass-Timber Commercial Workplace">Mass-Timber Commercial Workplace</option>
                    <option value="Civic Cultural Center">Civic Cultural Center</option>
                    <option value="Urban Eco-District Masterplan">Urban Eco-District Masterplan</option>
                    <option value="Historic Renovation & Adaptive Reuse">Historic Renovation & Adaptive Reuse</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-stone-700 mb-1 font-semibold">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-600/30 focus:border-amber-600 bg-stone-50/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-stone-700 mb-1 font-semibold">
                    Time Slot *
                  </label>
                  <select
                    value={preferredTimeSlot}
                    onChange={(e) => setPreferredTimeSlot(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-600/30 focus:border-amber-600 bg-stone-50/50"
                  >
                    <option value="10:00 AM UTC (6:00 AM EDT / 12:00 PM CEST)">10:00 AM UTC</option>
                    <option value="14:00 UTC (10:00 AM EDT / 4:00 PM CEST)">14:00 UTC (Recommended)</option>
                    <option value="18:00 UTC (2:00 PM EDT / 8:00 PM CEST)">18:00 UTC</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-stone-700 mb-1 font-semibold">
                  Budget Target Range
                </label>
                <select
                  value={budgetRange}
                  onChange={(e) => setBudgetRange(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-600/30 focus:border-amber-600 bg-stone-50/50"
                >
                  <option value="Under $1M (Residential Feasibility)">Under $1M (Residential Feasibility)</option>
                  <option value="$1M - $3M">$1M - $3M</option>
                  <option value="$3M - $8M">$3M - $8M</option>
                  <option value="$8M - $25M (Commercial / Civic)">$8M - $25M (Commercial / Civic)</option>
                  <option value="$25M+ (Masterplan / Major Development)">$25M+ (Masterplan / Major Development)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-stone-700 mb-1 font-semibold">
                  Site Notes & Program Brief
                </label>
                <textarea
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Share details on plot location, zoning constraints, desired timeline, or architectural ambitions..."
                  className="w-full px-3.5 py-2.5 rounded border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-600/30 focus:border-amber-600 bg-stone-50/50 text-xs leading-relaxed"
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
                className="w-full py-4 bg-amber-700 hover:bg-amber-800 text-white font-semibold text-sm rounded transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Booking Consultation Session...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm Studio Consultation</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Global Studio Directory Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-stone-900 text-white p-8 rounded-xl shadow-elevated space-y-6">
            <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block font-bold">
              GLOBAL PRACTICE LOCATIONS
            </span>
            <h3 className="text-2xl font-bold">Studio Headquarters</h3>
            
            <div className="space-y-4 text-xs text-stone-300 divide-y divide-stone-800">
              <div className="pt-3">
                <strong className="text-white text-sm block">Zurich Studio (Europe HQ)</strong>
                <p className="text-stone-400 mt-1">Bahnhofstrasse 42, 8001 Zürich, Switzerland</p>
                <p className="font-mono text-stone-400 mt-0.5">+41 44 215 8800</p>
              </div>

              <div className="pt-3">
                <strong className="text-white text-sm block">Tokyo Design Atelier</strong>
                <p className="text-stone-400 mt-1">Minato-ku, Roppongi Hills Mori Tower, Tokyo 106-6108</p>
                <p className="font-mono text-stone-400 mt-0.5">+81 3 5500 9200</p>
              </div>

              <div className="pt-3">
                <strong className="text-white text-sm block">Oslo Timber Research Lab</strong>
                <p className="text-stone-400 mt-1">Vulkan 18, 0178 Oslo, Norway</p>
                <p className="font-mono text-stone-400 mt-0.5">+47 22 90 4400</p>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-800 flex items-center gap-3 text-xs text-amber-400 font-mono">
              <Mail className="w-4 h-4" />
              <span>commissions@g3architects.com</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
