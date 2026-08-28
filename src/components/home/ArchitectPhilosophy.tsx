'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Layers, ShieldCheck, SunMedium, Wind, Trees, Cpu, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export const ArchitectPhilosophy: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const pillars = [
    {
      title: 'Passivhaus Thermal Envelope',
      subtitle: 'Continuous Insulation & Airtight Assembly',
      icon: ShieldCheck,
      description:
        'By utilizing self-regulating Roman travertine rainscreens and triple-glazed krypton insulation, our buildings achieve up to 85% reduction in heating and cooling energy loads.',
      metric: '85% Energy Drop',
      metricDetail: 'DIN EN ISO 13790 Compliant',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: 'Mass Timber & Low-Carbon Masonry',
      subtitle: 'Carbon Sequestering Glulam & CLT',
      icon: Trees,
      description:
        'We replace energy-intensive structural concrete with engineered Nordic cross-laminated timber, creating spaces that feel tactile, biophilic, and naturally regulate indoor humidity.',
      metric: '-380 kg CO2/sq.m',
      metricDetail: 'Negative Embodied Carbon',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: 'Computational Space & Solar AI',
      subtitle: 'Groq-Accelerated Spatial Simulation',
      icon: Cpu,
      description:
        'Our algorithms test thousands of structural orientations against seasonal solar paths, natural breeze vectors, and acoustic reverberation before the first foundation stone is laid.',
      metric: '10,000+ Iterations',
      metricDetail: 'Real-time Solar Simulation',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    },
  ];

  return (
    <section className="py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-stone-100 border border-stone-200 text-xs font-mono text-stone-700">
            <Layers className="w-3.5 h-3.5 text-amber-700" />
            <span>ARCHITECTURAL METHODOLOGY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900">
            Engineered for Longevity. Sculpted for Living.
          </h2>
          <p className="text-stone-600 text-base leading-relaxed">
            Every G3 commission marries structural durability, timeless materials, and computational design to formulate spaces that age with grace.
          </p>
        </div>

        {/* Interactive Feature Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Tab Selectors */}
          <div className="lg:col-span-5 space-y-3">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              const isSelected = activeTab === index;
              return (
                <div
                  key={pillar.title}
                  onClick={() => setActiveTab(index)}
                  className={`p-5 rounded-lg cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-stone-50 border-amber-600/50 shadow-subtle ring-1 ring-amber-600/20'
                      : 'bg-white border-stone-200 hover:border-stone-300 hover:bg-stone-50/50'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-10 h-10 rounded-md flex items-center justify-center font-bold text-sm ${
                        isSelected ? 'bg-amber-700 text-white' : 'bg-stone-100 text-stone-700'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-base text-stone-900">{pillar.title}</h3>
                        <span className="text-xs font-mono font-semibold text-amber-700">{pillar.metric}</span>
                      </div>
                      <p className="text-xs text-stone-500 font-mono mt-0.5">{pillar.subtitle}</p>
                      <p className="text-sm text-stone-600 mt-2 leading-relaxed">{pillar.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tab Visual & Metric Card */}
          <div className="lg:col-span-7">
            <div className="relative rounded-xl overflow-hidden border border-stone-200 shadow-elevated bg-stone-900 h-[420px]">
              <Image
                src={pillars[activeTab].image}
                alt={pillars[activeTab].title}
                fill
                className="object-cover transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />

              {/* Floating Metric Details */}
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-lg bg-white/95 backdrop-blur-md border border-stone-200 text-stone-900 shadow-elevated flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono text-amber-700 uppercase font-semibold block">
                    {pillars[activeTab].metricDetail}
                  </span>
                  <h4 className="text-xl font-bold text-stone-900 mt-0.5">{pillars[activeTab].title}</h4>
                </div>
                <Link
                  href="/ai-planner"
                  className="px-4 py-2.5 bg-stone-900 hover:bg-amber-800 text-white font-semibold text-xs rounded transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap"
                >
                  <span>Test in AI Planner</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
