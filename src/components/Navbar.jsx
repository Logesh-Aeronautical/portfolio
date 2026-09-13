import React, { useState } from 'react';
import { Menu, X, Github, Mail, ShieldCheck } from 'lucide-react';
import { CANDIDATE } from '../data/portfolioData';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#070b14]/85 border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-cyan-400 flex items-center justify-center font-mono font-extrabold text-slate-950 text-xl shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            L
          </div>
          <div>
            <div className="font-bold text-white text-base tracking-wider flex items-center gap-2">
              LOGESH
              <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800/50">
                <ShieldCheck className="w-3 h-3" />
                Available for ₹25k+ R&D
              </span>
            </div>
            <div className="text-[11px] font-mono text-cyan-400/90 tracking-wider uppercase">
              Aeronautical & Drone Engineer
            </div>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-mono font-medium">
          <a href="#3d-studio" className="text-slate-300 hover:text-cyan-400 transition-colors">3D Studio</a>
          <a href="#case-study-interceptor" className="text-slate-300 hover:text-cyan-400 transition-colors">01. 4.5-Gen Jet</a>
          <a href="#case-study-drone" className="text-slate-300 hover:text-cyan-400 transition-colors">02. UAS Drone</a>
          <a href="#case-study-airfoil" className="text-slate-300 hover:text-cyan-400 transition-colors">03. CFD Airfoil</a>
          <a href="#case-study-embedded" className="text-slate-300 hover:text-cyan-400 transition-colors">04. Avionics</a>
          <a href="#aero-graphs" className="text-slate-300 hover:text-cyan-400 transition-colors">Aero Studies (18)</a>
          <a href="#skills" className="text-slate-300 hover:text-cyan-400 transition-colors">Skills</a>
          <a href="guide.html" target="_blank" rel="noopener noreferrer" className="px-2.5 py-1 rounded-lg bg-sky-950/80 text-cyan-300 border border-cyan-800/40 hover:bg-cyan-900/50 hover:text-white transition-all flex items-center gap-1">
            <span>Guide (PDF)</span>
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={CANDIDATE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white text-xs font-mono border border-slate-800 hover:border-cyan-500/40 transition-all"
          >
            <Github className="w-4 h-4 text-cyan-400" />
            <span>GitHub</span>
          </a>

          <a
            href="#contact"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 hover:from-sky-400 hover:to-cyan-300 text-slate-950 text-xs font-mono font-bold shadow-lg shadow-cyan-500/20 transition-all"
          >
            Connect / Hire
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[#090e1c] border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 font-mono text-xs">
          <a href="#3d-studio" onClick={() => setMobileOpen(false)} className="block py-2 text-slate-300 hover:text-cyan-400">3D Studio (WebGL)</a>
          <a href="#case-study-interceptor" onClick={() => setMobileOpen(false)} className="block py-2 text-slate-300 hover:text-cyan-400">01. 4.5-Gen Interceptor Jet</a>
          <a href="#case-study-drone" onClick={() => setMobileOpen(false)} className="block py-2 text-slate-300 hover:text-cyan-400">02. UAS Drone Chassis (FEA)</a>
          <a href="#case-study-airfoil" onClick={() => setMobileOpen(false)} className="block py-2 text-slate-300 hover:text-cyan-400">03. NACA Airfoil CFD & Stall</a>
          <a href="#case-study-embedded" onClick={() => setMobileOpen(false)} className="block py-2 text-slate-300 hover:text-cyan-400">04. Embedded Avionics (IoT)</a>
          <a href="#aero-graphs" onClick={() => setMobileOpen(false)} className="block py-2 text-slate-300 hover:text-cyan-400">Aeronautical Studies (18 Charts)</a>
          <a href="#skills" onClick={() => setMobileOpen(false)} className="block py-2 text-slate-300 hover:text-cyan-400">Technical Skills</a>
          <a href="#contact" onClick={() => setMobileOpen(false)} className="block py-2 text-cyan-400 font-bold">Contact Logesh</a>
        </div>
      )}
    </header>
  );
}
