'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, ArrowUpRight } from 'lucide-react';

export const StudioTeam: React.FC = () => {
  const leaders = [
    {
      name: 'Elena Vance, FAIA',
      role: 'Lead Design Principal & Founder',
      specialty: 'Travertine Masonry & Biophilic Cantilevers',
      image: '/images/team1.png',
      location: 'Zurich / Tokyo',
      projects: 'Travertine Pavilion, Cascade Villa',
    },
    {
      name: 'Julian Sterling, PE',
      role: 'Director of Sustainable Engineering',
      specialty: 'Mass Timber Diagrids & Passivhaus Envelopes',
      image: '/images/team2.png',
      location: 'Oslo Lab',
      projects: 'Nordic Clean Energy Hub, Solar Helix',
    },
    {
      name: 'Amara Chen, AIA',
      role: 'Cultural & Civic Studio Lead',
      specialty: 'Acoustic Sculpting & Kinetic Terracotta',
      image: '/images/team3.png',
      location: 'Valencia / Singapore',
      projects: 'Terracotta Monolith Cultural Center',
    },
    {
      name: 'Marcus Thorne',
      role: 'Urban Strategy & Masterplanning Partner',
      specialty: '15-Minute Resilient Eco-Districts',
      image: '/images/team4.png',
      location: 'Rotterdam / New York',
      projects: 'Verdant Linear Urban Masterplan',
    },
  ];

  return (
    <section className="py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-800 font-semibold block">
              STUDIO PRINCIPALS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900">
              Architectural Leadership
            </h2>
            <p className="text-stone-600 text-base max-w-xl">
              Meet the design partners guiding G3’s global commissions across Europe, Asia, and the Americas.
            </p>
          </div>

          <Link
            href="/collaboration"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-900 text-white rounded font-medium text-xs hover:bg-stone-800 transition-colors shadow-sm self-start md:self-auto"
          >
            <span>Consult with Studio Principals</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {leaders.map((member, i) => (
            <div
              key={i}
              className="bg-white rounded-lg border border-stone-200 overflow-hidden shadow-subtle hover:shadow-elevated transition-all duration-300 group flex flex-col"
            >
              <div className="relative h-72 w-full bg-stone-100 overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 block">
                    {member.location}
                  </span>
                  <p className="font-bold text-sm tracking-tight text-white">{member.name}</p>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <p className="text-xs font-semibold text-amber-800">{member.role}</p>
                  <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">{member.specialty}</p>
                </div>

                <div className="pt-3 border-t border-stone-100 text-[11px] font-mono text-stone-500">
                  <span className="block text-stone-400 text-[9px] uppercase">Key Commissions:</span>
                  <span className="text-stone-700 font-medium">{member.projects}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
