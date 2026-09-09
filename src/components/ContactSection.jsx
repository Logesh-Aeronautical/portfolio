import React, { useState } from 'react';
import { Mail, Copy, Check, Github, Send, Sparkles } from 'lucide-react';
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
    const mailtoUrl = `mailto:${CANDIDATE.email}?subject=${encodeURIComponent((subject || 'Engineering Inquiry') + ' - ' + name)}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 scroll-mt-24 border-t border-slate-800">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Bio & Direct Reach */}
        <div className="lg:col-span-5 space-y-6">
          <span className="text-xs font-mono uppercase text-cyan-400 tracking-widest px-3.5 py-1 rounded-full bg-cyan-950/70 border border-cyan-800/40">
            Direct Contact & Hiring
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Let's Build the Next Generation of Flight Systems
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
            Actively seeking core <strong className="text-white">Aeronautical Engineering, UAS / Drone Airframe Design, and CFD Simulation</strong> roles with a target stipend of <span className="text-cyan-400 font-mono font-semibold">{CANDIDATE.targetStipend}</span>.
          </p>

          <div className="space-y-3 pt-2">
            
            {/* Email Copy Card */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Primary Email</div>
                  <a href={`mailto:${CANDIDATE.email}`} className="text-xs sm:text-sm font-bold text-white hover:text-cyan-400 transition-colors">
                    {CANDIDATE.email}
                  </a>
                </div>
              </div>

              <button
                onClick={handleCopy}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all"
                title="Copy Email"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* GitHub Card */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase">GitHub Profile</div>
                  <a href={CANDIDATE.github} target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm font-bold text-white hover:text-cyan-400 transition-colors">
                    @Logesh-Aeronautical
                  </a>
                </div>
              </div>

              <a
                href={CANDIDATE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all text-xs font-mono"
              >
                View
              </a>
            </div>

          </div>
        </div>

        {/* Right Message Form */}
        <div className="lg:col-span-7">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl">
            <h3 className="text-xl font-bold text-white mb-1">
              Send Direct Engineering Inquiry
            </h3>
            <p className="text-xs text-slate-400 mb-6 font-mono">
              Fires directly to Logesh's inbox: {CANDIDATE.email}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Your Name / Recruiter</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Aeronautical Recruiter"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400 transition-colors font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Subject</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. ₹25k+ Drone R&D Role Discussion"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400 transition-colors font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Message</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share details on your airframe design, CFD, or embedded firmware opportunity..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400 transition-colors font-mono"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 hover:from-sky-400 hover:to-cyan-300 text-slate-950 font-bold text-xs font-mono shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
              >
                <span>Send Message to Logesh</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
}
