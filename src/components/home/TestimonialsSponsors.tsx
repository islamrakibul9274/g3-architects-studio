'use client';

import React from 'react';
import Image from 'next/image';
import { Star, Quote } from 'lucide-react';

export const TestimonialsSponsors: React.FC = () => {
  const sponsors = [
    { name: 'Spotify', logo: '/images/sponsors/spotify.png' },
    { name: 'Amazon HQ', logo: '/images/sponsors/amazon.png' },
    { name: 'Google Real Estate', logo: '/images/sponsors/google.png' },
    { name: 'Figma Design', logo: '/images/sponsors/figma.png' },
    { name: 'Telerama', logo: '/images/sponsors/telerama.png' },
  ];

  const testimonials = [
    {
      quote:
        'G3 Architects realized our Kyoto estate with unprecedented precision. The travertine masonry and passive geothermal cooling keep the villa perfectly balanced without mechanical noise.',
      author: 'Hiroshi Takahashi',
      title: 'Managing Director, Takahashi Capital & Kyoto Arts',
      project: 'Travertine Pavilion Residence',
    },
    {
      quote:
        'Their computational mass-timber design for our Oslo innovation hub allowed us to achieve LEED Platinum 2 months ahead of schedule while generating surplus solar power.',
      author: 'Astrid Lindqvist',
      title: 'VP of Infrastructure, EquiNordic Technologies',
      project: 'Nordic Clean Energy Hub',
    },
  ];

  return (
    <section className="py-24 bg-stone-50/50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Testimonials */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-800 font-semibold block">
              CLIENT TESTIMONIALS
            </span>
            <h2 className="text-3xl font-extrabold text-stone-900 tracking-tight">
              Endorsed by Visionary Clients
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="p-8 rounded-xl bg-white border border-stone-200 shadow-subtle flex flex-col justify-between space-y-6 relative"
              >
                <Quote className="w-10 h-10 text-stone-200 absolute top-6 right-6" />
                
                <div className="flex items-center gap-1 text-amber-600">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-stone-700 text-base leading-relaxed italic relative z-10">
                  "{t.quote}"
                </p>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-stone-900 text-sm">{t.author}</h4>
                    <p className="text-stone-500">{t.title}</p>
                  </div>
                  <span className="font-mono text-[11px] bg-stone-100 text-stone-700 px-2.5 py-1 rounded">
                    {t.project}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Enterprise Partners / Sponsors */}
        <div className="pt-12 border-t border-stone-200">
          <p className="text-center text-xs font-mono tracking-widest text-stone-400 uppercase mb-8">
            Institutional Partners & Enterprise Collaborators
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center opacity-75 grayscale hover:grayscale-0 transition-all duration-300">
            {sponsors.map((s, i) => (
              <div key={i} className="p-4 flex items-center justify-center h-16 w-36 hover:scale-105 transition-transform">
                <Image
                  src={s.logo}
                  alt={s.name}
                  width={120}
                  height={40}
                  className="max-h-10 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
