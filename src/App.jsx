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
import { Box, Sparkles, Compass, Layers, Wind, ShieldAlert, Cpu } from 'lucide-react';

export default function App() {
  const [modalItem, setModalItem] = useState(null);

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200 selection:bg-cyan-500/30 selection:text-white relative overflow-x-hidden">
      
      {/* Background Subtle Grid */}
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
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-cyan-400 tracking-widest px-3.5 py-1 rounded-full bg-cyan-950/70 border border-cyan-800/40">
                <Box className="w-3.5 h-3.5" />
                Three.js Interactive Studio
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                Real-Time 3D CAD Model & Airflow Viewport
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
                Inspect 3D geometries with PBR materials, toggle wireframe CAD meshes, visualize wind-tunnel streamline velocity vectors, or upload your own .GLB file.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>WebGL Hardware Acceleration Active</span>
            </div>
          </div>

          <ThreeCanvas initialModel="jet" />
        </section>

        {/* 3. The 3 Focused Core Case Studies + Avionics */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
          
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-mono uppercase text-sky-400 tracking-widest px-3.5 py-1 rounded-full bg-sky-950/70 border border-sky-800/40">
              Validated Visual Case Studies
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-3">
              Core Engineering Proof-of-Work
            </h2>
            <p className="text-xs sm:text-base text-slate-400 mt-3 leading-relaxed">
              Structured across <strong className="text-white">Problem &rarr; Design & CAD Approach &rarr; Simulation & FEA/CFD Analysis &rarr; Engineering Outcome</strong>.
            </p>
          </div>

          {/* Case Study 1: 4.5-Gen Interceptor Jet */}
          <CaseStudyCard
            study={CASE_STUDIES[0]}
            onSelectImage={(item) => setModalItem(item)}
          />

          {/* Case Study 2: UAS Drone Airframe */}
          <CaseStudyCard
            study={CASE_STUDIES[1]}
            onSelectImage={(item) => setModalItem(item)}
          />

          {/* Case Study 3: NACA Airfoil CFD & Stall Analysis + Interactive Wind Tunnel */}
          <div className="space-y-8">
            <CaseStudyCard
              study={CASE_STUDIES[2]}
              onSelectImage={(item) => setModalItem(item)}
            />
            {/* Interactive Wind Tunnel Component */}
            <InteractiveWindTunnel />
          </div>

          {/* Case Study 4: Embedded Avionics & Flight Telemetry */}
          <CaseStudyCard
            study={CASE_STUDIES[3]}
            onSelectImage={(item) => setModalItem(item)}
          />

        </section>

        {/* 4. 18 Parametric Aeronautical Studies Gallery */}
        <AeronauticalStudiesGallery
          onSelectGraph={(graph) => setModalItem(graph)}
        />

        {/* 5. Core Technical Competencies & Stack */}
        <SkillsSection />

        {/* 6. Direct Contact & Hiring */}
        <ContactSection />

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#05080f] py-10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            <span>Authored by <strong className="text-slate-200">Logesh</strong> — B.E. Aeronautical Engineering</span>
          </div>

          <div className="flex items-center gap-4">
            <a href={CANDIDATE.github} target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:text-cyan-300">
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
