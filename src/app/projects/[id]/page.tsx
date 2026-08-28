import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { INITIAL_PROJECTS } from '@/lib/projectsData';
import { MapPin, Award, Layers, ShieldCheck, CheckCircle2, ArrowLeft, ArrowUpRight, Compass, FileDown } from 'lucide-react';

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = INITIAL_PROJECTS.find((p) => p.slug === id || p._id === id);

  if (!project) {
    return notFound();
  }

  return (
    <div className="pt-28 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back navigation */}
        <div className="mb-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-mono text-stone-500 hover:text-stone-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK TO ARCHITECTURAL PORTFOLIO</span>
          </Link>
        </div>

        {/* Project Header */}
        <div className="space-y-4 mb-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded bg-stone-100 text-stone-800 text-xs font-mono font-semibold">
              {project.category}
            </span>
            <span className="px-3 py-1 rounded bg-amber-50 border border-amber-200 text-amber-900 text-xs font-mono font-semibold">
              {project.status}
            </span>
            <span className="text-xs text-stone-400 font-mono">Completed {project.year}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-stone-900 tracking-tight">
            {project.title}
          </h1>
          <p className="text-xl text-stone-600 max-w-3xl leading-relaxed">
            {project.tagline}
          </p>
        </div>

        {/* Hero Image */}
        <div className="relative h-[480px] sm:h-[620px] w-full rounded-2xl overflow-hidden border border-stone-200 shadow-elevated mb-12 bg-stone-100">
          <Image src={project.heroImage} alt={project.title} fill priority className="object-cover" />
        </div>

        {/* Key Metrics Quick Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-6 rounded-xl bg-stone-50 border border-stone-200 mb-16 font-mono text-xs">
          <div>
            <span className="text-stone-400 block text-[10px] uppercase">LOCATION</span>
            <strong className="text-stone-900 text-sm block mt-0.5">{project.location}</strong>
          </div>
          <div>
            <span className="text-stone-400 block text-[10px] uppercase">TOTAL BUILT AREA</span>
            <strong className="text-stone-900 text-sm block mt-0.5">{project.area}</strong>
          </div>
          <div>
            <span className="text-stone-400 block text-[10px] uppercase">COMMISSION CLIENT</span>
            <strong className="text-stone-900 text-sm block mt-0.5">{project.client}</strong>
          </div>
          <div>
            <span className="text-stone-400 block text-[10px] uppercase">INVESTMENT TIER</span>
            <strong className="text-stone-900 text-sm block mt-0.5">{project.budget}</strong>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          
          {/* Description & Narrative */}
          <div className="lg:col-span-8 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-stone-900 mb-4">Architectural Statement & Concept</h2>
              <p className="text-stone-700 text-base leading-relaxed font-normal">
                {project.description}
              </p>
            </div>

            {/* Key Features */}
            {project.features && project.features.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-stone-900">Key Engineering Innovations</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.features.map((feat, i) => (
                    <div key={i} className="p-4 rounded-lg bg-stone-50 border border-stone-200 flex items-start gap-3 text-xs text-stone-700">
                      <CheckCircle2 className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Blueprints Section */}
            {project.blueprints && project.blueprints.length > 0 && (
              <div className="space-y-6 pt-6 border-t border-stone-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-stone-900 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-amber-700" />
                    CAD Blueprints & Cross Sections
                  </h3>
                  <span className="text-xs font-mono text-stone-500">Vector High-Res</span>
                </div>

                <div className="space-y-4">
                  {project.blueprints.map((bp, i) => (
                    <div key={i} className="border border-stone-200 rounded-xl p-5 bg-stone-50 space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <strong className="text-stone-900">{bp.title}</strong>
                        <span className="text-stone-500">{bp.level} · {bp.dimensions}</span>
                      </div>
                      <div className="relative h-72 w-full rounded-lg overflow-hidden bg-stone-900 border border-stone-300">
                        <Image src={bp.image} alt={bp.title} fill className="object-cover invert-[0.1]" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Photo Gallery */}
            {project.gallery && project.gallery.length > 0 && (
              <div className="space-y-4 pt-6 border-t border-stone-200">
                <h3 className="text-xl font-bold text-stone-900">Project Gallery</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.gallery.map((img, i) => (
                    <div key={i} className="relative h-64 rounded-lg overflow-hidden border border-stone-200 bg-stone-100">
                      <Image src={img} alt={`${project.title} view ${i + 1}`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Specs & Credits */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Lead Architect Card */}
            {project.architectLeader && (
              <div className="bg-stone-50 rounded-xl p-6 border border-stone-200 space-y-4">
                <span className="text-xs font-mono text-amber-800 uppercase font-semibold block">
                  LEAD DESIGN PARTNER
                </span>
                <div className="flex items-center gap-3.5">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-stone-300 bg-stone-200">
                    <Image
                      src={project.architectLeader.avatar}
                      alt={project.architectLeader.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-stone-900">{project.architectLeader.name}</h4>
                    <p className="text-xs text-stone-500">{project.architectLeader.role}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Technical Specs Table */}
            {project.specs && project.specs.length > 0 && (
              <div className="bg-white rounded-xl p-6 border border-stone-200 shadow-subtle space-y-4">
                <h4 className="font-bold text-sm text-stone-900">Technical Specifications</h4>
                <div className="divide-y divide-stone-100 text-xs">
                  {project.specs.map((spec, i) => (
                    <div key={i} className="py-2.5">
                      <span className="text-stone-400 font-mono block text-[10px] uppercase">{spec.label}</span>
                      <strong className="text-stone-800 block mt-0.5">{spec.value}</strong>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Book Consultation CTA */}
            <div className="bg-stone-900 text-white rounded-xl p-6 space-y-4">
              <h4 className="font-bold text-base">Inquire About This Typology</h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                Consult with our studio on commissioning a similar biophilic residence or commercial masterplan.
              </p>
              <Link
                href="/contact"
                className="block w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-center font-semibold text-xs rounded transition-colors"
              >
                Inquire With Studio →
              </Link>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
