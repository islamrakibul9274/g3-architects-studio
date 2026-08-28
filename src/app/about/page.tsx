import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { StudioTeam } from '@/components/home/StudioTeam';
import { LiveStats } from '@/components/home/LiveStats';
import { ShieldCheck, Compass, Trees, Cpu, Award, ArrowUpRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="pt-28 pb-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-stone-100 border border-stone-200 text-xs font-mono text-stone-700">
            <Compass className="w-3.5 h-3.5 text-amber-700" />
            <span>ESTABLISHED 2016 · ZURICH · TOKYO · OSLO</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-stone-900 tracking-tight">
            Architecture for the Next Century.
          </h1>
          <p className="text-xl text-stone-600 leading-relaxed font-normal">
            G3 Architects is an international architectural practice and urban research laboratory dedicated to carbon-negative timber engineering, Roman travertine masonry, and AI-accelerated spatial planning.
          </p>
        </div>

        {/* Narrative & Image Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-6 space-y-6 text-stone-700 leading-relaxed text-sm sm:text-base">
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">
              A Rejection of Disposable Buildings
            </h2>
            <p>
              In an era dominated by superficial glass towers and disposable interior trends, G3 Architects pursues material permanence. We believe buildings should stand for centuries, maturing gracefully like Roman monuments while meeting stringent modern Passivhaus energy certifications.
            </p>
            <p>
              Our studio unites architects, structural mathematicians, and computational spatial planners across Zurich, Tokyo, and Oslo. From private villas hovering over Japanese hills to 40-hectare sponge-city masterplans in Rotterdam, we calibrate every commission against natural daylighting, acoustic reverberation, and zero-carbon life cycles.
            </p>
          </div>

          <div className="lg:col-span-6 relative h-[420px] rounded-2xl overflow-hidden border border-stone-200 shadow-elevated bg-stone-100">
            <Image
              src="/images/architect.png"
              alt="G3 Principal Architect at Work"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Studio Environmental Charter 2026 */}
        <div className="mb-24 p-8 sm:p-12 rounded-2xl bg-stone-50 border border-stone-200 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-800 font-bold block">
              SUSTAINABILITY CHARTER 2026
            </span>
            <h2 className="text-3xl font-bold text-stone-900">Our Four Commitments</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl border border-stone-200 space-y-3">
              <Trees className="w-6 h-6 text-emerald-600" />
              <h3 className="font-bold text-stone-900 text-base">Carbon-Negative Timber</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Prioritizing sustainably harvested Scandinavian CLT and Glulam to store more carbon than the building produces.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-stone-200 space-y-3">
              <ShieldCheck className="w-6 h-6 text-amber-700" />
              <h3 className="font-bold text-stone-900 text-base">Passivhaus Envelopes</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Airtight thermal assemblies reducing operational heating and cooling demand by up to 85%.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-stone-200 space-y-3">
              <Cpu className="w-6 h-6 text-stone-800" />
              <h3 className="font-bold text-stone-900 text-base">Computational AI Zoning</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Groq-accelerated spatial simulations evaluating 10,000+ solar and wind iterations per project.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-stone-200 space-y-3">
              <Award className="w-6 h-6 text-amber-600" />
              <h3 className="font-bold text-stone-900 text-base">Material Circularity</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Demountable dry-joint masonry and recycled facade rainscreens engineered for multi-century reuse.
              </p>
            </div>
          </div>
        </div>

        <LiveStats />
        <StudioTeam />

      </div>
    </div>
  );
}
