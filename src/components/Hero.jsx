import React from 'react';
import { ArrowDownRight, Compass, Layers, Cpu, Wind, FileText, CheckCircle2 } from 'lucide-react';
import { CANDIDATE } from '../data/portfolioData';

export default function Hero() {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Background Glows */}
      <div className="radar-glow-bg top-0 left-1/4 -z-10"></div>

      <div className="max-w-4xl space-y-6">
        
        {/* Stipend / R&D Target Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-sky-950/80 border border-sky-800/60 text-xs font-mono text-sky-300">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
          <span>Targeting Core Aeronautical & UAS Engineering R&D ({CANDIDATE.targetStipend})</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-tight">
          Visualizing Flight Physics via <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">3D CAD & Simulation</span>.
        </h1>

        <p className="text-slate-300 text-base sm:text-xl font-light leading-relaxed max-w-3xl">
          Hi, I am <strong className="text-white font-semibold">Logesh</strong> — an Aeronautical Engineer bridging 
          <span className="text-sky-400 font-mono text-sm sm:text-base"> Autodesk Inventor 3D parametric modeling</span>, 
          <span className="text-cyan-400 font-mono text-sm sm:text-base"> ANSYS FEA & CFD numerical analysis</span>, and 
          <span className="text-emerald-400 font-mono text-sm sm:text-base"> embedded flight avionics firmware (ESP32/C++)</span>.
        </p>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-wrap items-center gap-4">
          <a
            href="#3d-studio"
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 hover:from-sky-400 hover:to-cyan-300 text-slate-950 font-bold text-xs sm:text-sm font-mono shadow-lg shadow-cyan-500/25 hover:-translate-y-0.5 transition-all flex items-center gap-2"
          >
            <span>Launch Interactive 3D Studio</span>
            <ArrowDownRight className="w-4 h-4" />
          </a>

          <a
            href="#case-study-interceptor"
            className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-medium text-xs sm:text-sm font-mono border border-slate-700/80 hover:border-sky-500/50 hover:-translate-y-0.5 transition-all flex items-center gap-2"
          >
            <span>Examine 3 Focused Case Studies</span>
          </a>

          <a
            href="guide.html"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3.5 rounded-xl bg-sky-950/60 hover:bg-sky-900/60 text-cyan-300 hover:text-white font-medium text-xs sm:text-sm font-mono border border-cyan-800/50 hover:border-cyan-400 hover:-translate-y-0.5 transition-all flex items-center gap-2"
          >
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>Master Project Guide (PDF)</span>
          </a>
        </div>

        {/* 4 Core Pillars Metric Badges */}
        <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-slate-800/80">
          
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400">
              <Compass className="w-4 h-4" />
              <span>ADP Jet Design</span>
            </div>
            <div className="text-xl font-bold text-white font-mono">Mach 2.1+</div>
            <div className="text-[11px] text-slate-400">High-Low-High Profile</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-mono text-sky-400">
              <Layers className="w-4 h-4" />
              <span>Drone Chassis</span>
            </div>
            <div className="text-xl font-bold text-white font-mono">FoS = 2.45</div>
            <div className="text-[11px] text-slate-400">ANSYS FEA Static Rigidity</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
              <Wind className="w-4 h-4" />
              <span>ANSYS Fluent</span>
            </div>
            <div className="text-xl font-bold text-white font-mono">y+ &le; 1.0</div>
            <div className="text-[11px] text-slate-400">SST k-&omega; Boundary Mesh</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-mono text-indigo-400">
              <Cpu className="w-4 h-4" />
              <span>Avionics & IoT</span>
            </div>
            <div className="text-xl font-bold text-white font-mono">8 Projects</div>
            <div className="text-[11px] text-slate-400">ESP32 / Wokwi / C++</div>
          </div>

        </div>

      </div>

    </section>
  );
}
