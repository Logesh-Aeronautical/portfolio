import React, { useState } from 'react';
import { Mail, Copy, Check, Github, Send, ShieldCheck, MapPin, GraduationCap } from 'lucide-react';
import { CANDIDATE } from '../data/portfolioData';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleCopy = () => {
    navigator.clipboard.writeText(CANDIDATE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${CANDIDATE.email}?subject=${encodeURIComponent((subject || 'Propulsion Engineering Inquiry') + ' - ' + name)}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 scroll-mt-24 border-t border-slate-800">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Bio & Direct Reach */}
        <div className="lg:col-span-5 space-y-6">
          <span className="text-xs font-mono uppercase text-yellow-400 tracking-widest px-3.5 py-1 rounded-full bg-yellow-950/70 border border-yellow-700/50">
            Direct Contact & Hiring
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Let's Engineer High-Performance Propulsion & Flight Systems
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
            Actively seeking core <strong className="text-white">Propulsion R&D, Rotorcraft Structural Dynamics, and Aerothermal Simulation</strong> engineering opportunities.
          </p>

          <div className="space-y-3 pt-2">
            
            {/* Email Copy Card */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-yellow-500/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Primary Email</div>
                  <a href={`mailto:${CANDIDATE.email}`} className="text-xs sm:text-sm font-bold text-white hover:text-yellow-400 transition-colors">
                    {CANDIDATE.email}
                  </a>
                </div>
              </div>

              <button
                onClick={handleCopy}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all"
                title="Copy Email"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Academic Institution Card */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-400">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase">Education</div>
                <div className="text-xs sm:text-sm font-bold text-white">{CANDIDATE.degree}</div>
                <div className="text-[11px] text-slate-400">{CANDIDATE.institution}</div>
              </div>
            </div>

            {/* Location Card */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-400">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase">Location</div>
                <div className="text-xs sm:text-sm font-bold text-white">{CANDIDATE.location}</div>
              </div>
            </div>

            {/* GitHub Card */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-white">
                <Github className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase">Code & CAD Repository</div>
                <a
                  href={CANDIDATE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm font-bold text-green-400 hover:text-green-300 transition-colors"
                >
                  github.com/Logesh-Aeronautical
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Right Contact Form */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-8 rounded-3xl space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-white font-mono flex items-center gap-2">
              <Send className="w-4 h-4 text-yellow-400" />
              <span>Send Direct Engineering Message</span>
            </h3>

            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Your Name / Organization</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Dr. Engineering Lead / Aerospace Recruiter"
                className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-yellow-400"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Subject / Project Domain</label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Propulsion Engineering Discussion / R&D Opportunity"
                className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-yellow-400"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Message Details</label>
              <textarea
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Hello Logesh, I reviewed your jet engine nozzle bleed air cooling and helicopter skid impact work..."
                className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-yellow-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-yellow-400 via-amber-500 to-green-500 hover:from-yellow-300 hover:to-green-400 text-slate-950 font-bold text-xs sm:text-sm font-mono shadow-lg shadow-yellow-500/25 hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Transmit Message via Email</span>
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
