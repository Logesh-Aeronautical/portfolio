import React, { useState } from 'react';
import { Menu, X, Github, Mail, ShieldCheck, Flame, Compass } from 'lucide-react';
import { CANDIDATE } from '../data/portfolioData';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#060a07]/90 border-b border-yellow-500/20 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-yellow-400 via-amber-500 to-green-500 flex items-center justify-center font-mono font-extrabold text-slate-950 text-xl shadow-lg shadow-yellow-500/20 group-hover:scale-105 transition-transform">
            L
          </div>
          <div>
            <div className="font-bold text-white text-base tracking-wider flex items-center gap-2">
              LOGESH R
              <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-green-950/80 text-green-400 border border-green-800/50">
                <ShieldCheck className="w-3 h-3" />
                Jaya Engineering College
              </span>
            </div>
            <div className="text-[11px] font-mono text-yellow-400/90 tracking-wider uppercase flex items-center gap-1.5">
              <span>Space, Propulsion & Dynamics Engineer</span>
            </div>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-mono font-medium">
          <a href="#3d-studio" className="text-slate-300 hover:text-yellow-400 transition-colors">3D Studio</a>
          <a href="#case-study-nozzle-cooling" className="text-slate-300 hover:text-yellow-400 transition-colors">01. Nozzle Cooling</a>
          <a href="#case-study-helicopter-skid" className="text-slate-300 hover:text-yellow-400 transition-colors">02. Skid Dynamics</a>
          <a href="#case-study-space-propulsion" className="text-slate-300 hover:text-yellow-400 transition-colors">03. Rocket Nozzle</a>
          <a href="#case-study-embedded-avionics" className="text-slate-300 hover:text-yellow-400 transition-colors">04. Avionics</a>
          <a href="#aero-graphs" className="text-slate-300 hover:text-yellow-400 transition-colors">Technical Data</a>
          <a href="#skills" className="text-slate-300 hover:text-yellow-400 transition-colors">Skills</a>
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={CANDIDATE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white text-xs font-mono border border-yellow-500/30 hover:border-yellow-400 transition-all"
          >
            <Github className="w-4 h-4 text-yellow-400" />
            <span>GitHub</span>
          </a>

          <a
            href="#contact"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-yellow-400 to-green-500 hover:from-yellow-300 hover:to-green-400 text-slate-950 text-xs font-mono font-bold shadow-lg shadow-yellow-500/20 hover:scale-105 transition-all"
          >
            Contact Logesh
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-yellow-400"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="md:hidden px-4 pt-2 pb-6 bg-[#080e0a]/95 border-b border-yellow-500/20 space-y-3 font-mono text-xs">
          <a
            href="#3d-studio"
            onClick={() => setMobileOpen(false)}
            className="block py-2 text-slate-200 hover:text-yellow-400"
          >
            3D CAD & Airflow Studio
          </a>
          <a
            href="#case-study-nozzle-cooling"
            onClick={() => setMobileOpen(false)}
            className="block py-2 text-slate-200 hover:text-yellow-400"
          >
            01. Jet Nozzle Bleed Air Cooling
          </a>
          <a
            href="#case-study-helicopter-skid"
            onClick={() => setMobileOpen(false)}
            className="block py-2 text-slate-200 hover:text-yellow-400"
          >
            02. Helicopter Skid Impact Dynamics
          </a>
          <a
            href="#case-study-space-propulsion"
            onClick={() => setMobileOpen(false)}
            className="block py-2 text-slate-200 hover:text-yellow-400"
          >
            03. Space Rocket Nozzle Expansion
          </a>
          <a
            href="#case-study-embedded-avionics"
            onClick={() => setMobileOpen(false)}
            className="block py-2 text-slate-200 hover:text-yellow-400"
          >
            04. Embedded Flight Avionics
          </a>
          <a
            href="#skills"
            onClick={() => setMobileOpen(false)}
            className="block py-2 text-slate-200 hover:text-yellow-400"
          >
            Engineering Skills
          </a>
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="block py-2 text-yellow-400 font-bold"
          >
            Contact & Hiring &rarr;
          </a>
        </div>
      )}
    </header>
  );
}
