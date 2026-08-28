'use client';

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { SlidersHorizontal, Sparkles, ArrowLeftRight } from 'lucide-react';

export const BeforeAfterSlider: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(position);
    },
    []
  );

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <section className="py-20 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-50 border border-amber-200 text-xs font-mono text-amber-900">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>SPATIAL METAMORPHOSIS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900">
              Before & After: Site Transformation
            </h2>
            <p className="text-stone-600 text-base max-w-xl">
              Drag the interactive divider to observe how our studio converts derelict or raw topography into award-winning biophilic architecture.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-stone-500 bg-stone-50 px-4 py-2 rounded-md border border-stone-200">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-stone-400" />
              Raw Site / Pre-existing
            </span>
            <ArrowLeftRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
              G3 Completed Architecture
            </span>
          </div>
        </div>

        {/* Interactive Comparison Canvas */}
        <div
          ref={containerRef}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={handleMouseMove}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          onTouchMove={handleTouchMove}
          className="relative h-[420px] sm:h-[540px] w-full rounded-xl overflow-hidden cursor-ew-resize select-none border border-stone-300 shadow-elevated bg-stone-100"
        >
          {/* AFTER Image (Background Base) */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85"
              alt="G3 Completed Architecture"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute top-6 right-6 bg-stone-900/80 backdrop-blur-md text-white text-xs font-mono px-3.5 py-1.5 rounded-full border border-stone-700 shadow-md">
              AFTER · G3 COMPLETED VILLA (2025)
            </div>
          </div>

          {/* BEFORE Image (Clipped Overlay) */}
          <div
            className="absolute inset-y-0 left-0 overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <div className="relative w-full h-full" style={{ width: containerRef.current?.offsetWidth || '100%' }}>
              <Image
                src="https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1800&q=85"
                alt="Raw Site Pre-Construction"
                fill
                className="object-cover brightness-95"
              />
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md text-stone-900 text-xs font-mono px-3.5 py-1.5 rounded-full border border-stone-300 shadow-md">
                BEFORE · RAW TERRAIN & RUINS
              </div>
            </div>
          </div>

          {/* Draggable Divider Handle */}
          <div
            className="absolute inset-y-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] flex items-center justify-center pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="w-10 h-10 rounded-full bg-stone-900 text-white border-2 border-white shadow-elevated flex items-center justify-center -ml-[19px]">
              <ArrowLeftRight className="w-4 h-4 text-amber-400" />
            </div>
          </div>
        </div>

        {/* Project Meta Bar below slider */}
        <div className="mt-6 p-4 rounded-lg bg-stone-50 border border-stone-200 flex flex-wrap items-center justify-between gap-4 text-sm">
          <div>
            <p className="font-semibold text-stone-900">Case Study: Kyoto Hillside Geothermal Pavilion</p>
            <p className="text-xs text-stone-500">Transformed 1.2 acres of unstable sloped terrain into a net-zero residential retreat.</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono bg-stone-200 px-2.5 py-1 rounded text-stone-800">
              Structural Carbon: -32%
            </span>
            <span className="text-xs font-mono bg-amber-100 border border-amber-300 px-2.5 py-1 rounded text-amber-900 font-semibold">
              Energy Star: 100/100
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
