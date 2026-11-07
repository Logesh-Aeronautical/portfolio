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
          <span className="text-xs font-mono uppercase text-yellow-400 tracking-widest px-3.5 py-1 rounded-full bg-yellow-950/70 border border-yellow-700/50">
            18 Parametric Engineering Correlations
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 flex items-center gap-3">
            <LineChart className="w-8 h-8 text-yellow-400" />
            <span>Propulsion, Geometry & Aerodynamic Studies</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
            Analytical benchmarks examining installed engine thrust, weight fractions, supersonic sweep angles, and drag rise characteristics across high-speed flight regimes.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', label: 'All 18 Plots' },
            { id: 'propulsion', label: 'Propulsion & Thrust' },
            { id: 'aerodynamics', label: 'L/D & Aerodynamics' },
            { id: 'weight', label: 'Weight Sizing' },
            { id: 'geometry', label: 'Wing Geometry' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all ${
                filter === tab.id
                  ? 'bg-yellow-500 text-slate-950 font-bold shadow-md shadow-yellow-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
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
            onClick={() => onSelectGraph({
              url: `./assets/images/graphs/${graph.file}`,
              title: graph.title,
              caption: graph.desc
            })}
            className="glass-panel rounded-2xl overflow-hidden group cursor-pointer flex flex-col justify-between hover:border-yellow-400/50 transition-all"
          >
            <div>
              <div className="relative aspect-video overflow-hidden bg-slate-950 border-b border-slate-800">
                <img
                  src={`./assets/images/graphs/${graph.file}`}
                  alt={graph.title}
                  className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-xs font-mono text-yellow-300">
                  <ZoomIn className="w-4 h-4" />
                  <span>Inspect High-Res Plot</span>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between text-[10px] font-mono text-yellow-400 uppercase tracking-wider mb-1">
                  <span>Graph #{String(graph.id).padStart(2, '0')}</span>
                  <span className="text-green-400 capitalize">{graph.category}</span>
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-yellow-400 transition-colors line-clamp-1">
                  {graph.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  {graph.desc}
                </p>
              </div>
            </div>

            <div className="px-4 pb-4 pt-1 flex items-center justify-between text-[11px] font-mono text-green-400">
              <span>View Data Analysis</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
