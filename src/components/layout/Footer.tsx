'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Globe, Mail, Phone, MapPin, Compass } from 'lucide-react';

export const Footer: React.FC = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'UTC',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }) + ' UTC'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          {/* Studio Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 border border-amber-600 bg-amber-700 text-white flex items-center justify-center font-bold text-base tracking-tighter">
                G3
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">G3 ARCHITECTS</span>
            </div>
            <p className="text-stone-400 text-sm max-w-sm leading-relaxed">
              Pioneering carbon-negative spatial systems, low-energy travertine envelopes, and computational space planning across residential, civic, and urban developments globally.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs font-mono text-stone-400">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-stone-800 text-emerald-400 border border-stone-700">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                STUDIO DISPATCH ACTIVE
              </span>
              <span>{time || '00:00:00 UTC'}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-mono tracking-widest text-stone-400 uppercase mb-4">Architecture</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/projects?category=Residential" className="hover:text-white transition-colors">
                  Residential Villas
                </Link>
              </li>
              <li>
                <Link href="/projects?category=Commercial" className="hover:text-white transition-colors">
                  Commercial & Workplaces
                </Link>
              </li>
              <li>
                <Link href="/projects?category=Sustainable" className="hover:text-white transition-colors">
                  Sustainable Zero-Carbon
                </Link>
              </li>
              <li>
                <Link href="/projects?category=Urban Masterplan" className="hover:text-white transition-colors">
                  Urban Masterplanning
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-amber-400 flex items-center gap-1 text-stone-400">
                  Full Archive <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Platforms & Tools */}
          <div>
            <h4 className="text-xs font-mono tracking-widest text-stone-400 uppercase mb-4">Digital Studio</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/ai-planner" className="hover:text-white transition-colors flex items-center gap-1">
                  AI Space Planner <span className="text-[10px] bg-amber-900/60 text-amber-300 px-1.5 rounded">Groq</span>
                </Link>
              </li>
              <li>
                <Link href="/collaboration" className="hover:text-white transition-colors flex items-center gap-1">
                  Live Consultation Room <span className="text-[10px] bg-emerald-950 text-emerald-300 px-1.5 rounded">Pusher</span>
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white transition-colors">
                  BIM & CAD Subscriptions
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  Client Project Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Global Studio Hubs */}
          <div>
            <h4 className="text-xs font-mono tracking-widest text-stone-400 uppercase mb-4">Studio Hubs</h4>
            <ul className="space-y-3 text-xs text-stone-400">
              <li>
                <strong className="text-stone-200 block text-sm">Zurich Hub</strong>
                Bahnhofstrasse 42, 8001 Zürich
              </li>
              <li>
                <strong className="text-stone-200 block text-sm">Tokyo Studio</strong>
                Minato-ku, Roppongi 6-10-1
              </li>
              <li>
                <strong className="text-stone-200 block text-sm">Oslo Research Lab</strong>
                Vulkan 18, 0178 Oslo
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} G3 Architects Studio & Urban Research Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-stone-400 cursor-pointer">Privacy Charter</span>
            <span className="hover:text-stone-400 cursor-pointer">Environmental Declaration</span>
            <span className="hover:text-stone-400 cursor-pointer">AIA & BREEAM Certified</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
