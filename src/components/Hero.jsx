import React from 'react';
import { ArrowDownRight, Compass, Flame, Shield, Wind, Cpu, FileText, CheckCircle2 } from 'lucide-react';
import { CANDIDATE } from '../data/portfolioData';

export default function Hero() {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Background Glows (Yellow & Green HUD) */}
      <div className="radar-glow-bg top-0 left-1/4 -z-10"></div>
      <div className="radar-glow-green bottom-10 right-10 -z-10"></div>

      <div className="max-w-4xl space-y-6">
        
        {/* Core R&D Target Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-yellow-950/80 border border-yellow-700/60 text-xs font-mono text-yellow-300">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-ping"></span>
          <span>Core Propulsion, Space & Rotorcraft Dynamics R&D Portfolio</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-tight">
          Pioneering Flight & Space via <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-300 to-green-400">Propulsion & Dynamic Simulation</span>.
        </h1>

        <p className="text-slate-300 text-base sm:text-xl font-light leading-relaxed max-w-3xl">
          Hi, I am <strong className="text-white font-semibold">Logesh R</strong> — an Aeronautical Engineer from 
          <span className="text-green-400 font-semibold"> Jaya Engineering College, Chennai</span>, specializing in 
          <span className="text-yellow-400 font-mono text-sm sm:text-base"> Jet Engine Bleed Air Nozzle Cooling Systems</span>, 
          <span className="text-green-400 font-mono text-sm sm:text-base"> Helicopter Skid Dynamic Impact & Cross-Section Sizing</span>, and 
          <span className="text-amber-300 font-mono text-sm sm:text-base"> Compressible CFD / Explicit FEA Simulation</span>.
        </p>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-wrap items-center gap-4">
          <a
            href="#3d-studio"
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-yellow-400 via-amber-500 to-green-500 hover:from-yellow-300 hover:to-green-400 text-slate-950 font-bold text-xs sm:text-sm font-mono shadow-lg shadow-yellow-500/25 hover:-translate-y-0.5 transition-all flex items-center gap-2"
          >
            <span>Launch 3D Propulsion & Airflow Studio</span>
            <ArrowDownRight className="w-4 h-4" />
          </a>

          <a
            href="#case-study-nozzle-cooling"
            className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-medium text-xs sm:text-sm font-mono border border-slate-700/80 hover:border-yellow-400/50 hover:-translate-y-0.5 transition-all flex items-center gap-2"
          >
            <span>Explore Jet Nozzle Cooling System</span>
          </a>

          <a
            href="#case-study-helicopter-skid"
            className="px-5 py-3.5 rounded-xl bg-green-950/60 hover:bg-green-900/60 text-green-300 hover:text-white font-medium text-xs sm:text-sm font-mono border border-green-800/50 hover:border-green-400 hover:-translate-y-0.5 transition-all flex items-center gap-2"
          >
            <Shield className="w-4 h-4 text-green-400" />
            <span>Helicopter Skid Gear Study</span>
          </a>
        </div>

        {/* 4 Core Engineering Metric Badges */}
        <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-slate-800/80">
          
          <div className="p-4 rounded-xl bg-slate-900/60 border border-yellow-500/20 hover:border-yellow-500/40 transition-all space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-mono text-yellow-400">
              <Flame className="w-4 h-4" />
              <span>Bleed Air Cooling</span>
            </div>
            <div className="text-xl font-bold text-white font-mono">ΔT = 235 K</div>
            <div className="text-[11px] text-slate-400">Wall Thermal Attenuation</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-green-500/20 hover:border-green-500/40 transition-all space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-mono text-green-400">
              <Shield className="w-4 h-4" />
              <span>Skid Drop Impact</span>
            </div>
            <div className="text-xl font-bold text-white font-mono">+24% SEA</div>
            <div className="text-[11px] text-slate-400">Energy Absorption Gain</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-yellow-500/20 hover:border-yellow-500/40 transition-all space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-mono text-amber-400">
              <Wind className="w-4 h-4" />
              <span>Rocket Nozzle MOC</span>
            </div>
            <div className="text-xl font-bold text-white font-mono">Mach 3.4+</div>
            <div className="text-[11px] text-slate-400">De Laval Expansion Flow</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-green-500/20 hover:border-green-500/40 transition-all space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-mono text-green-400">
              <Cpu className="w-4 h-4" />
              <span>Avionics & Telemetry</span>
            </div>
            <div className="text-xl font-bold text-white font-mono">6-DOF IMU</div>
            <div className="text-[11px] text-slate-400">ESP32 / Wokwi / C++</div>
          </div>

        </div>

      </div>

    </section>
  );
}
