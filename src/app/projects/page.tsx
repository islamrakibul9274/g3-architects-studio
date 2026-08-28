'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IProject } from '@/types';
import { INITIAL_PROJECTS } from '@/lib/projectsData';
import { Search, Compass, MapPin, Award, ArrowUpRight, Bookmark } from 'lucide-react';
import { useAuth } from '@/components/context/AuthContext';

export default function ProjectsCatalogPage() {
  const { user, refreshUser } = useAuth();
  const [projects, setProjects] = useState<IProject[]>(INITIAL_PROJECTS);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');

  const categories = ['All', 'Residential', 'Commercial', 'Sustainable', 'Urban Masterplan', 'Interior & Cultural'];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const queryParams = new URLSearchParams();
        if (category !== 'All') queryParams.set('category', category);
        if (search) queryParams.set('search', search);

        const res = await fetch(`/api/projects?${queryParams.toString()}`);
        const data = await res.json();
        if (data.projects) {
          setProjects(data.projects);
        }
      } catch {}
    };
    fetchProjects();
  }, [category, search]);

  const handleToggleSave = async (projectId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      window.location.href = '/auth/signin';
      return;
    }

    const currentSaved = user.savedProjects || [];
    const isSaved = currentSaved.includes(projectId);
    const newSaved = isSaved ? currentSaved.filter((id) => id !== projectId) : [...currentSaved, projectId];

    try {
      await fetch('/api/auth/me', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ savedProjects: newSaved }),
      });
      await refreshUser();
    } catch {}
  };

  return (
    <div className="pt-28 pb-20 bg-stone-50/40 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-stone-100 border border-stone-200 text-xs font-mono text-stone-700">
            <Compass className="w-3.5 h-3.5 text-amber-700" />
            <span>FULL ARCHITECTURAL ARCHIVE</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
            Architectural Works & Masterplans
          </h1>
          <p className="text-stone-600 text-base leading-relaxed">
            Browse our catalog of residential sanctuaries, commercial mass-timber campuses, cultural pavilions, and eco-district masterplans.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-subtle mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded transition-all ${
                  category === cat
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-950 hover:bg-stone-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by title, country, specs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-600/30 focus:border-amber-600 bg-stone-50"
            />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => {
            const isSaved = user?.savedProjects?.includes(project.slug || project._id || '');
            return (
              <div
                key={project.slug || project._id}
                className="group bg-white rounded-lg border border-stone-200 overflow-hidden shadow-subtle hover:shadow-elevated transition-all duration-300 flex flex-col"
              >
                <div className="relative h-64 w-full overflow-hidden bg-stone-100">
                  <Image
                    src={project.heroImage}
                    alt={project.title}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded bg-white/95 backdrop-blur-sm text-[11px] font-mono font-semibold text-stone-900 shadow-sm">
                      {project.category}
                    </span>
                    {project.status === 'Award Winner' && (
                      <span className="px-2 py-1 rounded bg-amber-600 text-white text-[11px] font-mono flex items-center gap-1 shadow-sm">
                        <Award className="w-3 h-3" /> Awarded
                      </span>
                    )}
                  </div>

                  <button
                    onClick={(e) => handleToggleSave(project.slug || project._id || '', e)}
                    className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      isSaved
                        ? 'bg-amber-600 text-white'
                        : 'bg-white/90 text-stone-700 hover:bg-white hover:text-stone-950'
                    }`}
                  >
                    <Bookmark className="w-4 h-4 fill-current" />
                  </button>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                    <span className="flex items-center gap-1 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      {project.location}
                    </span>
                    <span className="font-mono text-stone-300">{project.year}</span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-bold text-xl text-stone-900 group-hover:text-amber-800 transition-colors">
                      <Link href={`/projects/${project.slug}`}>{project.title}</Link>
                    </h3>
                    <p className="text-stone-600 text-sm mt-2 line-clamp-2 leading-relaxed">
                      {project.tagline || project.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-3 border-t border-stone-100 text-xs text-stone-500 font-mono">
                    <div>
                      <span className="text-stone-400 block text-[10px]">TOTAL AREA</span>
                      <strong className="text-stone-800">{project.area}</strong>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px]">BUDGET TIER</span>
                      <strong className="text-stone-800">{project.budget}</strong>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between gap-3 border-t border-stone-100">
                    <span className="text-xs text-stone-500 font-medium">
                      Lead: {project.architectLeader?.name || 'G3 Principal'}
                    </span>
                    <Link
                      href={`/projects/${project.slug}`}
                      className="text-xs font-semibold px-3.5 py-1.5 bg-stone-900 hover:bg-amber-800 text-white rounded transition-colors flex items-center gap-1"
                    >
                      <span>Case Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
