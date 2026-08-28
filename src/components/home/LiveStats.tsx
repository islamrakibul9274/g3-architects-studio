'use client';

import React from 'react';
import { Award, Building, Users, Mail, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export const LiveStats: React.FC = () => {
  const stats = [
    {
      icon: Award,
      value: '54',
      suffix: '',
      label: 'Awards Won',
      sublabel: 'AIA, Mies Crown Hall, BREEAM Gold',
      color: 'text-amber-700',
    },
    {
      icon: Building,
      value: '1,458',
      suffix: '+',
      label: 'Projects Delivered',
      sublabel: 'Spanning 28 countries globally',
      color: 'text-stone-900',
    },
    {
      icon: Users,
      value: '590',
      suffix: '+',
      label: 'Clients Partnered',
      sublabel: 'Private estates to civic authorities',
      color: 'text-stone-900',
    },
    {
      icon: Mail,
      value: '22,578',
      suffix: '',
      label: 'Consultations & Inquiries',
      sublabel: 'Direct studio architectural dispatches',
      color: 'text-amber-700',
    },
  ];

  return (
    <section className="py-20 bg-stone-100/70 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-800 font-semibold block mb-1">
              PROVEN STUDIO RECORD
            </span>
            <h2 className="text-3xl font-extrabold text-stone-900 tracking-tight">
              A Decade of Built Excellence
            </h2>
          </div>
          <p className="text-sm text-stone-600 max-w-md">
            Our numbers reflect measurable structural durability, client trust, and international peer recognition.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="p-6 bg-white rounded-lg border border-stone-200 shadow-subtle hover:border-amber-600/50 hover:shadow-architect transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-md bg-stone-50 border border-stone-200 flex items-center justify-center group-hover:bg-amber-50 group-hover:border-amber-200 transition-colors">
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <span className="text-[10px] font-mono text-stone-400">METRIC 0{i + 1}</span>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold tracking-tight text-stone-900 font-mono">
                    {stat.value}
                  </span>
                  <span className="text-2xl font-bold text-amber-700">{stat.suffix}</span>
                </div>

                <h3 className="text-base font-bold text-stone-900 mt-2">{stat.label}</h3>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">{stat.sublabel}</p>
              </div>
            );
          })}
        </div>

        {/* Live Status Bar */}
        <div className="mt-8 p-4 bg-white rounded-lg border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-stone-600">
          <div className="flex items-center gap-3">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span>STUDIO CAPACITY: Accepting Commissions for Q3/Q4 2026</span>
          </div>
          <Link
            href="/contact"
            className="text-amber-800 font-semibold hover:underline flex items-center gap-1"
          >
            Submit Inquiry Brief <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
};
