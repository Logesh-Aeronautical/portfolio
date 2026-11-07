import React from 'react';
import { Layers, ZoomIn, CheckCircle2, ChevronRight, Activity, Flame } from 'lucide-react';

export default function CaseStudyCard({ study, onSelectImage }) {
  return (
    <div id={`case-study-${study.id}`} className="glass-panel rounded-3xl p-6 sm:p-10 scroll-mt-24 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-mono uppercase text-yellow-400 tracking-widest px-3.5 py-1 rounded-full bg-yellow-950/70 border border-yellow-700/50">
            {study.badge}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-3">
            {study.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            {study.subtitle}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {study.tags.map((tag, idx) => (
            <span key={idx} className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-slate-900/90 text-green-300 border border-green-800/50">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* 4-Sentence Engineering Breakdown (Problem -> Design -> Sim -> Outcome) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              1. Engineering Challenge
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              {study.overview.problem}
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="text-xs font-mono font-bold text-yellow-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
              2. Design & Architecture
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              {study.overview.designApproach}
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="text-xs font-mono font-bold text-green-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-400"></span>
              3. Simulation & Solvers
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              {study.overview.simulationAnalysis}
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950/70 border border-green-900/40 bg-green-950/10 flex flex-col justify-between">
          <div>
            <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              4. Validated Outcome
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              {study.overview.engineeringOutcome}
            </p>
          </div>
        </div>

      </div>

      {/* Key Specifications & Parameters Grid */}
      <div>
        <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Activity className="w-4 h-4 text-yellow-400" />
          <span>Numerical Sizing & Engineering Parameters</span>
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {study.specs.map((s, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-yellow-500/30 transition-all">
              <div className="text-[10px] font-mono text-slate-400 uppercase">{s.label}</div>
              <div className="text-sm sm:text-base font-bold text-white font-mono mt-0.5">{s.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Screenshots & Renders Visual Evidence */}
      <div>
        <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Layers className="w-4 h-4 text-green-400" />
          <span>Visual Verification: 3D CAD Renders & Numerical Contours</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {study.renders.map((render, idx) => (
            <div
              key={idx}
              onClick={() => onSelectImage(render)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 hover:border-yellow-400/50 transition-all flex flex-col"
            >
              <div className="relative aspect-video overflow-hidden bg-slate-900/60">
                <img
                  src={render.url}
                  alt={render.title}
                  className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-xs font-mono text-yellow-300">
                  <ZoomIn className="w-4 h-4" />
                  <span>Inspect Geometry</span>
                </div>
              </div>

              <div className="p-3.5 flex-1 flex flex-col justify-between">
                <div>
                  <h5 className="text-xs font-bold text-white group-hover:text-yellow-400 transition-colors line-clamp-1">
                    {render.title}
                  </h5>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                    {render.caption}
                  </p>
                </div>
                <div className="mt-2 text-[10px] font-mono text-green-400 flex items-center gap-1">
                  <span>Full Resolution View</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
