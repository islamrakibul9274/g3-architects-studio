'use client';

import React, { useState } from 'react';
import { Sparkles, Cpu, Layers, DollarSign, Leaf, Compass, ArrowRight, Loader2, FileText, CheckCircle2, Sliders } from 'lucide-react';
import Link from 'next/link';

export const AIPlanner: React.FC = () => {
  const [plotSize, setPlotSize] = useState('1,200 sq.m (approx 12,900 sq.ft)');
  const [buildingType, setBuildingType] = useState('Luxury Biophilic Residential Villa');
  const [style, setStyle] = useState('Nordic Brutalist & Roman Travertine');
  const [budget, setBudget] = useState('$3M - $6M');
  const [location, setLocation] = useState('Sloped Mountain Terrain / Temperate Climate');
  const [specialRequirements, setSpecialRequirements] = useState(
    'Cantilevered living volume over ravine, passivhaus envelope, geothermal heat pump, subterranean gallery, rainwater harvesting.'
  );

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/ai/planner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plotSize,
          buildingType,
          style,
          budget,
          location,
          specialRequirements,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate feasibility report');
      }

      setResult(data.data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'AI Computation server is momentarily unavailable.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Intro Header */}
      <div className="max-w-3xl mb-12 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-50 border border-amber-200 text-xs font-mono text-amber-900">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          <span>GROQ-ACCELERATED COMPUTATIONAL FEASIBILITY</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
          AI Architectural Space Planner & Feasibility Engine
        </h1>
        <p className="text-stone-600 text-base leading-relaxed">
          Input your site topography, desired building program, and aesthetic vision. Our high-throughput AI analyzes spatial zoning, structural systems, passivhaus envelope metrics, and estimated construction budgets in seconds.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form Inputs */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-xl border border-stone-200 shadow-subtle space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-stone-200">
            <h3 className="font-bold text-lg text-stone-900 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-amber-700" />
              Project Parameters
            </h3>
            <span className="text-xs font-mono text-stone-400">Step 1 of 2</span>
          </div>

          <form onSubmit={handleGenerate} className="space-y-4 text-sm">
            <div>
              <label className="block font-medium text-stone-700 text-xs font-mono uppercase mb-1">
                Plot / Site Dimensions
              </label>
              <input
                type="text"
                value={plotSize}
                onChange={(e) => setPlotSize(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-600/30 focus:border-amber-600 bg-stone-50/50"
                placeholder="e.g. 1,500 sq.m / 0.5 acres"
              />
            </div>

            <div>
              <label className="block font-medium text-stone-700 text-xs font-mono uppercase mb-1">
                Building Type & Program
              </label>
              <select
                value={buildingType}
                onChange={(e) => setBuildingType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-600/30 focus:border-amber-600 bg-stone-50/50"
              >
                <option value="Luxury Biophilic Residential Villa">Luxury Biophilic Residential Villa</option>
                <option value="Mass-Timber Commercial Workplace">Mass-Timber Commercial Workplace</option>
                <option value="Civic Cultural Center & Gallery">Civic Cultural Center & Gallery</option>
                <option value="Eco-Resort & Wellness Retreat">Eco-Resort & Wellness Retreat</option>
                <option value="Urban Mixed-Use Residential Complex">Urban Mixed-Use Residential Complex</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-stone-700 text-xs font-mono uppercase mb-1">
                Aesthetic & Material Intent
              </label>
              <input
                type="text"
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-600/30 focus:border-amber-600 bg-stone-50/50"
                placeholder="e.g. Nordic Brutalist, Mass Timber, Travertine"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-medium text-stone-700 text-xs font-mono uppercase mb-1">
                  Budget Target
                </label>
                <input
                  type="text"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-3 py-2 rounded border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-600/30 focus:border-amber-600 bg-stone-50/50"
                  placeholder="e.g. $2M - $5M"
                />
              </div>
              <div>
                <label className="block font-medium text-stone-700 text-xs font-mono uppercase mb-1">
                  Climate / Terrain
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-600/30 focus:border-amber-600 bg-stone-50/50"
                  placeholder="e.g. Mountain / Coastal"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium text-stone-700 text-xs font-mono uppercase mb-1">
                Special Program Requirements & Amenities
              </label>
              <textarea
                rows={3}
                value={specialRequirements}
                onChange={(e) => setSpecialRequirements(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-600/30 focus:border-amber-600 bg-stone-50/50 text-xs leading-relaxed"
                placeholder="List room distribution, cantilever requests, solar orientation..."
              />
            </div>

            {error && (
              <div className="p-3 rounded bg-red-50 border border-red-200 text-red-700 text-xs">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-stone-900 hover:bg-amber-800 text-white font-semibold text-sm rounded transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                  <span>Computing Spatial Feasibility...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Generate Spatial Feasibility Plan</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results Output Screen */}
        <div className="lg:col-span-7 space-y-6">
          {result ? (
            <div className="bg-white rounded-xl border border-stone-200 shadow-elevated p-6 sm:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-3 duration-300">
              
              {/* Output Header */}
              <div className="border-b border-stone-200 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono text-amber-700 uppercase tracking-widest font-semibold block">
                    G3 Computational Feasibility Report
                  </span>
                  <h2 className="text-2xl font-bold text-stone-900 mt-1">
                    {result.projectTitle || 'Architectural Feasibility Analysis'}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded bg-stone-100 border border-stone-200 font-mono text-xs text-stone-700 font-semibold">
                    Area: {result.totalBuiltArea || 'N/A'}
                  </span>
                  <span className="px-3 py-1 rounded bg-emerald-50 border border-emerald-200 font-mono text-xs text-emerald-800 font-semibold">
                    Eff: {result.floorEfficiency || '88%'}
                  </span>
                </div>
              </div>

              {/* Spatial Summary */}
              <div className="p-4 rounded-lg bg-stone-50 border border-stone-200">
                <h4 className="text-xs font-mono uppercase text-stone-500 mb-1 font-semibold">
                  Executive Spatial Concept
                </h4>
                <p className="text-stone-700 text-sm leading-relaxed">{result.spatialSummary}</p>
              </div>

              {/* Zoning Breakdown */}
              {result.zoningBreakdown && result.zoningBreakdown.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase text-stone-700 font-bold flex items-center gap-2">
                    <Layers className="w-4 h-4 text-amber-700" />
                    Spatial Zoning & Room Distribution
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {result.zoningBreakdown.map((zone: any, i: number) => (
                      <div key={i} className="p-3.5 rounded border border-stone-200 bg-white shadow-subtle space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-stone-900 text-sm">{zone.zone}</span>
                          <span className="text-xs font-mono bg-stone-100 px-2 py-0.5 rounded text-stone-700">
                            {zone.area} ({zone.percentage})
                          </span>
                        </div>
                        <p className="text-xs text-stone-500">{zone.purpose}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommended Materials & Structural Envelope */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {result.recommendedMaterials && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono uppercase text-stone-700 font-bold flex items-center gap-2">
                      <Leaf className="w-4 h-4 text-emerald-600" />
                      Material Palette & Sustainability
                    </h4>
                    <div className="space-y-2">
                      {result.recommendedMaterials.map((mat: any, i: number) => (
                        <div key={i} className="p-3 rounded border border-stone-200 text-xs bg-stone-50">
                          <div className="flex items-center justify-between font-semibold text-stone-900">
                            <span>{mat.name}</span>
                            <span className="text-[10px] font-mono text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                              {mat.sustainabilityRating}
                            </span>
                          </div>
                          <p className="text-stone-600 mt-1">{mat.rationale}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {result.structuralSystem && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono uppercase text-stone-700 font-bold flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-amber-700" />
                      Structural & Envelope Specs
                    </h4>
                    <div className="space-y-2 text-xs">
                      <div className="p-3 rounded border border-stone-200 bg-stone-50">
                        <span className="font-mono text-stone-500 block text-[10px]">PRIMARY FRAME</span>
                        <strong className="text-stone-900 text-xs">{result.structuralSystem.primary}</strong>
                      </div>
                      <div className="p-3 rounded border border-stone-200 bg-stone-50">
                        <span className="font-mono text-stone-500 block text-[10px]">FOUNDATION SUBSTRUCTURE</span>
                        <strong className="text-stone-900 text-xs">{result.structuralSystem.foundation}</strong>
                      </div>
                      <div className="p-3 rounded border border-stone-200 bg-stone-50">
                        <span className="font-mono text-stone-500 block text-[10px]">THERMAL ENVELOPE</span>
                        <strong className="text-stone-900 text-xs">{result.structuralSystem.thermalEnvelope}</strong>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Budget & Cost Matrix */}
              {result.estimatedBudgetRange && (
                <div className="p-4 rounded-lg bg-stone-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block">
                      Estimated Construction Investment
                    </span>
                    <p className="text-xl font-bold mt-0.5">
                      {result.estimatedBudgetRange.low} – {result.estimatedBudgetRange.high}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-stone-400 block font-mono">ESTIMATED RATE</span>
                    <span className="text-sm font-semibold text-amber-400">
                      {result.estimatedBudgetRange.costPerSqFt}
                    </span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <Link
                  href="/collaboration"
                  className="w-full sm:w-auto px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs rounded transition-colors text-center"
                >
                  Discuss with Studio Architect in Live Room →
                </Link>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto px-5 py-2.5 bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs rounded transition-colors text-center"
                >
                  Book Official Commission Review
                </Link>
              </div>

            </div>
          ) : (
            <div className="bg-white rounded-xl border border-stone-200 p-12 text-center shadow-subtle space-y-4">
              <div className="w-16 h-16 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center mx-auto text-amber-700">
                <Compass className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-stone-900">Ready to Compute Spatial Feasibility</h3>
              <p className="text-sm text-stone-600 max-w-md mx-auto">
                Fill in the site dimensions and requirements on the left, or use the pre-filled parameters to run a sample calculation.
              </p>
              <div className="pt-4 grid grid-cols-3 gap-4 max-w-lg mx-auto text-xs text-stone-500 font-mono">
                <div className="p-3 rounded bg-stone-50 border border-stone-200">
                  <span className="font-bold text-stone-800 block">ZONING</span>
                  Square footage ratio
                </div>
                <div className="p-3 rounded bg-stone-50 border border-stone-200">
                  <span className="font-bold text-stone-800 block">MATERIALS</span>
                  Embodied carbon check
                </div>
                <div className="p-3 rounded bg-stone-50 border border-stone-200">
                  <span className="font-bold text-stone-800 block">BUDGET</span>
                  High/Low projection
                </div>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
