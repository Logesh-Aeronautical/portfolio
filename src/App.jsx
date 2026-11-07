import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ThreeCanvas from './three/ThreeCanvas';
import CaseStudyCard from './components/CaseStudyCard';
import InteractiveWindTunnel from './components/InteractiveWindTunnel';
import AeronauticalStudiesGallery from './components/AeronauticalStudiesGallery';
import SkillsSection from './components/SkillsSection';
import ContactSection from './components/ContactSection';
import ImageModal from './components/ImageModal';
import { CASE_STUDIES, CANDIDATE } from './data/portfolioData';
import { Box, Sparkles, Compass, Layers, Wind, Flame, Shield, Cpu } from 'lucide-react';

export default function App() {
  const [modalItem, setModalItem] = useState(null);

  return (
    <div className="min-h-screen bg-[#060a07] text-slate-200 selection:bg-yellow-500/30 selection:text-yellow-200 relative overflow-x-hidden">
      
      {/* Background Subtle Aerospace Grid */}
      <div className="fixed inset-0 bg-grid-aerospace pointer-events-none z-0"></div>

      {/* Navigation */}
      <Navbar />

      <main className="relative z-10">
        
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Interactive 3D CAD & Aerodynamics Studio */}
        <section id="3d-studio" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-yellow-400 tracking-widest px-3.5 py-1 rounded-full bg-yellow-950/70 border border-yellow-700/50">
                <Box className="w-3.5 h-3.5" />
                Three.js Interactive Studio
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                Real-Time 3D Propulsion CAD & Multi-Stream Gas Dynamics
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                Inspect 3D jet engine bleed air nozzle cooling passages, explore helicopter skid landing gear geometry, toggle wireframe meshes, and observe dual-color core (Yellow) and bleed coolant (Green) flow streamlines.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              <span>WebGL Hardware Acceleration Active</span>
            </div>
          </div>

          <ThreeCanvas initialModel="nozzle" />
        </section>

        {/* 3. The 4 Focused Core Case Studies */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
          
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-mono uppercase text-green-400 tracking-widest px-3.5 py-1 rounded-full bg-green-950/70 border border-green-800/50">
              Validated Proof-of-Work
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-3">
              Core Engineering Case Studies
            </h2>
            <p className="text-xs sm:text-base text-slate-300 mt-3 leading-relaxed">
              Structured across <strong className="text-white">Engineering Challenge &rarr; Design & Architecture &rarr; Simulation & Solvers &rarr; Validated Outcome</strong>.
            </p>
          </div>

          {/* Case Study 1: Jet Engine Nozzle Bleed Air Cooling */}
          <CaseStudyCard
            study={CASE_STUDIES[0]}
            onSelectImage={(item) => setModalItem(item)}
          />

          {/* Case Study 2: Helicopter Skid Landing Gear Impact Dynamics */}
          <CaseStudyCard
            study={CASE_STUDIES[1]}
            onSelectImage={(item) => setModalItem(item)}
          />

          {/* Case Study 3: Space Rocket Propulsion Nozzle Expansion & Interactive Wind Tunnel */}
          <div className="space-y-8">
            <CaseStudyCard
              study={CASE_STUDIES[2]}
              onSelectImage={(item) => setModalItem(item)}
            />
            {/* Interactive Aerodynamic & Gas Dynamics Tunnel Component */}
            <InteractiveWindTunnel />
          </div>

          {/* Case Study 4: Embedded Flight Telemetry & Avionics */}
          <CaseStudyCard
            study={CASE_STUDIES[3]}
            onSelectImage={(item) => setModalItem(item)}
          />

        </section>

        {/* 4. 18 Parametric Engineering Correlations Gallery */}
        <AeronauticalStudiesGallery
          onSelectGraph={(graph) => setModalItem(graph)}
        />

        {/* 5. Core Technical Competencies & Stack */}
        <SkillsSection />

        {/* 6. Direct Contact & Hiring */}
        <ContactSection />

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#040705] py-10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
            <span>Authored by <strong className="text-slate-200">Logesh R</strong> — B.E. Aeronautical Engineering, Jaya Engineering College</span>
          </div>

          <div className="flex items-center gap-4">
            <a href={CANDIDATE.github} target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-green-300 transition-colors">
              github.com/Logesh-Aeronautical
            </a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">Back to Top &uarr;</a>
          </div>
        </div>
      </footer>

      {/* Zoom / Full Resolution Modal */}
      {modalItem && (
        <ImageModal
          item={modalItem}
          onClose={() => setModalItem(null)}
        />
      )}

    </div>
  );
}
