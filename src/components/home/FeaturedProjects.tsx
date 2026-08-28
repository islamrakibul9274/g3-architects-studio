'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IProject } from '@/types';
import { INITIAL_PROJECTS } from '@/lib/projectsData';
import { ArrowUpRight, Compass, Layers, Award, MapPin, Bookmark } from 'lucide-react';
import { useAuth } from '@/components/context/AuthContext';

export const FeaturedProjects: React.FC = () => {
  const { user, refreshUser } = useAuth();
  const [projects, setProjects] = useState<IProject[]>(INITIAL_PROJECTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [blueprintModal, setBlueprintModal] = useState<IProject | null>(null);

  const categories = ['All', 'Residential', 'Commercial', 'Sustainable', 'Urban Masterplan', 'Interior & Cultural'];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        if (data.projects && data.projects.length > 0) {
          setProjects(data.projects);
        }
      } catch {}
    };
    fetchProjects();
  }, []);

  const filtered =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());

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
    <section className="py-24 bg-stone-50/50 border-b border-stone-200" id="projects">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading & Category Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-stone-100 border border-stone-200 text-xs font-mono text-stone-700">
              <Compass className="w-3.5 h-3.5 text-amber-700" />
              <span>CURATED ARCHITECTURAL PORTFOLIO</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900">
              Selected Works & Masterplans
            </h2>
            <p className="text-stone-600 text-base max-w-xl">
              Explore our built portfolio spanning residential sanctuaries, timber commercial high-rises, and eco-district masterplans.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1.5 bg-white border border-stone-200 rounded-lg shadow-subtle">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded transition-all ${
                  selectedCategory === cat
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-950 hover:bg-stone-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((project) => {
            const isSaved = user?.savedProjects?.includes(project.slug || project._id || '');
            return (
              <div
                key={project.slug || project._id}
                className="group bg-white rounded-lg border border-stone-200 overflow-hidden shadow-subtle hover:shadow-elevated transition-all duration-300 flex flex-col"
              >
                {/* Project Image Box */}
                <div className="relative h-64 w-full overflow-hidden bg-stone-100">
                  <Image
                    src={project.heroImage}
                    alt={project.title}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  {/* Top Badges */}
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

                  {/* Bookmark Save Button */}
                  <button
                    onClick={(e) => handleToggleSave(project.slug || project._id || '', e)}
                    className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      isSaved
                        ? 'bg-amber-600 text-white'
                        : 'bg-white/90 text-stone-700 hover:bg-white hover:text-stone-950'
                    }`}
                    title={isSaved ? 'Remove from Moodboard' : 'Save to Moodboard'}
                  >
                    <Bookmark className="w-4 h-4 fill-current" />
                  </button>

                  {/* Location & Year Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                    <span className="flex items-center gap-1 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      {project.location}
                    </span>
                    <span className="font-mono text-stone-300">{project.year}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-bold text-xl text-stone-900 group-hover:text-amber-800 transition-colors">
                      <Link href={`/projects/${project.slug}`}>{project.title}</Link>
                    </h3>
                    <p className="text-stone-600 text-sm mt-2 line-clamp-2 leading-relaxed">
                      {project.tagline || project.description}
                    </p>
                  </div>

                  {/* Specs Matrix */}
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

                  {/* Card Actions */}
                  <div className="pt-2 flex items-center justify-between gap-3 border-t border-stone-100">
                    <button
                      onClick={() => setBlueprintModal(project)}
                      className="text-xs font-semibold text-stone-700 hover:text-stone-950 flex items-center gap-1.5 py-1.5 px-2 rounded hover:bg-stone-50 transition-colors"
                    >
                      <Layers className="w-3.5 h-3.5 text-amber-700" />
                      <span>Inspect Blueprint</span>
                    </button>

                    <Link
                      href={`/projects/${project.slug}`}
                      className="text-xs font-semibold px-3 py-1.5 bg-stone-900 hover:bg-amber-800 text-white rounded transition-colors flex items-center gap-1"
                    >
                      <span>Full Spec</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Projects Link */}
        <div className="mt-14 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white border border-stone-300 hover:border-stone-900 text-stone-900 font-semibold text-sm rounded shadow-subtle hover:bg-stone-50 transition-all"
          >
            <span>View All Architectural Drawings & Projects ({projects.length})</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

      {/* Interactive Blueprint Inspection Modal */}
      {blueprintModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-xl max-w-3xl w-full p-6 shadow-elevated border border-stone-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <div>
                <span className="text-xs font-mono text-amber-700 uppercase">CAD Blueprint Viewer</span>
                <h3 className="text-xl font-bold text-stone-900">{blueprintModal.title}</h3>
              </div>
              <button
                onClick={() => setBlueprintModal(null)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-4">
              {blueprintModal.blueprints && blueprintModal.blueprints.length > 0 ? (
                blueprintModal.blueprints.map((bp, i) => (
                  <div key={i} className="border border-stone-200 rounded-lg p-4 bg-stone-50 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-stone-700">
                      <span className="font-bold text-stone-900">{bp.title}</span>
                      <span>Level: {bp.level} · Dim: {bp.dimensions}</span>
                    </div>
                    <div className="relative h-64 w-full rounded-lg overflow-hidden bg-stone-900 border border-stone-300">
                      <Image src={bp.image} alt={bp.title} fill unoptimized className="object-cover opacity-90 invert-[0.1]" />
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-stone-500 text-sm">
                  Full CAD vector package available in Studio Pro & Enterprise subscriptions.
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-stone-200 flex items-center justify-between">
              <Link
                href="/pricing"
                className="text-xs font-semibold text-amber-800 hover:underline"
              >
                Download BIM (.RVT / .IFC) Files →
              </Link>
              <Link
                href={`/projects/${blueprintModal.slug}`}
                onClick={() => setBlueprintModal(null)}
                className="px-4 py-2 text-xs font-semibold bg-stone-900 text-white rounded hover:bg-stone-800"
              >
                Go to Project Case Study
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
