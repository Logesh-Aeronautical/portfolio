import React, { useState } from 'react';
import { AERONAUTICAL_GRAPHS } from '../data/portfolioData';
import { LineChart, ZoomIn, ChevronRight } from 'lucide-react';

export default function AeronauticalStudiesGallery({ onSelectGraph }) {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all'
    ? AERONAUTICAL_GRAPHS
    : AERONAUTICAL_GRAPHS.filter(g => g.category === filter);

  return (
    <section id="aero-graphs" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 scroll-mt-24">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <span className="text-xs font-mono uppercase text-sky-400 tracking-widest px-3.5 py-1 rounded-full bg-sky-950/70 border border-sky-800/40">
            18 Parametric Plots
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 flex items-center gap-3">
            <LineChart className="w-8 h-8 text-sky-400" />
            <span>Comparative Aeronautical Studies</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-2xl leading-relaxed">
            Historical supersonic combat aircraft benchmarked against Logesh's Project Interceptor, examining empty weight fractions, wing geometry, installed thrust, and transonic wave drag.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', label: 'All 18 Plots' },
            { id: 'weight', label: 'Weight Fraction' },
            { id: 'geometry', label: 'Wing Sizing' },
            { id: 'propulsion', label: 'Thrust & Power' },
            { id: 'aerodynamics', label: 'L/D & Sweep' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all ${filter === tab.id ? 'bg-sky-600 text-white shadow' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of 18 Graphs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(graph => (
          <div
            key={graph.id}
            onClick={() => onSelectGraph(graph)}
            className="glass-panel rounded-2xl overflow-hidden group cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-video overflow-hidden bg-slate-950 border-b border-slate-800">
                <img
                  src={`./assets/images/graphs/${graph.file}`}
                  alt={graph.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-xs font-mono text-cyan-300">
                  <ZoomIn className="w-4 h-4" />
                  <span>Inspect High-Res (300 DPI)</span>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800/40">
                    {graph.category}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">Fig. {graph.id} / 18</span>
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-1">
                  {graph.title}
                </h4>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  {graph.desc}
                </p>
              </div>
            </div>

            <div className="px-4 pb-4 pt-1 flex items-center justify-between text-xs font-mono text-sky-400">
              <span>View Parametric Curve</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
