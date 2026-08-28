'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Building2, ShieldCheck, Compass, Layers, CheckCircle2 } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-stone-50 via-white to-stone-50/50 border-b border-stone-200">
      {/* Precision Gridlines Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(#1c1917 1px, transparent 1px), linear-gradient(to right, #1c1917 1px, transparent 1px), linear-gradient(to bottom, #1c1917 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading & Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-stone-300 bg-white shadow-subtle text-xs font-mono text-stone-700">
              <span className="w-2 h-2 rounded-full bg-amber-600 animate-ping" />
              <span>G3 DESIGN MATRIX 2026</span>
              <span className="text-stone-300">|</span>
              <span className="text-amber-800 font-semibold">Passivhaus & Biophilic</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-900 leading-[1.08]">
              Sculpting Space with <br />
              <span className="text-amber-800 underline decoration-stone-300 decoration-2 underline-offset-8">
                Precision & Warmth.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-stone-600 max-w-2xl leading-relaxed font-normal">
              G3 Architects synthesizes low-carbon mass timber, Roman travertine masonry, and generative AI space planning to deliver enduring residential villas, civic landmarks, and resilient urban districts.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/projects"
                className="px-6 py-3.5 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-sm rounded-sm transition-all shadow-md flex items-center gap-2 group"
              >
                <span>Explore Architectural Works</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/ai-planner"
                className="px-6 py-3.5 bg-white border border-stone-300 hover:border-amber-700 hover:text-amber-800 text-stone-800 font-semibold text-sm rounded-sm transition-all shadow-subtle flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Launch AI Space Planner</span>
              </Link>
            </div>

            {/* Key Quality Pillars */}
            <div className="pt-6 border-t border-stone-200 grid grid-cols-3 gap-4">
              <div>
                <p className="text-2xl font-extrabold text-stone-900">54+</p>
                <p className="text-xs text-stone-500 font-mono">International Awards</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-stone-900">Net-Zero</p>
                <p className="text-xs text-stone-500 font-mono">Embodied Carbon Standard</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-stone-900">100%</p>
                <p className="text-xs text-stone-500 font-mono">BIM & Realtime Collab</p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Featured Architectural Hero Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-lg overflow-hidden border border-stone-200 shadow-elevated bg-white p-2">
              <div className="relative h-[380px] sm:h-[420px] w-full rounded overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                  alt="Travertine Pavilion Residence"
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Floating Specs Pill */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-stone-200 text-xs font-mono text-stone-900 shadow-subtle flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Featured Project: Kyoto, JP</span>
                </div>

                {/* Bottom Overlay Card */}
                <div className="absolute bottom-4 left-4 right-4 text-white p-3 rounded bg-stone-950/60 backdrop-blur-md border border-white/20">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-bold text-base tracking-tight text-white">Travertine Pavilion Residence</h3>
                      <p className="text-xs text-stone-300">820 sq.m · Passivhaus Certified · 2025</p>
                    </div>
                    <Link
                      href="/projects/travertine-pavilion-residence"
                      className="text-xs font-semibold px-2.5 py-1 bg-amber-600 hover:bg-amber-500 text-white rounded transition-colors"
                    >
                      View Specs
                    </Link>
                  </div>
                </div>
              </div>

              {/* Blueprint Quick Drawer Bar */}
              <div className="mt-2.5 p-2 bg-stone-50 border border-stone-200/80 rounded flex items-center justify-between text-xs text-stone-600">
                <div className="flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-amber-700" />
                  <span className="font-mono font-medium">BIM Level: 300 / CAD Verified</span>
                </div>
                <Link href="/collaboration" className="text-amber-800 font-semibold hover:underline flex items-center gap-1">
                  Live Studio Room →
                </Link>
              </div>
            </div>

            {/* 10+ Years Experience Floating Badge */}
            <div className="absolute -bottom-5 -left-4 bg-stone-900 text-white p-4 rounded shadow-elevated border border-stone-700 hidden sm:flex items-center gap-3.5">
              <div className="w-10 h-10 rounded bg-amber-600 flex items-center justify-center font-bold text-lg text-white">
                10+
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-amber-400">Years Studio Mastery</p>
                <p className="text-xs text-stone-300">Over 1,450+ Masterworks Delivered</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
