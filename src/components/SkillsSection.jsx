import React from 'react';
import { SKILLS } from '../data/portfolioData';
import { Cpu, Wrench, Shield, CheckCircle2 } from 'lucide-react';

export default function SkillsSection() {
  return (
    <section id="skills" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 scroll-mt-24 border-t border-slate-800">
      
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="text-xs font-mono uppercase text-cyan-400 tracking-widest px-3.5 py-1 rounded-full bg-cyan-950/70 border border-cyan-800/40">
          Core Technical Competencies
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">
          CAD, FEA/CFD Simulation & Embedded Stack
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
          Demonstrating rigorous analytical design tools, simulation solvers, and hands-on microcontroller hardware prototyping.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {SKILLS.map((cat, idx) => (
          <div key={idx} className="glass-panel p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 mb-4">
                {idx === 0 && <Wrench className="w-5 h-5" />}
                {idx === 1 && <Shield className="w-5 h-5" />}
                {idx === 2 && <Wrench className="w-5 h-5" />}
                {idx === 3 && <Cpu className="w-5 h-5" />}
              </div>
              <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider mb-4">
                {cat.category}
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-300">
                {cat.skills.map((skill, sIdx) => (
                  <li key={sIdx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span className="font-light">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
